import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlineOutlined, FavoriteBorderOutlined, Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import ShowFavouriteNotes from "./ShowFavouriteNotes";
import { NoteContext } from "../../../context/NoteContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Snackbar, Alert } from "@mui/material";
import "./ShowFavouriteNoteWidget.css"


const ShowFavouriteNotesWidget = ({ onNoteClick, searchQuery  }) => {
  const token = useSelector((state) => state.token);
  const [notes, setNotes] = useState([]);
  const { refresh } = useContext(NoteContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info")



  const getFavouriteNotes = async () => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Getting Favourites");
    setSnackbarOpen(true);
    const response = await fetch("https://notes-app-puce-omega.vercel.app/fav", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setNotes(data.reverse()); // shows latest added first
    setSnackbarSeverity("success");
    showSnackbar("Got successfully");
  };
  useEffect(() => {
    getFavouriteNotes();
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

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
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


  const filteredNotes = notes.filter((note) =>
    note.favourite &&
    !note.isTrashed &&
    !note.isArchived &&
    (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     note.content.toLowerCase().includes(searchQuery.toLowerCase())));


  return (
    <>
      <div className="bg-[#374151] rounded-md h-[600px] ml-4 w-full p-3 note-widget-container"
      style={{
        overflow: 'auto'
      }}>
        {filteredNotes.map(({ _id, title, content }) => (
          <div key={_id}>
            <FlexBetween >
              <motion.div
                className="flex hover:bg-[#181820] w-full justify-between rounded-lg m-1 p-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col">
                  <ShowFavouriteNotes
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
                    <Favorite
                      fontSize="large"
                      sx={{
                        color: "white",
                        mr: "1rem",
                        cursor: "pointer",
                        fontSize: "35px",
                      }}
                      onClick={() => favouriteNote(_id)}
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
                        onClick={() => trashNote(_id)}
                      />
                    </motion.div>
                  </IconButton>
                </div>
              </motion.div>
            </FlexBetween>
            <hr className="border-[#2d2d39]  border-[2px] rounded-full" />
          </div>
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

export default ShowFavouriteNotesWidget;