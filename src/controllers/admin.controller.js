import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { prisma } from "../db/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateUserImage = asyncHandler(async (req, res) => {
  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(401, "Cover Image file is missing");
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage?.url) {
    throw new ApiError(401, "Error while uploading cover image");
  }


  // delete existing image (only 1 allowed)
  await prisma.image.deleteMany();

  // insert new record
  const newImage = await prisma.image.create({
    data: {
      imageUrl: uploadedImage.url,
      publicId: uploadedImage.public_id,
    }

  });

  return res
    .status(200)
    .json(new ApiResponse(200, newImage, "Cover Image updated successfully"));
});

export { updateUserImage };
