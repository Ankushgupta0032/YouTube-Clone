
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("Uploading file:", localFilePath);

    const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(localFilePath);

    let response;

    if (isVideo) {
      // upload_large returns a stream, so wait for its final result
      response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          localFilePath,
          {
            resource_type: "video",
            chunk_size: 6000000,
            folder: "youtube-clone/videos",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    } else {
      response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "image",
        folder: "youtube-clone/thumbnails",
      });
    }

    console.log("Cloudinary upload successful:", response.secure_url);

    return response;

  } catch (error) {
    console.log("CLOUDINARY ERROR:", error.message);
    return null;

  } finally {
    // Delete local file only after upload has completed or failed
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

export { uploadOnCloudinary };
