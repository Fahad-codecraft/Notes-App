import React, {useState} from 'react';
import "./ShowTrashFullNoteWidget.css"
import { Button } from '@mui/material';
import {Snackbar, Alert} from '@mui/material';

const ShowTrashFullNoteWidget = ({ note }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("")


  const handleEdit = () => {
    setSnackbarSeverity("info");
    setSnackbarMessage("To Update the note restore the note and update");
    setSnackbarOpen(true);
  }

  
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    <div className='rounded-md h-full ml-10 w-full p-3 ' style={{
      backgroundColor: '#374151',
      borderRadius: '4px',
      padding: '10px',
      color: 'white',
      fontFamily: 'Poppins, sans-serif',
      position: 'relative',
    }}>
      <div
        className='trash-note-widget-container'
        style={{
          maxHeight: "600px",
          overflow: 'auto'
        }}
      >
        <pre className='text-[28px] font-bold' style={{ marginBottom: '10px', fontFamily: 'Poppins, sans-serif', }}>{note.title}</pre>
        <pre style={{
          marginBottom: '10px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
          lineHeight: '1.5', fontFamily: 'Poppins, sans-serif',
        }} className='text-[18px]'>{note.content}</pre>
        <Button
        onClick={handleEdit}
          style={{
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
      </div>
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
  )
}

export default ShowTrashFullNoteWidget