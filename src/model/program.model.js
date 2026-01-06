import mongoose, { Schema } from "mongoose";

const programItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: null,
  },
  seats: {
    type: Number,
    default: null,
  },
  lessons: {
    type: Number,
    default: null,
  },
  hours: {
    type: Number,
    default: null,
  },
  teacher_name: {
    type: String,
    default: null,
  },
  teacher_role: {
    type: String,
    default: null,
  },
  imageUrl : {
    type: String,
    default: null,
  }

});

const programSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    programs: {
      type: [programItemSchema], // 3 programs
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.model("Program", programSchema);
export default Program;
