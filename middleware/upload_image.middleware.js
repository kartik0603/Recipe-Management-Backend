const multer = require("multer");

const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error(" Only JPEG, PNG, and GIF are allowed."), false);
  }
};

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, //  5 MB
});

module.exports = uploader;
