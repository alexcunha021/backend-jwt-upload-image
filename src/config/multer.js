import multer from "multer";
import path from "path";
import crypto from "crypto";
module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp"),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) callback(error);
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, file.key);
      });
    }
  })
};
