import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Program from "../model/program.model.js"

const getPrograms = asyncHandler(async (req, res) => {
  const program = await Program.findOne().sort({ createdAt: -1 });

  if (!program) {
    return res.status(200).json(
      new ApiResponse(200, {
        heading: "",
        subHeading: "",
        programs: []
      }, "No program data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, program, "Program fetched successfully")
  );
});


const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest program row
  const program = await Program.findOneAndUpdate(
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
    .json(new ApiResponse(200, program, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest program row
  let program = await Program.findOne().sort({ createdAt: -1 });

  if (program) {
    // Update existing document
    program.subHeading = subHeading;
    await program.save();
  } else {
    // Create new document
    program = await Program.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, program, "Sub-heading updated successfully"));
});

const updateProgramItem = asyncHandler(async (req, res) => {
  const { programId } = req.params;
  const updateData = req.body;

  if (!programId) {
    throw new ApiError(400, "Program ID is required");
  }

  const programDoc = await Program.findOne().sort({ createdAt: -1 });
  if (!programDoc) {
    throw new ApiError(404, "Program section not found");
  }

  const programItem = programDoc.programs.id(programId);
  if (!programItem) {
    throw new ApiError(404, "Program item not found");
  }

  // Upload main program image if provided
  if (req.files?.image) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Program image upload failed");
    }
    programItem.imageUrl = uploadedImage.url;
  }

  // Upload teacher image if provided
  if (req.files?.teacherImg) {
    const uploadedTeacherImg = await uploadOnCloudinary(req.files.teacherImg[0].buffer);
    if (!uploadedTeacherImg?.url) {
      throw new ApiError(500, "Teacher image upload failed");
    }
    programItem.teacherImg = uploadedTeacherImg.url;
  }

  // Update other allowed fields
  const allowedFields = [
    "title",
    "description",
    "price",
    "seats",
    "lessons",
    "hours",
    "teacher_name",
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      programItem[field] = updateData[field];
    }
  });

  await programDoc.save();

  return res.status(200).json(
    new ApiResponse(200, programItem, "Program updated successfully")
  );
});


export {
  getPrograms,
    updateHeading,
    updateSubHeading,
    updateProgramItem
}



