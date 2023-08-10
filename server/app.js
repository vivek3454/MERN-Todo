const express = require('express');
const databaseConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/auth.route');
const app = express();

databaseConnect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));


app.use('/api/auth', userRouter);

// app.use('/',(req,res)=>{
//     res.status(200).json({data: 'JWTauth server'})
// })


module.exports = app;