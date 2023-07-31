import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DeleteOutlineOutlined,
  Favorite,
  FavoriteBorder,
  Archive,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import ShowNoteWidget from "./showNoteWidget";
import { NoteContext } from "../../../context/NoteContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Snackbar, Alert } from "@mui/material";
import "./ShowNotesWidget.css"

const ShowNotesWidget = ({ onNoteClick, searchQuery }) => {
  const token = useSelector((state) => state.token);
  const [notes, setNotes] = useState([]);
  const { refresh } = useContext(NoteContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const getNotes = async () => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Getting Notes");
    setSnackbarOpen(true);
    const response = await fetch("https://notes-app-puce-omega.vercel.app/notes", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setNotes(data.reverse()); // shows latest added first
    setSnackbarSeverity("success");
    showSnackbar("Got successfully");
  };

  useEffect(() => {
    getNotes();
  }, [refresh, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const trashNote = async (_id) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Trashing Note");
    setSnackbarOpen(true);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === _id ? { ...note, isTrashed: true } : note
      )
    );

    await fetch(`https://notes-app-puce-omega.vercel.app/trash/note/${_id}/`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnackbarSeverity("error");
    showSnackbar("Note sent To Bin");
  };

  const favouriteNote = async (_id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === _id ? { ...note, favourite: !note.favourite } : note
      )
    );

    await fetch(`https://notes-app-puce-omega.vercel.app/note/${_id}/favourite`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const archiveNote = async (_id) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Archiving Note");
    setSnackbarOpen(true);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === _id ? { ...note, isArchived: true } : note
      )
    );

    await fetch(`https://notes-app-puce-omega.vercel.app/archive/note/${_id}/`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnackbarSeverity("info");
    showSnackbar("Note Archived");
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      !note.isTrashed &&
      !note.isArchived &&
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="bg-[#374151] rounded-md h-[600px] ml-4 w-full p-3 note-widget-container" style={{
              overflow: 'auto'
            }}>
        {filteredNotes.map(({ _id, title, content, favourite }) => (
          <>
            <FlexBetween key={_id}>
              <motion.div
                className="flex hover:bg-[#181820] w-full justify-between rounded-lg m-1 p-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col">
                  <ShowNoteWidget
                    title={title}
                    content={content}
                    onClick={() =>
                      onNoteClick({ _id, title, content, favourite })
                    }
                  />
                </div>
                <div className="flex items-center">
                  {favourite ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, color: "white" }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Favorite
                        onClick={() => favouriteNote(_id)}
                        sx={{
                          color: "white",
                          mr: "0.5rem",
                          cursor: "pointer",
                          fontSize: "35px",
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 0.8, color: "red" }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <FavoriteBorder
                        onClick={() => favouriteNote(_id)}
                        sx={{
                          color: "white",
                          mr: "0.5rem",
                          cursor: "pointer",
                          fontSize: "35px",
                        }}
                      />
                    </motion.div>
                  )}
                  <IconButton onClick={() => archiveNote(_id)}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 0.8, color: "red" }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Archive
                        sx={{ color: "white", fontSize: "35px", mr: "0.5" }}
                      />
                    </motion.div>
                  </IconButton>
                  <IconButton onClick={() => trashNote(_id)}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 0.8, color: "red" }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <DeleteOutlineOutlined
                        sx={{ color: "white", fontSize: "35px" }}
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
        sx={{ width: "100%" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ fontSize: "30px" }}
      >
        <Alert severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShowNotesWidget;
