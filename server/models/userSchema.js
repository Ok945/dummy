const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")


const keysecrect = "jG9#2lP$R@6iFb3s0XmU%5AqYv8^EhN!"

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,

    },
    cpassword: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]

});

userSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}

const userdb = new mongoose.model("users", userSchema);
module.exports = userdb;

