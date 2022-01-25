const aws = require("aws-sdk");
const multer = require("multer");
const express = require("express");
const multerS3 = require("multer-s3");
const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

// console.log(s3)

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'scrollsell',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `video-${Date.now().toString()}`);
    },
  }),
});

// console.log(upload);

router.post("/", upload.single("video"), (req, res) => {
  res.send(`${req.file.location}`)
  console.log(req.file.location);
  // res.send({
  //   data: req.files,
  //   msg: "sucessfully upload" + req.files + " files!",
  // });
});

module.exports = router;
