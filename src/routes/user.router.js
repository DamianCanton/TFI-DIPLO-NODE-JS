import express from 'express'
import { getUsers, getUserById, deleteUser } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUser)

export default userRouter
