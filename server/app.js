const express = require("express");
const app = express();
require("./db/conn");
const router = require('./routes/router')
const cors = require("cors")
const cookiParser = require("cookie-parser")
const PORT = 3009;

// app.get('/',(req , res)=>{
//     res.status(201).json("server created");
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);
app.listen(PORT,()=>{
    console.log("Server connected to PORT "+ PORT);
})