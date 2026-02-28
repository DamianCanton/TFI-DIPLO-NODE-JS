import ServerError from "../helper/serverError.js"
import { successResponse } from "../helper/responseHelper.js"
import { crearMensaje, buscarMensajesPorChat, buscarMensajePorId, eliminarMensajePorId } from "../repository/message.repository.js"
import { buscarChatPorId } from "../repository/chat.repository.js"

export async function sendMessage(request, response) {
    const { chats_id } = request.params
    const { content } = request.body
    const userId = request.user.id

    if (!content) {
        throw new ServerError("El contenido del mensaje es obligatorio", 400)
    }

    const chat = await buscarChatPorId(chats_id)
    if (!chat) {
        throw new ServerError("Chat no encontrado", 404)
    }

    const message = await crearMensaje({ chatId: chats_id, userId, content })
    return successResponse(response, message, "Mensaje enviado exitosamente", 201)
}

export async function getMessagesByChat(request, response) {
    const { chats_id } = request.params

    const chat = await buscarChatPorId(chats_id)
    if (!chat) {
        throw new ServerError("Chat no encontrado", 404)
    }

    const messages = await buscarMensajesPorChat(chats_id)
    return successResponse(response, messages, "Mensajes obtenidos exitosamente")
}

export async function deleteMessage(request, response) {
    const { messages_id } = request.params

    const message = await buscarMensajePorId(messages_id)
    if (!message) {
        throw new ServerError("Mensaje no encontrado", 404)
    }

    await eliminarMensajePorId(messages_id)
    return successResponse(response, message, "Mensaje eliminado exitosamente")
}
