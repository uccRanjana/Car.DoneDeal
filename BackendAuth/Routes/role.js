import express from "express";
import { createRole, deleteRole, getAllRoles, updateRole } from "../Controllers/role.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


//Create a new role in DB
router.post('/create', verifyAdmin, createRole);

//update  role api
router.put('/update/:id', verifyAdmin, updateRole);

//get all roles api
router.get('/getAll', verifyAdmin, getAllRoles);

//delete role api
router.delete('/delete/:id', verifyAdmin, deleteRole)
export default router;