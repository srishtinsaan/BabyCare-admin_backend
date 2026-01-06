import mongoose, { Schema } from "mongoose";

const homeSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    bgImageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
