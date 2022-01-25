const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingsModel");
const User = require('../models/userModel')
const multer = require("multer")
const upload = multer()

// const validateCategoryId = (req, res, next) => {
//   if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
//     return res.status(400).send({ error: "Invalid categoryId." });
//       next();
// };

const createListing = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.body.userId);

  const { title, video, categoryId, description, price, location } = req.body;
  const loc = JSON.parse(location);
  const listing = new Listing({
    title,
    // user: req.user._id,
    video,
    categoryId,
    description,
    price,
    location: { type: 'Point', coordinates: [loc.longitude, loc.latitude] }
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
});

// const createListing = asyncHandler(async (req, res) => {
//   console.log(req.body);
// });

const getListings = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.body.userId);



  const listing = await Listing.find({})
  res.json(listing)

 
});

module.exports = {createListing, getListings}