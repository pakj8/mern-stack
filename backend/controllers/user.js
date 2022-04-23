const user = require("../model/user");
const User = require("../model/user");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const { generateOTP, mailTransport } = require("../utils/mail");
const VerificationToken = require("../model/verificationToken")
const {isValidObjectId} = require("mongoose");
const { use } = require("../routes/user");
const verificationToken = require("../model/verificationToken");


exports.createUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        return sendError(res, "This email is already exits.")
    }
    const newUser = new User({
        email,
        password 
    })

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP
    }) 

    await verificationToken.save();
    await newUser.save()
    mailTransport().sendMail({
        from: "lsrctechnika4.o@gmail.com",
        to: newUser.email,
        subject: "Verify your email account",
        HMTL: `<h1>${OTP}</h1>`
    })
    res.send(newUser)
};

exports.signin = async function(req, res) {
    const {email, password} = req.body;
    if(!email.trim() || !password.trim()) {
        return sendError(res, "Email and Password is missing.")
    }
    await User.findOne({email})
    if(!user) return sendError(res, "User not found")

    const isMatched = user.comparePassword(password);
    if(!isMatched) return sendError(res, "Email and Password does not match.")

    const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.json({success: true, user: {email: user.emial, password: user.password, id: user._id, token: token}})
}


exports.verifyEmail = async (req, res) => {
    const {userID, otp} = req.body;
    if(!userID || !otp.trim()) return sendError(res, "Invalid request, missing parameters.")
    if(!isValidObjectId(userID)) {
        return sendError(res, "Invalid User Id.")
    }else {
        const user = await User.findById(userID);
    }

    if(!user) return sendError(res, "Sorry, user not found.")

    if(user.verified) return sendError(res, "This account is verified")

    const token = await verificationToken.findOne({owner: user._id})
    if(!token) return sendError(res, "Sorry, user not found.")

    const isMatched = await token.compareToken(otp)
    if(!isMatched) return sendError(res, "Please provide a valid token")

    user.verified = true;

    await verificationToken.findByIdAndDelete(token.user._id);
    await user.save()

    mailTransport().sendMail({
        from: "lsrctechnika4.o@gmail.com",
        to: user.email,
        subject: "Verify your email account",
        HMTL: "<h1>Email verified Successfully</h1><br><h1>Thanks for connecting with us</h1>"
    })
    res.send(newUser)
}