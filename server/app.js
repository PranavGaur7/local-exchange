const express = require('express')
const app = express();
var cors = require('cors')
const socket = require('socket.io')
app.use(express.json());
app.use(cors({
    origin: ["https://barter-drab-phi.vercel.app"],
    methods: ["GET", "POST","DELETE","PATCH"],
    credentials: true,
}))
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "DELETE", "PATCH"],
//     credentials: true,
// }))
app.use(express.json({ limit: '50mb' })); // Adjust the limit as per your requirements

require('dotenv').config();
const server = app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})
const io = socket(server, {
    cors: {
        origin: "https://barter-drab-phi.vercel.app",
        credentials: true,
    },
})
// const io = socket(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         credentials: true,
//     },
// })
global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        
        if (sendUserSocket) {
            console.log(data.message);
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'bad request'
    })
})


const userRouter = require('./Routers/userRouter');
const marketRouter = require('./Routers/marketRouter');
const kartRouter = require('./Routers/kartRouter');
app.use('/user', userRouter);
app.use('/market', marketRouter);
app.use('/kart', kartRouter);  