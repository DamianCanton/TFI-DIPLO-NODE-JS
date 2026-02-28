import mongoose from 'mongoose'
import ENVIRONMENT from './environment.js'

async function connectDB (){
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING)
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log('Error al conectar a la base de datos')
        console.log(error)
    }
}

export default connectDB