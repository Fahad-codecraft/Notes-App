import React from 'react'
import { InputBase, Button } from '@mui/material'
import FlexBetween from '../../../components/FlexBetween'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import { NoteContext } from '../../../context/NoteContext'
import "./AddNoteWidget.css"

const AddNoteWidget = ({handleClosePopup}) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token); // eslint-disable-next-line
  const [notes, setNotes] = useState([])
  const { toggleRefresh } = useContext(NoteContext)

  const handleAddNote = async () => {
    const data = {
      userId: _id,
      title: title,
      content: content
    };

    const response = await fetch(`https://notes-app-puce-omega.vercel.app/create/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const notes = await response.json();
    setNotes({ notes });
    toggleRefresh();
    setTitle("");
    setContent("")
  }


  const handleCancel = () => {
    handleClosePopup()
  };

  return (
    <div 
    className='add-note-widget-container'
      style={{
        width: "40rem",
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#181820',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <InputBase
        type='text'
        placeholder='Add Title'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        multiline
        sx={{
          fontSize: '1.2rem',
          padding: '0.5rem 1rem',
          border: 'none',
          outline: 'none',
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      />
      <InputBase
        type='text'
        placeholder='Add Content'
        onChange={(e) => setContent(e.target.value)}
        value={content}
        multiline
        sx={{
          fontSize: '1rem',
          padding: '1rem',
          border: 'none',
          outline: 'none',
          resize: 'none',
          color: '#ffffff',
        }}
      />
      <Button
        onClick={handleAddNote}
        disabled={!title && !content}
        sx={{
          backgroundColor: '#0f9d58',
          color: '#ffffff',
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Add
      </Button>
      <Button
        onClick={handleCancel}
        sx={{
          backgroundColor: '#808080',
          color: '#ffffff',
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Cancel
      </Button>
    </div>
  )
}

export default AddNoteWidget