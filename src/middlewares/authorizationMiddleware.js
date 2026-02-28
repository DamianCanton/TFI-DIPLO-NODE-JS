import ENVIRONMENT from "../config/environment.js"
import ServerError from "../helper/serverError.js"
import jwt from "jsonwebtoken"

function authorizationMiddleware(request, response, next) {
    const authorization_header = request.headers.authorization

    if (!authorization_header) {
        throw new ServerError("Token de autorizacion requerido", 401)
    }

    const auth_token = authorization_header.split(' ')[1]
    if (!auth_token) {
        throw new ServerError("Formato de token invalido", 401)
    }

    const payload = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET_KEY)
    request.user = payload

    next()
}

export default authorizationMiddleware
