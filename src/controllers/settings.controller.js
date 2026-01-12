import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Settings from "../model/settings.model.js"

const getsettings = asyncHandler(async (req, res) => {
  const setting = await Settings.findOne().sort({ createdAt: -1 });

  if (!setting) {
    return res.status(200).json(
      new ApiResponse(200, {
        username : "",
        password : ""
      }, "No setting data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, setting, "setting fetched successfully")
  );
});

const updateusername = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    throw new ApiError(400, "username cannot be empty");
  }

  let setting = await Settings.findOne().sort({ createdAt: -1 });

  if (!setting) {
    // NO settings existed before → create both fields
    setting = new Settings({
      username,
      password: "admin123"   // temporary default
    });
  } else {
    // UPDATE ONLY USERNAME
    setting.username = username;
  }

  await setting.save();

  return res
    .status(200)
    .json(new ApiResponse(200, setting, "username updated successfully"));
});

const updatepassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new ApiError(400, "password cannot be empty");
  }

  let setting = await Settings.findOne().sort({ createdAt: -1 });

  if (!setting) {
    // NO settings existed before → create both fields
    setting = new Settings({
      username: "admin@babycare.com",      // temporary default
      password
    });
  } else {
    // UPDATE ONLY PASSWORD
    setting.password = password;
  }

  await setting.save();

  return res
    .status(200)
    .json(new ApiResponse(200, setting, "password updated successfully"));
});



export {
    getsettings,
    updateusername,
    updatepassword,
    
}



