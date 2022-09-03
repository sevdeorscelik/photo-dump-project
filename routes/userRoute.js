import express from "express"
import { createUser, loginUser, getDashboardPage, getAllUsers, getAUser } from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
    .route('/register')
    .post(createUser);

router
    .route('/login')
    .post(loginUser)

router
    .route('/dashboard')
    .get(authenticateToken, getDashboardPage)

router
    .route('/')
    .get(getAllUsers);

router
    .route('/:id')
    .get(getAUser);




export default router