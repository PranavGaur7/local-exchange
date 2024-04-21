const express = require('express')
const app = express();
var cors = require('cors')
// app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","DELETE","PATCH"],
    credentials: true,
}))
app.use(express.json({ limit: '50mb' })); // Adjust the limit as per your requirements

require('dotenv').config();
const server = app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})



const userRouter = require('./Routers/userRouter');
const marketRouter = require('./Routers/marketRouter');
const kartRouter = require('./Routers/kartRouter');
app.use('/user', userRouter);
app.use('/market', marketRouter);
app.use('/kart', kartRouter);