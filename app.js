require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8010;


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);
app.use(express.json({ limit: '10mb' }));


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})