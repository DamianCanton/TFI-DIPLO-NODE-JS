import express from 'express'
import { createChat, getChats, getChatById } from '../controllers/chat.controller.js'
import messageRouter from './message.router.js'

const chatRouter = express.Router()

chatRouter.post('/', createChat)
chatRouter.get('/', getChats)
chatRouter.get('/:chats_id', getChatById)

chatRouter.use('/:chats_id/messages', messageRouter)

export default chatRouter
