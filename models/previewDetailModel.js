// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");
//u should cteaye tshirts based on nech type
const PreviewDetailSchema = new mongoose.Schema({
  previewId: {
    //when adding new product to database, we might have to search, based on mobilePreview id, render all the preview detail docs from this collection. e.g mobileId-6s,5s]
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "PreviewDetail must belong to a preview!"],
  },
  type: {
    //iphone/standardShortSleeve, PremiumLongSleeve
    //the seller might change/delete the name  of a PreviewDetail in future thats why this data.
    type: String,
    required: [true, "PreviewDetail must have a type"],
  },
  model: {
    //6s,crew neck-dress.
    type: String,
    required: [true, "PreviewDetail must have a model"],
  },
  images: [
    //we might change the price of a PreviewDetail in future thats why this data.
    { type: String, require: [true, "PreviewDetail must have a image."] },
  ],
  price: {
    //when a product is created it will render the price from here
    type: Number,
    required: [true, "PreviewDetail must have a price"],
  },
  discount: {
    //product would take the discount here by populate. NOTE: we might want
    type: Number,
    default: 0,
  },
  subCategory: {
    //
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "PreviewDetail must belong to a preview!"],
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
});

const PreviewDetail = mongoose.model("PreviewDetail", PreviewDetailSchema);

module.exports = PreviewDetail;
