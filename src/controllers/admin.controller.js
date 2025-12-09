import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { prisma } from "../db/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateUserImage = asyncHandler(async (req, res) => {
  const uploadedImage = await uploadOnCloudinary(req.file.buffer);


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
    .json(new ApiResponse(200, newImage, "Image updated successfully"));
});

const getUserImage = asyncHandler(async (req,res) => {

  const latestImage = await prisma.image.findFirst({
    orderBy: { createdAt: "desc" }, // latest uploaded image
  });

  if (!latestImage) {
    return res.status(404).json(new ApiResponse(404, { imageUrl: null }, "No image found"));
  }

  res.status(200)
  .json(new ApiResponse(200, { imageUrl: latestImage.imageUrl }, "Fetched successfully"));
})

export { updateUserImage };
