import express from 'express'
import { sendMessage, getMessagesByChat, deleteMessage } from '../controllers/message.controller.js'

const messageRouter = express.Router({ mergeParams: true })

messageRouter.post('/', sendMessage)
messageRouter.get('/', getMessagesByChat)
messageRouter.delete('/:messages_id', deleteMessage)

export default messageRouter
