import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Settings from "../model/settings.model.js"


const updateusername = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    throw new ApiError(400, "username cannot be empty");
  }

  // Find latest setting row
  const setting = await Settings.findOneAndUpdate(
  {},
  { username },
  {
    sort: { createdAt: -1 },
    new: true,
    upsert: true,
  }
);


  return res
    .status(200)
    .json(new ApiResponse(200, setting, "username updated successfully"));
});

const updatepassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest setting row
  let setting = await Settings.findOne().sort({ createdAt: -1 });

  if (setting) {
    // Update existing document
    setting.password = password;
    await setting.save();
  } else {
    // Create new document
    setting = await Settings.create({ password });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, setting, "Sub-heading updated successfully"));
});


export {
  
    updateusername,
    updatepassword,
    
}



