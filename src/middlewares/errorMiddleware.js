import { errorResponse } from "../helper/responseHelper.js"

function errorMiddleware(error, request, response, next) {
    console.error("Error:", error.message)

    if (error.status) {
        return errorResponse(response, error.message, error.status)
    }

    return errorResponse(response, "Error interno del servidor", 500)
}

export default errorMiddleware
