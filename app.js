require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8010;

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');



app.use(bodyParser.json());
app.use(methodOverride('_method'))
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

