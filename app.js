/* eslint-disable no-unused-vars */
const express = require("express");
const collection = require("./mongo")

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:["http://localhost:3000","https://ok945.github.io/dummy"]
}));

// app.use(cors());



app.get("/", cors(), (req, res) => {


})




app.post("/dummy", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (user) {
      // Compare the provided password with the password in the database
      if (user.password === password) {
        res.json("exists");
      } else {
        res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





















app.post("/signup", async (req, res) => {
  const { email, password } = req.body


  const data = {
    email: email,
    password: password
  }


  try {
    const check = await collection.findOne({ email: email })

    if (check) {
      res.json("exists")
    }
    else {

      const data = new collection({
        email: email,
        password: password
      })
      data.save();
      res.json("notexists")
    }
  }
  catch (e) {
    res.json("notexists")
  }
})


app.listen(8000, () => {
  console.log("port connected")

})