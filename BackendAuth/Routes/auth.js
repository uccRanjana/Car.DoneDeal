import express from "express";
import { loginApi, resetPassword,register, registerAdmin ,sendEmail} from "../Controllers/auth.controller.js";

const router = express.Router();

//register
router.post("/register", register )


//login
router.post("/login" , loginApi)


//register as admin
router.post("/register-admin", registerAdmin)


//send reset email
router.post("/send-email", sendEmail)

//reset password
router.post("/reset-password", resetPassword)
export default router;