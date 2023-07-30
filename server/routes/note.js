import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  favouriteNote,
  editNote,
  archiveNote,
  trashNote,
  getArchivedNotes,
  getTrashedNotes,
  getFavouriteNote
} from "../controllers/note.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/notes", verifyToken, getNotes);
router.get("/note/:id", verifyToken, getNote);
router.get("/archived", verifyToken, getArchivedNotes)
router.get("/trashbin", verifyToken, getTrashedNotes)
router.get("/fav", verifyToken, getFavouriteNote)

/*CREATE*/
router.post("/create/note", verifyToken, createNote);

/*DELETE*/
router.delete("/delete/note/:id", verifyToken, deleteNote);

/*Favourite Note*/
router.get("/note/:id/favourite", verifyToken, favouriteNote);

/*EDIT NOTE*/
router.put("/note/:id/edit", verifyToken, editNote);


router.put("/archive/note/:id", verifyToken, archiveNote);
router.put("/trash/note/:id", verifyToken, trashNote);
export default router;
