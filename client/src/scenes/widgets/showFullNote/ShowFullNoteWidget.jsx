import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../../../context/NoteContext";
import { useSelector } from "react-redux";
import { InputBase, Button } from "@mui/material";
import { Snackbar, Alert } from '@mui/material';

const ShowFullNoteWidget = ({ note }) => {
  const token = useSelector((state) => state.token);
  const [editable, setEditable] = useState(false);
  const { refresh, toggleRefresh, updateEditedNote } =
    useContext(NoteContext);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [notes, setNotes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("")

  const handleEdit = () => {
    updateEditedNote({
      ...note,
      title: editedTitle,
      content: editedContent,
    });
    setEditable(true);
  };

  const handleSave = async () => {
    setEditable(false);
    await updateNote(note._id, editedTitle, editedContent);
    toggleRefresh();
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const updateNote = async (_id, newTitle, newContent) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Editing Note");
    setSnackbarOpen(true);
    await fetch(`https://notes-app-puce-omega.vercel.app/note/${_id}/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });
    setSnackbarSeverity("success");
    showSnackbar("Note Edited SuccessFully");
  };

  const getNote = async () => {
    try {
      const response = await fetch(`https://notes-app-puce-omega.vercel.app/note/${note._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the state with the fetched note data
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } else {
        console.error("Failed to fetch note");
      }
    } catch (error) {
      console.error("Error while fetching note:", error);
    }
  };

  useEffect(() => {
    getNote();
  }, [refresh, note._id]);




  return (
    <>
      <div
        className="rounded-md h-full ml-10 w-full p-3 "
        style={{
          backgroundColor: "#374151",
          borderRadius: "4px",
          padding: "10px",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          boxShadow: editable ? "0px 0px 8px rgba(0, 0, 0, 0.1)" : "none",
          position: "relative",
        }}
      >
        {editable && (
          <div
            style={{
              position: "absolute", // Position the element absolutely
              top: "5px", // Adjust top position as needed
              right: "5px", // Adjust right position as needed
              backgroundColor: "#181818",
              color: "white",
              padding: "3px 6px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <p className="text-[20px]">Editing...</p>
          </div>
        )}
        {editable ? (
          <>
            <InputBase
              value={editedTitle}
              onChange={handleTitleChange}
              fullWidth
              multiline
              style={{
                fontSize: "28px",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
              }}
            />
            <InputBase
              value={editedContent}
              onChange={handleContentChange}
              fullWidth
              multiline
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                border: "none",
                outline: "none",
                resize: "none",
                backgroundColor: "transparent",
                color: "white",
                fontFamily: "Poppins, sans-serif",
              }}
            />
            <Button
              onClick={handleSave}
              style={{
                width: "100%",
                height: '3rem',
                backgroundColor: "#0f9d58",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <pre
              className="text-[28px] font-bold"
              style={{ marginBottom: "10px", fontFamily: "Poppins, sans-serif" }}
            >
              {editedTitle}
            </pre>
            <pre
              style={{
                marginBottom: "10px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                lineHeight: "1.5",
                fontFamily: "Poppins, sans-serif",
              }}
              className="text-[18px]"
            >
              {editedContent}
            </pre>
            <Button
              onClick={handleEdit}
              style={{
                width: "100%",
                height: '3rem',
                backgroundColor: "#436ee8",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Edit
            </Button>
          </>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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

export default ShowFullNoteWidget;
