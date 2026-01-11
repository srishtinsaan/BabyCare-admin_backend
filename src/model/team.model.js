import mongoose, { Schema } from "mongoose";

const teamItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  imageUrl : {
    type: String,
    default: null,
  }

});

const teamSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    team: {
      type: [teamItemSchema], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
