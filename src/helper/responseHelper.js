export function successResponse(response, data, message, statusCode = 200) {
    return response.status(statusCode).json({
        success: true,
        data,
        message
    })
}

export function errorResponse(response, message, statusCode = 500) {
    return response.status(statusCode).json({
        success: false,
        data: null,
        message
    })
}
