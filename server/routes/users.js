import express from "express"

import { getUser } from "../controllers/users.js"
import { editUser } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/*READ*/
router.get("/:id", verifyToken, getUser)
router.put("/edit/:id", verifyToken, editUser)

export default router