import User from "../models/user.model.js";

async function createUser({ name, email, password }) {
    const user = await User.create({ name, email, password })
    return user
}

async function buscarUsuarioPorId(user_id) {
    const user = await User.findById(user_id).select("-password")
    return user
}

async function buscarPorEmail(email) {
    const user = await User.findOne({ email })
    return user
}

async function buscarTodosLosUsuarios() {
    const users = await User.find().select("-password")
    return users
}

async function eliminarUsuarioPorId(user_id) {
    const user = await User.findByIdAndDelete(user_id)
    return user
}

export {
    createUser,
    buscarPorEmail,
    buscarUsuarioPorId,
    buscarTodosLosUsuarios,
    eliminarUsuarioPorId
}
