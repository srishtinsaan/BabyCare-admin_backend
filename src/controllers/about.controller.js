import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import About from "../model/about.model.js"

const getAboutData = asyncHandler(async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 })

    if (!about) {
      return res.status(200).json(
        new ApiResponse(200, {}, "No about section found")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, about, "Fetched successfully")
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

  // Find latest About row
  let about = About.findOne().sort({ createdAt: -1 })

  
  if (about) {
    // Update existing document
    about.heading = heading;
    await about.save();
  } else {
    // Create new document
    about = await About.create({ heading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, about, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest About row
  let about = await About.findOne().sort({ createdAt: -1 });

  if (about) {
    // Update existing document
    about.subHeading = subHeading;
    await about.save();
  } else {
    // Create new document
    about = await About.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, about, "Sub-heading updated successfully"));
});

const updateParagraph = asyncHandler(async (req, res) => {
  const { paragraph } = req.body;

  if (!paragraph) {
    throw new ApiError(400, "Paragraph cannot be empty");
  }

  // Find latest About row
  let about = await About.findOne().sort({ createdAt: -1 });

  if (about) {
    // Update existing document
    about.paragraph = paragraph;
    await about.save();
  } else {
    // Create new document
    about = await About.create({ paragraph });
  }

  res.status(200).json(
    new ApiResponse(200, about, "Paragraph updated successfully")
  );
});

const updateRightImage = asyncHandler(async (req, res) => {
  const uploadedImage = await uploadOnCloudinary(req.file.buffer);

  if (!uploadedImage?.url) {
    throw new ApiError(401, "Error uploading right image");
  }

  

  let about = await About.findOne().sort({ createdAt: -1 });

  if (about) {
    // Update existing document
    about.rightImageUrl = uploadedImage.url;
    await about.save();
  } else {
    // Create new document
    about = await About.create({
      rightImageUrl: uploadedImage.url,
    });
  }


  res.status(200).json(
    new ApiResponse(200, about, "Right image updated successfully")
  );
});

const updateBackgroundImage = asyncHandler(async (req, res) => {
  const uploadedImage = await uploadOnCloudinary(req.file.buffer);

  if (!uploadedImage?.url) {
    throw new ApiError(401, "Error uploading background image");
  }


  let about = await About.findOne().sort({ createdAt: -1 });

  if (about) {
    // Update existing document
    about.bgImageUrl = uploadedImage.url;
    await about.save();
  } else {
    // Create new document
    about = await About.create({
      bgImageUrl: uploadedImage.url,
    });
  }


  res.status(200).json(
    new ApiResponse(200, about, "Background image updated successfully")
  );
})




// const updateUserImage = asyncHandler(async (req, res) => {
//   const uploadedImage = await uploadOnCloudinary(req.file.buffer);


//   if (!uploadedImage?.url) {
//     throw new ApiError(401, "Error while uploading cover image");
//   }


//   // delete existing image (only 1 allowed)
//   await prisma.image.deleteMany();

//   // insert new record
//   const newImage = await prisma.image.create({
//     data: {
//       imageUrl: uploadedImage.url,
//       publicId: uploadedImage.public_id,
//     }

//   });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, newImage, "Image updated successfully"));
// });

// const getUserImage = asyncHandler(async (req,res) => {

//   const latestImage = await prisma.image.findFirst({
//     orderBy: { createdAt: "desc" }, // latest uploaded image
//   });

//   if (!latestImage) {
//     return res.status(404).json(new ApiResponse(404, { imageUrl: null }, "No image found"));
//   }

//   res.status(200)
//   .json(new ApiResponse(200, { imageUrl: latestImage.imageUrl }, "Fetched successfully"));
// })

export {
  getAboutData,
  updateHeading,
  updateSubHeading,
  updateParagraph,
  updateRightImage,
  updateBackgroundImage
};