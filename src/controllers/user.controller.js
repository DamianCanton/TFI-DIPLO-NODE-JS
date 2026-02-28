import ServerError from "../helper/serverError.js"
import { successResponse } from "../helper/responseHelper.js"
import {
    buscarTodosLosUsuarios,
    buscarUsuarioPorId,
    eliminarUsuarioPorId
} from "../repository/user.repository.js"

export async function getUsers(request, response) {
    const users = await buscarTodosLosUsuarios()
    return successResponse(response, users, "Usuarios obtenidos exitosamente")
}

export async function getUserById(request, response) {
    const { id } = request.params
    const user = await buscarUsuarioPorId(id)

    if (!user) {
        throw new ServerError("Usuario no encontrado", 404)
    }

    return successResponse(response, user, "Usuario obtenido exitosamente")
}

export async function deleteUser(request, response) {
    const { id } = request.params
    const user = await eliminarUsuarioPorId(id)

    if (!user) {
        throw new ServerError("Usuario no encontrado", 404)
    }

    return successResponse(response, user, "Usuario eliminado exitosamente")
}
