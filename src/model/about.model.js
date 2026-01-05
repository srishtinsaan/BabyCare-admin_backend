import mongoose, {Schema} from "mongoose"

const aboutSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    paragraph: {
      type: String,
      default: null,
    },
    rightImageUrl: {
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

const About = mongoose.model("About", aboutSchema);

export default About;
