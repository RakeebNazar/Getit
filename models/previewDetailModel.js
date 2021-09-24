//we need this collection because we have multiple images same image for a product. so the image might have duplicate entries of the same image, in many products.
const mongoose = require("mongoose");
//u should cteaye tshirts based on nech type
const previewDetailSchema = new mongoose.Schema({
  previewId: {
    //when adding new artProduct to database, we might have to search, based on mobilepreview id, render all the preview detail docs from this collection. e.g mobileId-6s,5s]
    //if its a ownProduct thn, no need for previewId
    type: mongoose.Schema.ObjectId,
    ref: "preview",
    required: [true, "previewDetail must belong to a preview!"],
  },
  type: {
    //type would act as a subcategory as well. when creating a new product based on preview detail, take the type name from here  and add it on subCategory field
    //of product. when a subcategory is clicked. we would search for that subCategory on the product collection and render the products. NOTE: if a product is already
    //created by the owner e.g asus rog g15, thn the owner would create the product simply on the product collection, without any link to previewDetail.
    //and the subcategory will be created by the ownser as well on the product.
    //mobilePhone/cases//Tshirt/frock

    type: String,
    required: [true, "previewDetail must have a type"],
  },
  model: {
    //6s,crew neck-dress.
    type: String,
    required: [true, "previewDetail must have a model"],
  },
  images: [
    { type: String, require: [true, "previewDetail must have a image."] },
  ],
  price: {
    //when a product is created it will render the price from here
    type: Number,
    required: [true, "previewDetail must have a price"],
  },

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
  Description: {
    //Durable flexible case that grips around the edges of your phone //Shock absorbent TPU case with anti-fingerprint finish
    type: String,
  },
  maxShipping: {
    //for tshirt.(130g) 6tshirt per kg. so 6shirtMaxqty. if max quantity is reached,thn additional shipping fee will be deducted per additonal kg
    type: Number,
    required: [true, "previewDetail must have a maxShipping"],
  },
  sizeChart: {
    //size chart should be created to dresses, and it will be a image
    type: String,
  },
});

const previewDetail = mongoose.model("previewDetail", previewDetailSchema);

module.exports = previewDetail;
