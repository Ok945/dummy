const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");



/////////////////  Store data--- sign up page  ////////


router.post("/register", async (req, res) => {

    // console.log(req.body)

    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ status: 422, error: "This Email is Already Exist" })
            // alert("User already exists")
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });

            // here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});



/////////////////   Check data - Login page //////////////



router.post("/login", async (req, res) => {


    const { email, password } = req.body;


    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }


    console.log(req.body)

    try {
        const userValid = await userdb.findOne({ email: email });
        if (userValid) {

           

            if (userValid.password !== password) {
                res.status(422).json({ status:422,error: "invalid details" });
            } else {

                const result = userValid;
                
                res.status(201).json({ status: 201, result })
            }

           
            
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }


})


module.exports = router;