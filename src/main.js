import connectDB from "./config/connectionDB.js";

connectDB()

import express from 'express'
import ENVIRONMENT from "./config/environment.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import chatRouter from "./routes/chat.router.js";
import authorizationMiddleware from "./middlewares/authorizationMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express()

app.use(express.json())

// Rutas publicas
app.use('/api/auth', authRouter)

// Rutas protegidas
app.use('/api/users', authorizationMiddleware, userRouter)
app.use('/api/chats', authorizationMiddleware, chatRouter)

// Middleware de manejo de errores
app.use(errorMiddleware)

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log(`Servidor escuchando en el puerto ${ENVIRONMENT.PORT}`)
    }
)

export default app
