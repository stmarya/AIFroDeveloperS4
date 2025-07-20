const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  generateText,
  generateFromImage,
  generateFromDoc,
  generateFromAudio,
} = require("../controllers/gemini");

const router = express.Router();

router.post("/generate-text", generateText);
router.post("/generate-from-image", upload.single("image"), generateFromImage);
router.post(
  "/generate-from-document",
  upload.single("document"),
  generateFromDoc
);
router.post("/generate-from-audio", upload.single("audio"), generateFromAudio);

module.exports = router;
