// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const artSchema = new mongoose.Schema({
  isAllowed: {
    //matureContent
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: [true, "art must belong have a title"],
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "art must belong to a artist"],
  },
  artistCommision: {
    type: Number,
    required: [true, "art must have a commision"],
  },
  Description: {
    type: String,
    required: [true, "art must have a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  artImage: {
    //image of the art
    type: String,
    required: [true, "art must belong have a image"],
  },
  visibility: {
    //private or public
    type: Boolean,
    deafult: false,
  },
  backgroundColor: {
    type: String,
    default: "white",
  },
  previewId: {
    //must, when we want to render seller art edit previews, we might need thhis.
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "Product must have a preview!"],
  },
});

artSchema.index({ pricisAllowede: -1, visibility: -1 });

const art = mongoose.model("art", artSchema);

module.exports = art;
