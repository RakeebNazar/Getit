// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const PreviewSchema = new mongoose.Schema({
  name: {
    //(short or long. should have a common preview) Tshirt-Front, TShirt back(NOTE: back or front. cant be both), long sleeve front, Mobile Phone etc.
    type: String,
    required: [true, "Preview must have a name"],
  },
  image: {
    type: String,
    required: [true, "Preview must have a image"],
  },
  price: {
    //we might change the price of a Preview in future thats why this data.
    type: Number,
    require: [true, "Preview must have a price"],
  },

  //check preview connection needed or not on product and create a previewDetail schema as well
});

const Preview = mongoose.model("Preview", PreviewSchema);

module.exports = Preview;
