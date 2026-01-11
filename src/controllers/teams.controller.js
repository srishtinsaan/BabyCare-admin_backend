import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Team from "../model/teams.model.js"



const getteams = asyncHandler(async (req, res) => {
  const team = await Team.findOne().sort({ createdAt: -1 });

  if (!team) {
    return res.status(200).json(
      new ApiResponse(200, {
        heading: "",
        subHeading: "",
        team: []
      }, "No team data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, team, "team fetched successfully")
  );
});

const addteamItem = asyncHandler(async (req, res) => {

console.log("===> ADD team HIT", { url: req.originalUrl, method: req.method });
console.log("Content-Type:", req.headers["content-type"]);
console.log("BODY:", req.body);
console.log("FILES:", Object.keys(req.files || {}));
if (req.files) console.log("FILES DETAIL:", req.files)

  if (!req.body?.name) {
    throw new ApiError(400, "Name is required");
  }

  let teamDoc = await Team.findOne().sort({ createdAt: -1 });

  if (!teamDoc) {
    teamDoc = await Team.create({
      heading: "",
      subHeading: "",
      team: []
    });
  }

  let imageUrl = null;

  if (req.files?.image?.[0]) {
    const uploaded = await uploadOnCloudinary(req.files.image[0].buffer);
    imageUrl = uploaded?.url || null;
  }

  
  const newteam = {
    name: req.body.name || "",
    designation: req.body.designation || "",
    imageUrl,
  };

  teamDoc.team.push(newteam);
  await teamDoc.save();

  return res.status(201).json(
    new ApiResponse(201, teamDoc.team, "team item added")
  );
});

const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest team row
  const team = await Team.findOneAndUpdate(
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
    .json(new ApiResponse(200, team, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest team row
  let team = await Team.findOne().sort({ createdAt: -1 });

  if (team) {
    // Update existing document
    team.subHeading = subHeading;
    await team.save();
  } else {
    // Create new document
    team = await Team.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, team, "Sub-heading updated successfully"));
});

const updateteamItem = asyncHandler(async (req, res) => {
  
  
  const { teamId } = req.params;
  const updateData = req.body;

  if (!teamId) {
    throw new ApiError(400, "team ID is required");
  }

  const teamDoc = await Team.findOne().sort({ createdAt: -1 });
  if (!teamDoc) {
    throw new ApiError(404, "team section not found");
  }

  const teamItem = teamDoc.team.id(teamId);
  if (!teamItem) {
    throw new ApiError(404, "team item not found");
  }

  // Upload main team image if provided
  if (req.files?.image) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "team image upload failed");
    }
    teamItem.imageUrl = uploadedImage.url;
  }

  

  // Update other allowed fields
  const allowedFields = [
    "name",
    "designation"
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      teamItem[field] = updateData[field];
    }
  });

  await teamDoc.save();

  return res.status(200).json(
    new ApiResponse(200, teamItem, "team updated successfully")
  );
});


export {
  getteams,addteamItem,
    updateHeading,
    updateSubHeading,
    updateteamItem
}



