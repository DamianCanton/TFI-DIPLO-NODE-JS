import Chat from "../models/chat.model.js";

async function crearChat(participants) {
    const chat = await Chat.create({ participants })
    return chat
}

async function buscarChatPorId(chat_id) {
    const chat = await Chat.findById(chat_id).populate("participants", "-password")
    return chat
}

async function buscarTodosLosChats() {
    const chats = await Chat.find().populate("participants", "-password")
    return chats
}

export {
    crearChat,
    buscarChatPorId,
    buscarTodosLosChats
}
