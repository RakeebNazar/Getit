// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
  isAllowed: {
    //matureContent
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Art must belong to a Artist"],
  },
  pricePercentage: {
    type: Number,
    required: [true, "Art must have a Price Percentage"],
  },
  Description: {
    type: String,
    required: [true, "Art must have a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  keywords: [
    //add product name and user name as a keyword as well
    {
      type: String,
      required: [true, "Art must have some keywords"],
      minItems: 0,
      maxItems: 20,
      description: "keywords should not exceed 20",
    },
  ],
  art: {
    //image of the art
    type: String,
  },
});

const Art = mongoose.model("Art", ArtSchema);

module.exports = Art;
