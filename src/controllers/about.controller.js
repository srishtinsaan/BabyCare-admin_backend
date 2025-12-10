import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { prisma } from "../db/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAboutData = asyncHandler(async (req, res) => {
  try {
    const about = await prisma.aboutModel.findFirst({
      orderBy: { createdAt: "desc" }
    });

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
  const aboutRow = await prisma.aboutModel.findFirst({
    orderBy: { createdAt: "desc" },
  });

  let about;

  if (aboutRow) {
    // Update existing row
    about = await prisma.aboutModel.update({
      where: { id: aboutRow.id },
      data: { heading },
    });
  } else {
    // Create new row
    about = await prisma.aboutModel.create({
      data: { heading },
    });
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
  const aboutRow = await prisma.aboutModel.findFirst({
    orderBy: { createdAt: "desc" },
  });

  let about;

  if (aboutRow) {
    // Update existing row
    about = await prisma.aboutModel.update({
      where: { id: aboutRow.id },
      data: { subHeading },
    });
  } else {
    // Create new row
    about = await prisma.aboutModel.create({
      data: { subHeading },
    });
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
  const aboutRow = await prisma.aboutModel.findFirst({
    orderBy: { createdAt: "desc" },
  });

  let about;

  if (aboutRow) {
    // Update existing row
    about = await prisma.aboutModel.update({
      where: { id: aboutRow.id },
      data: { paragraph },
    });
  } else {
    // Create new row
    about = await prisma.aboutModel.create({
      data: { paragraph },
    });
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

  const aboutRow = await prisma.aboutModel.findFirst({
      orderBy: { createdAt: "desc" }
  });

  let about;

  if (aboutRow) {
  // update existing row
      about = await prisma.aboutModel.update({
        where: { id: aboutRow.id },
        data: { rightImageUrl: uploadedImage.url },
      });
  } else {
  // create new row
      about = await prisma.aboutModel.create({
        data: { rightImageUrl: uploadedImage.url },
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

  const aboutRow = await prisma.aboutModel.findFirst({
      orderBy: { createdAt: "desc" }
  });

  let about;

  if (aboutRow) {
  // update existing row
      about = await prisma.aboutModel.update({
        where: { id: aboutRow.id },
        data: { bgImageUrl: uploadedImage.url },
      });
  } else {
  // create new row
      about = await prisma.aboutModel.create({
        data: { bgImageUrl: uploadedImage.url },
  });

  res.status(200).json(
    new ApiResponse(200, about, "Background image updated successfully")
  );
}
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