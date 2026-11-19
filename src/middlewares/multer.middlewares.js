// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp");
//     },

//     filename: function (req, file, cb) {
//         const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

//         cb(null, uniqueName);
//     },
// });

// export const upload = multer({
//     storage,
// });


import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve("public/temp");

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
});
