import express from "express";
import mongoose from "mongoose";
import URLroutes from "./routes/urlRoutes.js"
import dotenv from "dotenv";

dotenv.config()
const app = express()

app.use(express.json())
app.use('/', URLroutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('coonected to the Database'))
.catch((err) => console.error('Database connection error: ', err))

const PORT = 5000
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))