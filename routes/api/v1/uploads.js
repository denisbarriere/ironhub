/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const aws = require('aws-sdk');

/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();

// AWS configuration for file upload
const S3_BUCKET = process.env.S3_BUCKET;
// aws.config.region = 'eu-central-1';

/**
 * ROUTES
**/

// Sign the uploads
router.get('/sign-s3', (req, res, next) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});
  
module.exports = router;