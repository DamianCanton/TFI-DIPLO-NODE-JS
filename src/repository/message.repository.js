import Message from "../models/message.model.js";

async function crearMensaje({ chatId, userId, content }) {
    const message = await Message.create({ chatId, userId, content })
    return message
}

async function buscarMensajesPorChat(chat_id) {
    const messages = await Message.find({ chatId: chat_id })
        .populate("userId", "name email")
        .sort({ created_at: 1 })
    return messages
}

async function buscarMensajePorId(message_id) {
    const message = await Message.findById(message_id)
    return message
}

async function eliminarMensajePorId(message_id) {
    const message = await Message.findByIdAndDelete(message_id)
    return message
}

export {
    crearMensaje,
    buscarMensajesPorChat,
    buscarMensajePorId,
    eliminarMensajePorId
}
