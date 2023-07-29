const mongoose = require("mongoose");

const DB = process.env.DATABASE
// const DB = "mongodb+srv://Ok945:(Onlyf0rme!@cluster0.xixq3wq.mongodb.net/Authusers?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})