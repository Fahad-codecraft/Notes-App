import React, { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [editedNote, setEditedNote] = useState(null); // Initial value for editedNote

  const toggleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  const updateEditedNote = (note) => {
    setEditedNote(note);
  };

  return (
    <NoteContext.Provider value={{ refresh, toggleRefresh, updateEditedNote, editedNote }}>
      {children}
    </NoteContext.Provider>
  );
};
