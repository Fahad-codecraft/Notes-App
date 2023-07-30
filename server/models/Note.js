import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        groupName: {
            type: String
        },
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        favourite: {
            type: Boolean,
            default: false
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        isTrashed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Note = mongoose.model("Note", NoteSchema)
export default Note;