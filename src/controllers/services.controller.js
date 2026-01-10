import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Service from "../model/services.model.js"

const getservices = asyncHandler(async (req, res) => {
  const service = await Service.findOne().sort({ createdAt: -1 });

  if (!service) {
    return res.status(200).json(
      new ApiResponse(200, {
        heading: "",
        subHeading: "",
        service: []
      }, "No service data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, service, "service fetched successfully")
  );
});

const addserviceItem = asyncHandler(async (req, res) => {

  console.log("===> ADD service HIT", { url: req.originalUrl, method: req.method });
console.log("Content-Type:", req.headers["content-type"]);
console.log("BODY:", req.body);
console.log("FILES:", Object.keys(req.files || {}));
if (req.files) console.log("FILES DETAIL:", req.files)

  if (!req.body?.title) {
    throw new ApiError(400, "Title is required");
  }

  let serviceDoc = await Service.findOne().sort({ createdAt: -1 });

  if (!serviceDoc) {
    serviceDoc = await Service.create({
      heading: "",
      subHeading: "",
      service: []
    });
  }

  let imageUrl = null;

  if (req.files?.image?.[0]) {
    const uploaded = await uploadOnCloudinary(req.files.image[0].buffer);
    imageUrl = uploaded?.url || null;
  }

  

  const newservice = {
    title: req.body.title || "",
    description: req.body.description || "",
    imageUrl,
  };

  serviceDoc.service.push(newservice);
  await serviceDoc.save();

  return res.status(201).json(
    new ApiResponse(201, serviceDoc.service, "service item added")
  );
});

const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest service row
  const service = await Service.findOneAndUpdate(
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
    .json(new ApiResponse(200, service, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest service row
  let service = await Service.findOne().sort({ createdAt: -1 });

  if (service) {
    // Update existing document
    service.subHeading = subHeading;
    await service.save();
  } else {
    // Create new document
    service = await Service.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, service, "Sub-heading updated successfully"));
});

const updateserviceItem = asyncHandler(async (req, res) => {
  
  
  const { serviceId } = req.params;
  const updateData = req.body;

  if (!serviceId) {
    throw new ApiError(400, "service ID is required");
  }

  const serviceDoc = await Service.findOne().sort({ createdAt: -1 });
  if (!serviceDoc) {
    throw new ApiError(404, "service section not found");
  }

  const serviceItem = serviceDoc.service.id(serviceId);
  if (!serviceItem) {
    throw new ApiError(404, "service item not found");
  }

  // Upload main service image if provided
  if (req.files?.image) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "service image upload failed");
    }
    serviceItem.imageUrl = uploadedImage.url;
  }

  

  // Update other allowed fields
  const allowedFields = [
    "title",
    "description",
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      serviceItem[field] = updateData[field];
    }
  });

  await serviceDoc.save();

  return res.status(200).json(
    new ApiResponse(200, serviceItem, "service updated successfully")
  );
});


export {
  getservices,addserviceItem,
    updateHeading,
    updateSubHeading,
    updateserviceItem
}



