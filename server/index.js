const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("video"), async (req, res) => {
  const videoPath = path.join(__dirname, req.file.path);
  const form = new FormData();
  form.append("file", fs.createReadStream(videoPath));

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/extract-frames/",
      form,
      {
        headers: form.getHeaders(),
      }
    );

    fs.unlinkSync(videoPath);

    res.json({
      message: "Frames extracted",
      frames: response.data.frames,
    });
  } catch (err) {
    console.error("Error calling analyzer:", err.message);
    res.status(500).json({ error: "Frame extraction failed" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
