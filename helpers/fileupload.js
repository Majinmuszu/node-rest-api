const multer = require("multer");

const storage = multer.diskStorage({
    destination: "tmp/",
    filename: (req, file, cb) => cb(null, file.originalname),
    limits: { fileSize: 1 * 1000000 },
});
const upload = multer({ storage });

const fileUpload = (req, res, next) => {
  upload.single("avatar");
  next()
};
module.exports = { fileUpload };
