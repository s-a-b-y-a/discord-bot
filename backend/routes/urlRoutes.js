import express from "express";
import URL from "../models/url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  console.log(originalUrl)
  try {
    let url = await URL.findOne({ originalUrl });
    if (!url) {
      url = new URL({ originalUrl });
      await url.save();
    }
    return res
      .status(200)
      .json({ shortUrl: `https://discord-bot-55kw.onrender.com/${url.shortId}` });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await URL.findOne({ shortId });
    if (!url) return res.status(404).json({ error: "URL not found" });
    return res.redirect(`${url.originalUrl}`);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
