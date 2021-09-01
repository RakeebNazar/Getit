// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const PreviewSchema = new mongoose.Schema({
  name: {
    //(short or long. should have a common preview) Tshirt-Front, TShirt back(NOTE: back or front. cant be both), long sleeve front, Mobile Phone etc.
    type: String,
    required: [true, "Preview must have a name"],

    enums: [
      "Tshirt", //crewnech,longsleeve,shortsleeve
      "PhoneCases", //sent,
      "Tablets",
      "Backpacks", //RecievedByCustomer
      "Stickers",
      "Laptop Skin",
      "Mugs",
    ],
  },
  image: {
    type: String,
    required: [true, "Preview must have a image"],
  },
  sizeChart: {
    //size chart should be created to dresses, and it will be a image
    type: String,
  },

  //check preview connection needed or not on product and create a previewDetail schema as well
});

const Preview = mongoose.model("Preview", PreviewSchema);

module.exports = Preview;
