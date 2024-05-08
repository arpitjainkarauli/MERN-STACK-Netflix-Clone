const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/UserRoutes")

const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/netflix",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("db connected")
})

app.use("/api/user",userRouter)

app.listen(5000,console.log("server running"))