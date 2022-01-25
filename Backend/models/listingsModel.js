const mongoose = require("mongoose")

const listingsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {type: [Number], imdex: "2dsphere"},
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingsSchema)

module.exports = Listing;