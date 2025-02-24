import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, default: shortid.generate() }
})

const URL = mongoose.model('url', urlSchema)
export default URL
