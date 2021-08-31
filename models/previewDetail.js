// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const PreviewDetailSchema = new mongoose.Schema({
  previewId: {
    //when adding new product to database, we might have top search, based on mobilePreview id, render all the preview detail docs from this collection. e.g mobileId-6s,5s]
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "PreviewDetail must belong to a preview!"],
  },
  PreviewDetailName: {
    //6s,5s,longsleeveTshirt
    //the seller might change/delete the name  of a PreviewDetail in future thats why this data.
    type: String,
    required: [true, "PreviewDetail must have a name"],
  },
  images: [
    //we might change the price of a PreviewDetail in future thats why this data.
    { type: String, require: [true, "PreviewDetail must have a image."] },
  ],

  color: {
    //use this only if previewDetail is a dress
    type: String,
    default: "blank",
  },
  //   discount: {  //check
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Discount",
  //   },
  dressAvailabilty: {
    //fill this only if the previewDetail is a dress
    type: Object,
    extraSmall: Number,
    small: Number,
    medium: Number,
    large: Number,
    extraLarge: Number,
  },
  availablity: {
    //use this if its other prodycts other then dress
    type: Number,
  },

  previewId: {
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "PreviewDetail must have a preview!"],
  },
});

const PreviewDetail = mongoose.model("PreviewDetail", PreviewDetailSchema);

module.exports = PreviewDetail;
