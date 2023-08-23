const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");












// for user registration

router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword } = req.body;
    // const profilephoto ="";
    // const resume ="";

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword,resume
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




// user Login

router.post("/login", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;
    // console.log(email,password);

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {


        const userValid = await userdb.findOne({ email: email });

        if (userValid) {

            const isMatch = await bcrypt.compare(password, userValid.password);

            if (!isMatch) {
                res.status(422).json({ error: "invalid details" })
            } else {

                // token generate
                const token = await userValid.generateAuthtoken();
                // console.log(userValid)
                // console.log(token)
                // cookiegenerate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});



// user valid
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await userdb.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});


// user logout

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie", { path: "/" });

        req.rootUser.save();

        res.status(201).json({ status: 201 })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})

//////////////////// store image //////////////////



router.post("/dash", async (req, res) => {
    const { fname , lname ,email,resume } = req.body;
    console.log(fname);
    console.log(resume);

    try {
        const userValid = await userdb.findOne({ email:email });
        // console.log(userValid);

        if (userValid) {
            userValid.profilephoto = profilephoto;
            userValid.lname = lname;
            userValid.fname = fname;
            await userValid.save();
            // console.log(userValid);
            res.status(200).json({ msg: "Profile photo updated successfully" });
            console.log("Profile photo updated!");
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error occurred during profile photo update");
    }
});




// @route POST /upload
// @desc  Uploads file to DB
// router.post('/upload', upload.single('file'), (req, res) => {
//     // res.json({ file: req.file });
//     res.redirect('/');
//   });
  
//   // @route GET /files
//   // @desc  Display all files in JSON
//   router.get('/files', (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//       // Check if files
//       if (!files || files.length === 0) {
//         return res.status(404).json({
//           err: 'No files exist'
//         });
//       }
  
//       // Files exist
//       return res.json(files);
//     });
//   });














module.exports = router;




