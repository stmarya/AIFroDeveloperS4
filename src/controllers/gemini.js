// src/controllers/gemini.js
const client = require("../services/geminiClient");
const { readFileAsBase64, cleanupFile } = require("../utils/fileHelper");

const MODEL = process.env.GEMINI_MODEL;

exports.generateText = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required." });

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const { data } = await client.post(
      `/models/${MODEL}:generateContent`,
      payload
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.generateFromImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required." });
  }

  const fp = req.file.path;
  try {
    const imageB64 = readFileAsBase64(fp);

    const payload = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: imageB64,
              },
            },
            {
              text: req.body.prompt || "",
            },
          ],
        },
      ],
    };

    const { data } = await client.post(
      `/models/${MODEL}:generateContent`,
      payload
    );
    res.json(data);
  } catch (err) {
    next(err);
  } finally {
    cleanupFile(fp);
  }
};

exports.generateFromDoc = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "Document file is required." });
  }
  const fp = req.file.path;
  try {
    const docB64 = readFileAsBase64(fp);
    const payload = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: docB64,
              },
            },
            {
              text: req.body.prompt || "",
            },
          ],
        },
      ],
    };

    const { data } = await client.post(
      `/models/${MODEL}:generateContent`,
      payload
    );
    res.json(data);
  } catch (err) {
    next(err);
  } finally {
    cleanupFile(fp);
  }
};

exports.generateFromAudio = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "Audio file is required." });
  }
  const fp = req.file.path;
  try {
    const audioB64 = readFileAsBase64(fp);
    const payload = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: audioB64,
              },
            },
            {
              text: req.body.prompt || "",
            },
          ],
        },
      ],
    };

    const { data } = await client.post(
      `/models/${MODEL}:generateContent`,
      payload
    );
    res.json(data);
  } catch (err) {
    next(err);
  } finally {
    cleanupFile(fp);
  }
};
