import React from 'react'
import Navbar from '../navbar'
import Sidebar from '../widgets/Sidebar'
import AddNoteWidget from '../widgets/AddNoteWidget/AddNoteWidget'
import ShowTrashNotes from '../widgets/showTrashNotes/ShowTrashNotes'
import { useState } from 'react'
import ShowTrashFullNoteWidget from '../widgets/showTrashFull/ShowTrashFullNoteWidget'

const TrashPage = ({ showPopup, handleTogglePopup }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
      setSearchQuery(event.target.value);
  };

  const handleClosePopup = () => {
    handleTogglePopup();
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };


  return (
    <>
      <div>
        <Navbar handleSearch={handleSearch}/>
        <div className='flex'>
          <div>
            <Sidebar handleTogglePopup={handleTogglePopup} />
          </div>
          <div className='w-1/3'>
            <ShowTrashNotes onNoteClick={handleNoteClick} searchQuery={searchQuery}/>
          </div>
          <div className="w-[58%]">
          {selectedNote && <ShowTrashFullNoteWidget note={selectedNote} />}
          </div>
        </div>
      </div>

      <div>
        {showPopup && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-filter backdrop-blur-[3px]">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-lg p-4">
              <AddNoteWidget handleClosePopup={handleClosePopup} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TrashPage