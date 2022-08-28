import express from "express"
import { createUser, loginUser } from '../controllers/userController.js'


const router = express.Router()

router
    .route('/register')
    .post(createUser);

router
    .route('/login')
    .post(loginUser)



export default router