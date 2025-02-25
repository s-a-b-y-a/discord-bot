import express from "express";
import mongoose from "mongoose";
import URLroutes from "./routes/urlRoutes.js"
import dotenv from "dotenv";
import cors from "cors"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', URLroutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('coonected to the Database'))
.catch((err) => console.error('Database connection error: ', err))

const PORT = process.env.PORT || 3000; 

app.get('/', (req,res) => res.send('Backend is Running'));

app.listen(PORT, "0.0.0.0", () => {  
  console.log(`Server is running on port ${PORT}`);
});