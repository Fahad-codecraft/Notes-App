import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlineOutlined, Restore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import ShowTrashNote from "./ShowTrashNote";
import { NoteContext } from "../../../context/NoteContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Snackbar, Alert } from "@mui/material";
import "./ShowTrashNotes.css"

const ShowTrashNotes = ({ onNoteClick, searchQuery }) => {
  const token = useSelector((state) => state.token);
  const [notes, setNotes] = useState([]);
  const { refresh } = useContext(NoteContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("")


  const getTrashNotes = async () => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Getting Trashed Note");
    setSnackbarOpen(true);
    const response = await fetch("https://notes-app-puce-omega.vercel.app/trashbin", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setNotes(data.reverse()); // shows latest added first
    setSnackbarSeverity("success");
    showSnackbar("Got successfully");
  };
  useEffect(() => {
    getTrashNotes();
  }, [refresh, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const restoreNote = async (_id) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Restoring Note");
    setSnackbarOpen(true);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === _id ? { ...note, isTrashed: false } : note
      )
    );

    await fetch(`https://notes-app-puce-omega.vercel.app/trash/note/${_id}/`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnackbarSeverity("success");
    showSnackbar("Note restored successfully");
  };

  const deleteNote = async (_id) => {
    setSnackbarSeverity("error");
    setSnackbarMessage("Deleting Note");
    setSnackbarOpen(true);
    setNotes(notes.filter((note) => note._id !== _id));

    await fetch(`https://notes-app-puce-omega.vercel.app/delete/note/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnackbarSeverity("error");
    showSnackbar("Note deleted successfully");
  }

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };


  const filteredNotes = notes.filter((note) =>
    note.isTrashed &&
    (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  return (
    <>
      <div className="bg-[#374151] rounded-md h-[600px] ml-4 w-full p-3 note-widget-container">
        {filteredNotes.map(({ _id, title, content }) => (
          <>
            <FlexBetween key={_id}>
              <motion.div
                className="flex hover:bg-[#181820] w-full justify-between rounded-lg m-1 p-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col">
                  <ShowTrashNote
                    title={title}
                    content={content}
                    onClick={() => onNoteClick({ _id, title, content })}
                  />
                </div>
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 0.8, color: "red" }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Restore
                      fontSize="large"
                      sx={{
                        color: "white",
                        mr: "1rem",
                        cursor: "pointer",
                        fontSize: "35px",
                      }}
                      onClick={() => restoreNote(_id)}
                    />
                  </motion.div>
                  <IconButton>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 0.8, color: "red" }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <DeleteOutlineOutlined
                        sx={{
                          color: "white",
                          cursor: "pointer",
                          fontSize: "35px",
                        }}
                        onClick={() => deleteNote(_id)}
                      />
                    </motion.div>
                  </IconButton>
                </div>
              </motion.div>
            </FlexBetween>
            <hr className="border-[#2d2d39]  border-[2px] rounded-full" />
          </>
        ))}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={closeSnackbar}
        message={snackbarMessage}
        sx={{ width: '100%' }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}

      >
        <Alert severity={snackbarSeverity} variant="filled">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default ShowTrashNotes;
