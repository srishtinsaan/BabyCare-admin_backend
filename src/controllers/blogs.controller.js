import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Blog from "../model/blogs.model.js"

const getblogs = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne().sort({ createdAt: -1 });

  if (!blog) {
    return res.status(200).json(
      new ApiResponse(200, {
        heading: "",
        subHeading: "",
        blog: []
      }, "No blog data")
    );
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json(
    new ApiResponse(200, blog, "blog fetched successfully")
  );
});

const addblogItem = asyncHandler(async (req, res) => {

  console.log("===> ADD blog HIT", { url: req.originalUrl, method: req.method });
console.log("Content-Type:", req.headers["content-type"]);
console.log("BODY:", req.body);
console.log("FILES:", Object.keys(req.files || {}));
if (req.files) console.log("FILES DETAIL:", req.files)

  if (!req.body?.title) {
    throw new ApiError(400, "Title is required");
  }

  let blogDoc = await Blog.findOne().sort({ createdAt: -1 });

  if (!blogDoc) {
    blogDoc = await Blog.create({
      heading: "",
      subHeading: "",
      blog: []
    });
  }

  let imageUrl = null;

  if (req.files?.image?.[0]) {
    const uploaded = await uploadOnCloudinary(req.files.image[0].buffer);
    imageUrl = uploaded?.url || null;
  }

  

  const newblog = {
    title: req.body.title || "",
    description: req.body.description || "",
    date: req.body.date ||"",
    time: req.body.time || "",
    location: req.body.location || "",
    imageUrl,
  };

  blogDoc.blog.push(newblog);
  await blogDoc.save();

  return res.status(201).json(
    new ApiResponse(201, blogDoc.blog, "blog item added")
  );
});

const updateHeading = asyncHandler(async (req, res) => {
  const { heading } = req.body;

  if (!heading) {
    throw new ApiError(400, "Heading cannot be empty");
  }

  // Find latest blog row
  const blog = await Blog.findOneAndUpdate(
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
    .json(new ApiResponse(200, blog, "Heading updated successfully"));
});

const updateSubHeading = asyncHandler(async (req, res) => {
  const { subHeading } = req.body;

  if (!subHeading) {
    throw new ApiError(400, "Sub-heading cannot be empty");
  }

  // Find latest blog row
  let blog = await Blog.findOne().sort({ createdAt: -1 });

  if (blog) {
    // Update existing document
    blog.subHeading = subHeading;
    await blog.save();
  } else {
    // Create new document
    blog = await Blog.create({ subHeading });
  }


  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Sub-heading updated successfully"));
});

const updateblogItem = asyncHandler(async (req, res) => {
  
  
  const { blogId } = req.params;
  const updateData = req.body;

  if (!blogId) {
    throw new ApiError(400, "blog ID is required");
  }

  const blogDoc = await Blog.findOne().sort({ createdAt: -1 });
  if (!blogDoc) {
    throw new ApiError(404, "blog section not found");
  }

  const blogItem = blogDoc.blog.id(blogId);
  if (!blogItem) {
    throw new ApiError(404, "blog item not found");
  }

  // Upload main blog image if provided
  if (req.files?.image) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "blog image upload failed");
    }
    blogItem.imageUrl = uploadedImage.url;
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
      blogItem[field] = updateData[field];
    }
  });

  await blogDoc.save();

  return res.status(200).json(
    new ApiResponse(200, blogItem, "blog updated successfully")
  );
});


export {
  getblogs,addblogItem,
    updateHeading,
    updateSubHeading,
    updateblogItem
}



