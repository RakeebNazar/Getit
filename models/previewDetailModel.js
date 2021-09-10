//we need this collection because we have multiple images same image for a product. so the image might have duplicate entries of the same image, in many products.
const mongoose = require("mongoose");
//u should cteaye tshirts based on nech type
const previewDetailSchema = new mongoose.Schema({
  previewId: {
    //when adding new product to database, we might have to search, based on mobilepreview id, render all the preview detail docs from this collection. e.g mobileId-6s,5s]
    type: mongoose.Schema.ObjectId,
    ref: "preview",
    required: [true, "previewDetail must belong to a preview!"],
  },
  type: {
    //iphone/standardShortSleeve, PremiumLongSleeve
    //the seller might change/delete the name  of a previewDetail in future thats why this data.
    type: String,
    required: [true, "previewDetail must have a type"],
  },
  model: {
    //6s,crew neck-dress.
    type: String,
    required: [true, "previewDetail must have a model"],
  },
  images: [
    //we might change the price of a previewDetail in future thats why this data.
    { type: String, require: [true, "previewDetail must have a image."] },
  ],
  price: {
    //when a product is created it will render the price from here
    type: Number,
    required: [true, "previewDetail must have a price"],
  },
  discount: {
    //product would take the discount here by populate. this is product specific discount
    type: Number,
    default: 0,
  },
  subCategory: {
    //
    type: mongoose.Schema.ObjectId,
    ref: "preview",
    required: [true, "previewDetail must belong to a preview!"],
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
  features: {
    //Durable flexible case that grips around the edges of your phone //Shock absorbent TPU case with anti-fingerprint finish
    type: String,
  },
  maxquantity: {
    //for tshirt.(130g) 6tshirt per kg. so 6shirtMaxqty. if max quantity is reached,thn additional shipping fee will be deducted per additonal kg
    type: Number,
    required: [true, "preview must have a image"],
  },
  sizeChart: {
    //size chart should be created to dresses, and it will be a image
    type: String,
  },
});

const previewDetail = mongoose.model("previewDetail", previewDetailSchema);

module.exports = previewDetail;
