const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }
});



userSchema.method.comparePassword = async function(password) {
    const results = bcrypt.compareSync(password, this.password)
    return results;
}

module.exports = mongoose.model("User", userSchema)