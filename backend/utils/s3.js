import S3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESSKEY
const secretAccessKey = process.env.AWS_SECRETKEY
const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

// upload file to s3
export const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }
  return s3.upload(uploadParams).promise()
}

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  }
  return s3.getObject(downloadParams).createReadStream()
}
