import { S3 } from "aws-sdk";

// Create an instance of the S3 client
const s3 = new S3({
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function uploadToS3(file: Express.Multer.File, userId: string) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `profiles/${userId}_${Date.now()}_${file.originalname}`, 
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Upload to S3
  const result = await s3.upload(params).promise();
  return result.Location; // Returns the public URL of the uploaded file
}