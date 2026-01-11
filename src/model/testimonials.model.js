import mongoose, { Schema } from "mongoose";

const testimonialItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl : {
    type: String,
    default: null,
  }

});

const testimonialSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    testimonial: {
      type: [testimonialItemSchema], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("testimonial", testimonialSchema);
export default Testimonial;
