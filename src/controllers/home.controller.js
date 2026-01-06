import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Home from "../model/home.model.js"

const getHomeData = asyncHandler(async (req, res) => {
  try {

    res.setHeader("Cache-Control", "no-store");

    const home = await Home.findOne().sort({ createdAt: -1 })

    if (!home) {
      return res.status(200).json(
        new ApiResponse(200, {}, "No home section found")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, home, "Fetched successfully")
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      new ApiResponse(500, {}, "Server error")
    );
  }
});

const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest home row
  const home = await Home.findOneAndUpdate(
  {},
  { heading },
  {
    sort: { createdAt: -1 },
    new: true,
    upsert: true,
  }
);


  return res
    .status(200)
    .json(new ApiResponse(200, home, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest home row
  let home = await Home.findOne().sort({ createdAt: -1 });

  if (home) {
    // Update existing document
    home.subHeading = subHeading;
    await home.save();
  } else {
    // Create new document
    home = await Home.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, home, "Sub-heading updated successfully"));
});

const updateBackgroundImage = asyncHandler(async (req, res) => {
  const uploadedImage = await uploadOnCloudinary(req.file.buffer);

  if (!uploadedImage?.url) {
    throw new ApiError(401, "Error uploading background image");
  }


  let home = await Home.findOne().sort({ createdAt: -1 });

  if (home) {
    // Update existing document
    home.bgImageUrl = uploadedImage.url;
    await home.save();
  } else {
    // Create new document
    home = await Home.create({
      bgImageUrl: uploadedImage.url,
    });
  }


  res.status(200).json(
    new ApiResponse(200, home, "Background image updated successfully")
  );
})

export {
    getHomeData,
    updateHeading,
    updateSubHeading,
    updateBackgroundImage
}