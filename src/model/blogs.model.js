import mongoose, { Schema } from "mongoose";

const blogItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    default: null,
  },
  imageUrl : {
    type: String,
    default: null,
  }

});

const blogSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    blog: {
      type: [blogItemSchema], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
