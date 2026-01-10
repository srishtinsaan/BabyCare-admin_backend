import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Event from "../model/events.model.js"

const getEvents = asyncHandler(async (req, res) => {
  const event = await Event.findOne().sort({ createdAt: -1 });

  if (!event) {
    return res.status(200).json(
      new ApiResponse(200, {
        heading: "",
        subHeading: "",
        event: []
      }, "No event data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, event, "event fetched successfully")
  );
});

const addEventItem = asyncHandler(async (req, res) => {

  console.log("===> ADD event HIT", { url: req.originalUrl, method: req.method });
console.log("Content-Type:", req.headers["content-type"]);
console.log("BODY:", req.body);
console.log("FILES:", Object.keys(req.files || {}));
if (req.files) console.log("FILES DETAIL:", req.files)

  if (!req.body?.title) {
    throw new ApiError(400, "Title is required");
  }

  let eventDoc = await Event.findOne().sort({ createdAt: -1 });

  if (!eventDoc) {
    eventDoc = await Event.create({
      heading: "",
      subHeading: "",
      event: []
    });
  }

  let imageUrl = null;

  if (req.files?.image?.[0]) {
    const uploaded = await uploadOnCloudinary(req.files.image[0].buffer);
    imageUrl = uploaded?.url || null;
  }

  

  const newEvent = {
    title: req.body.title || "",
    description: req.body.description || "",
    date: req.body.date || null,
    time: req.body.time || null,
    location: req.body.location || null,
    imageUrl,
  };

  eventDoc.event.push(newEvent);
  await eventDoc.save();

  return res.status(201).json(
    new ApiResponse(201, eventDoc.event, "event item added")
  );
});

const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest event row
  const event = await Event.findOneAndUpdate(
  {},
  { heading },
  {
    sort: { createdAt: -1 },
    new: true,
    upsert: true,
  }
);


  return res
    .status(200)
    .json(new ApiResponse(200, event, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest event row
  let event = await Event.findOne().sort({ createdAt: -1 });

  if (event) {
    // Update existing document
    event.subHeading = subHeading;
    await event.save();
  } else {
    // Create new document
    event = await Event.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, event, "Sub-heading updated successfully"));
});

const updateeventItem = asyncHandler(async (req, res) => {
  
  
  const { eventId } = req.params;
  const updateData = req.body;

  if (!eventId) {
    throw new ApiError(400, "event ID is required");
  }

  const eventDoc = await Event.findOne().sort({ createdAt: -1 });
  if (!eventDoc) {
    throw new ApiError(404, "event section not found");
  }

  const eventItem = eventDoc.event.id(eventId);
  if (!eventItem) {
    throw new ApiError(404, "event item not found");
  }

  // Upload main event image if provided
  if (req.files?.image) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "event image upload failed");
    }
    eventItem.imageUrl = uploadedImage.url;
  }

  

  // Update other allowed fields
  const allowedFields = [
    "title",
    "description",
    "date",
    "time",
    "location"
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      eventItem[field] = updateData[field];
    }
  });

  await eventDoc.save();

  return res.status(200).json(
    new ApiResponse(200, eventItem, "event updated successfully")
  );
});


export {
  getEvents,addEventItem,
    updateHeading,
    updateSubHeading,
    updateeventItem
}



