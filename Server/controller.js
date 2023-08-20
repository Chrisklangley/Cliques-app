require("dotenv").config();
const mongoose = require("mongoose");
const Image = require("./Schemas/ImageSchema");
const cloudinary = require("./cloudinary.config");

const uploadToCloudinary = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result.secure_url);

    const newImage = new Image({
      url: result.secure_url,
      contentType: result.resource_type,
      name: result.original_filename,
    });
    await newImage.save();
    res.status(200).json({
      message: "Image uploaded and saved to database.",
      data: newImage,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

const addImg = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  const { originalname, mimetype, buffer } = req.file;
  try {
    const newImage = new Image({
      name: originalname,
      data: buffer,
      contentType: mimetype,
    });
    await newImage.save();
    res.status(200).json({
      message: "Image uploaded and saved to database.",
      data: newImage,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  }
};

const getImg = async (req, res) => {
  try {
    const imageId = req.params.Id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addImg,
  getImg,
  uploadToCloudinary,
};
