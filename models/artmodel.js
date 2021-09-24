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
  artCommision: {
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

  previewId: [
    //must, when we want to render seller art edit previews, we might need thhis. when creating editable previews of existing art,
    //get the posiitons of art on the preiviw on product by - {art - subCategory) for 10 subcategory get 10 products doc, and take the positon from there.
    //NOTE: subCategory and previews names are same.Also, show them the unselected previews as greyed out.
    {
      type: mongoose.Schema.ObjectId,
      ref: "preview",
      required: [true, "Art must have a preview!"],
    },
  ],
});

artSchema.index({ isAllowed: -1, visibility: -1 });

const art = mongoose.model("art", artSchema);

module.exports = art;
