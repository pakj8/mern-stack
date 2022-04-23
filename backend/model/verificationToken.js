const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const verificationTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
});



verificationTokenSchema.method.compareToken = async function(token) {
    const results = bcrypt.compareSync(token, this.token)
    return results;
}

module.exports = mongoose.model("VerificationToken", verificationTokenSchema)