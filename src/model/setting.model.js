import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema(
  {
    new_username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,   // hashed password store hoga
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
