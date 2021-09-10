// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const previewSchema = new mongoose.Schema({
  name: {
    //(short or long. should have a common preview) Tshirt-Front, TShirt back(NOTE: back or front. cant be both), long sleeve front, Mobile Phone etc.
    type: String,
    required: [true, "preview must have a name"],

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
    required: [true, "preview must have a image"],
  },
});

const preview = mongoose.model("preview", previewSchema);

module.exports = preview;
