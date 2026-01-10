import mongoose, { Schema } from "mongoose";

const eventItemSchema = new Schema({
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

const eventSchema = new Schema(
  {
    heading: {
      type: String,
      default: null,
    },
    subHeading: {
      type: String,
      default: null,
    },
    event: {
      type: [eventItemSchema], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
