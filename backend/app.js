const express = require("express");
require("dotenv").config();
require("./db")
const userRouter = require("./routes/user")

const app = express();

app.use(express.json())
app.use("/api/user", userRouter);



app.listen(process.env.PORT || 4000, () => {
    console.log("Server has been started");
})