const fs = require("fs");

/**
 * Baca file dan kembalikan Base64 string
 */
function readFileAsBase64(filePath) {
  return fs.readFileSync(filePath, { encoding: "base64" });
}

/**
 * Hapus file, log warning jika gagal
 */
function cleanupFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) console.warn(`⚠️ Failed to delete temp file ${filePath}:`, err);
  });
}

module.exports = { readFileAsBase64, cleanupFile };
