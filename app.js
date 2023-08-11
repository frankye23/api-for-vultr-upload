const express = require('express');
const multer = require('multer');
const cors = require('cors');
const AWS = require('aws-sdk');
const config = require('./config')

const app = express();
app.use(cors());

const port = 9600;

const accessKeyId = config.accessKeyId;
const secretAccessKey = config.secretAccessKey;
const region = config.region;
const bucketName = config.bucketName;
const hostname = config.hostname

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  endpoint: hostname
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format.'));
    }
  },
}).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).send('File size is too large.');
      } else {
        res.status(400).send(err.message);
      }
      return;
    }

    const file = req.file;
    const key = file.originalname;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        res.status(500).send('Failed to upload file to S3.');
        return;
      }
      const url = `https://${hostname}/${bucketName}/${key}`;
      res.send(url);
    });
  });
});

// get file list api
app.get('/list', (req, res) => {
  const params = {
    Bucket: bucketName,
  };

  s3.listObjects(params, (err, data) => {
    if (err) {
      res.status(500).send('Failed to get file list.');
      return;
    }
    const items = data.Contents
    res.send(items);
  });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
