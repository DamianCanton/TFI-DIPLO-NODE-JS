import bcrypt from "bcrypt"
import ServerError from "../helper/serverError.js"
import { buscarPorEmail, createUser } from "../repository/user.repository.js"
import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.js"
import { successResponse } from "../helper/responseHelper.js"

export async function register(request, response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
        throw new ServerError("Faltan campos obligatorios (name, email, password)", 400)
    }

    const user_found = await buscarPorEmail(email)
    if (user_found) {
        throw new ServerError("El usuario ya existe", 400)
    }

    const password_crypted = await bcrypt.hash(password, 10)

    await createUser({ name, email, password: password_crypted })

    return successResponse(response, null, "Usuario registrado exitosamente", 201)
}

export async function login(request, response) {
    const { email, password } = request.body

    if (!email || !password) {
        throw new ServerError("Faltan campos obligatorios (email, password)", 400)
    }

    const user_found = await buscarPorEmail(email)
    if (!user_found) {
        throw new ServerError("El usuario no existe", 404)
    }

    const isSamePassword = await bcrypt.compare(password, user_found.password)
    if (!isSamePassword) {
        throw new ServerError("Contraseña incorrecta", 401)
    }

    const auth_token = jwt.sign(
        {
            email,
            id: user_found._id,
            name: user_found.name
        },
        ENVIRONMENT.JWT_SECRET_KEY
    )

    return successResponse(response, { auth_token }, "Login exitoso")
}
