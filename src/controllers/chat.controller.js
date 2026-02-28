import ServerError from "../helper/serverError.js"
import { successResponse } from "../helper/responseHelper.js"
import {
    crearChat,
    buscarChatPorId,
    buscarTodosLosChats
} from "../repository/chat.repository.js"
import { buscarUsuarioPorId } from "../repository/user.repository.js"

export async function createChat(request, response) {
    const { participants } = request.body

    if (!participants || !Array.isArray(participants) || participants.length < 2) {
        throw new ServerError("Se requiere un array de al menos 2 participantes", 400)
    }

    for (const participantId of participants) {
        const user = await buscarUsuarioPorId(participantId)
        if (!user) {
            throw new ServerError(`El usuario con id ${participantId} no existe`, 404)
        }
    }

    const chat = await crearChat(participants)
    return successResponse(response, chat, "Chat creado exitosamente", 201)
}

export async function getChats(request, response) {
    const chats = await buscarTodosLosChats()
    return successResponse(response, chats, "Chats obtenidos exitosamente")
}

export async function getChatById(request, response) {
    const { chats_id } = request.params
    const chat = await buscarChatPorId(chats_id)

    if (!chat) {
        throw new ServerError("Chat no encontrado", 404)
    }

    return successResponse(response, chat, "Chat obtenido exitosamente")
}
