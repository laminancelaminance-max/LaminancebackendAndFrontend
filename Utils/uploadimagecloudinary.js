import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbelveonz",
  api_key: "279334245836955",
  api_secret: "kBfsiAZe-R8RZPziGDTAxybKVTA",
  secure: true,
});

const uploadImageToCloudinary = async (image) => {
  if (!image || !image.buffer) {
    throw new Error("No image buffer provided");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "laminance" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(image.buffer);
  });
};

export default uploadImageToCloudinary;
