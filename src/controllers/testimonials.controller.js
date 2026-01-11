import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Testimonial from "../model/testimonials.model.js"

const gettestimonials = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findOne().sort({ createdAt: -1 });

  if (!testimonial) {
    return res.status(200).json(
      new ApiResponse(200, {
        heading: "",
        subHeading: "",
        testimonial: []
      }, "No testimonial data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, testimonial, "testimonial fetched successfully")
  );
});

const addtestimonialItem = asyncHandler(async (req, res) => {

  console.log("===> ADD testimonial HIT", { url: req.originalUrl, method: req.method });
console.log("Content-Type:", req.headers["content-type"]);
console.log("BODY:", req.body);
console.log("FILES:", Object.keys(req.files || {}));
if (req.files) console.log("FILES DETAIL:", req.files)

  if (!req.body?.name) {
    throw new ApiError(400, "Name is required");
  }

  let testimonialDoc = await Testimonial.findOne().sort({ createdAt: -1 });

  if (!testimonialDoc) {
    testimonialDoc = await Testimonial.create({
      heading: "",
      subHeading: "",
      testimonial: []
    });
  }

  let imageUrl = null;

  if (req.files?.image?.[0]) {
    const uploaded = await uploadOnCloudinary(req.files.image[0].buffer);
    imageUrl = uploaded?.url || null;
  }

  

  const newtestimonial = {
    name: req.body.name || "",
    designation: req.body.designation || "",
    description: req.body.description || "",
    imageUrl,
  };

  testimonialDoc.testimonial.push(newtestimonial);
  await testimonialDoc.save();

  return res.status(201).json(
    new ApiResponse(201, testimonialDoc.testimonial, "testimonial item added")
  );
});

const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest testimonial row
  const testimonial = await Testimonial.findOneAndUpdate(
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
    .json(new ApiResponse(200, testimonial, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest testimonial row
  let testimonial = await Testimonial.findOne().sort({ createdAt: -1 });

  if (testimonial) {
    // Update existing document
    testimonial.subHeading = subHeading;
    await testimonial.save();
  } else {
    // Create new document
    testimonial = await Testimonial.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, testimonial, "Sub-heading updated successfully"));
});

const updatetestimonialItem = asyncHandler(async (req, res) => {
  
  
  const { testimonialId } = req.params;
  const updateData = req.body;

  if (!testimonialId) {
    throw new ApiError(400, "testimonial ID is required");
  }

  const testimonialDoc = await Testimonial.findOne().sort({ createdAt: -1 });
  if (!testimonialDoc) {
    throw new ApiError(404, "testimonial section not found");
  }

  const testimonialItem = testimonialDoc.testimonial.id(testimonialId);
  if (!testimonialItem) {
    throw new ApiError(404, "testimonial item not found");
  }

  // Upload main testimonial image if provided
  if (req.files?.image) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "testimonial image upload failed");
    }
    testimonialItem.imageUrl = uploadedImage.url;
  }

  

  // Update other allowed fields
  const allowedFields = [
    "name",
    "description",
    "designation"
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      testimonialItem[field] = updateData[field];
    }
  });

  await testimonialDoc.save();

  return res.status(200).json(
    new ApiResponse(200, testimonialItem, "testimonial updated successfully")
  );
});


export {
  gettestimonials,addtestimonialItem,
    updateHeading,
    updateSubHeading,
    updatetestimonialItem
}



