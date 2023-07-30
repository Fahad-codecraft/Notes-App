import Note from "../models/Note.js";


/*CREATE NOTE*/
export const createNote = async (req, res) => {
  try {
    const { title } = req.body
    const { content } = req.body
    const { groupName } = req.body

    const createdNote = await Note.create({
      userId: req.user.id,
      groupName,
      title,
      content
    })
    res.status(201).json(createdNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



/*Get Notes*/
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



/*Get Note*/
export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



/*Delete Note*/
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update Notes");
    }

    await Note.deleteOne({ _id: req.params.id });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



/*Favourite Note*/
export const favouriteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.favourite = !note.favourite;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



/*Edit Note*/
export const editNote = async (req, res) => {
  try {
    const { title } = req.body;
    const { content } = req.body;
    const { groupName } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update Notes");
    }

    note.title = title;
    note.content = content;
    note.groupName = groupName;
    await note.save()
    res.status(200).json(note)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*Archive Note*/
export const archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update Notes");
    }

    note.isArchived = !note.isArchived;

    // If the note is being trashed, remove it from the trash
    if (note.isArchived && note.isTrashed) {
      note.isTrashed = false;
    }

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Trash Note*/
export const trashNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update Notes");
    }

    note.isTrashed = !note.isTrashed;

    // If the note is being archived, remove it from the archive
    if (note.isTrashed && note.isArchived) {
      note.isArchived = false;
    }

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Get Archived Notes*/
export const getArchivedNotes = async (req, res) => {
  try {
    const archivedNotes = await Note.find({ userId: req.user.id, isArchived: true });
    res.status(200).json(archivedNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*Get Trashed Notes*/
export const getTrashedNotes = async (req, res) => {
  try {
    const trashedNotes = await Note.find({ userId: req.user.id, isTrashed: true });
    res.status(200).json(trashedNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*Get Favourite Notes*/
export const getFavouriteNote = async (req, res) => {
  try {
    const favouriteNote = await Note.find({ userId: req.user.id, favourite: true });
    res.status(200).json(favouriteNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



