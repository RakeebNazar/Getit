// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const shippingFeeSchema = new mongoose.Schema({
  destination: {
    //this will help the browser to calculate the shipping fee, basedon teh slected user address
    type: String,
    required: [true, "shippingFee must have a destination"],
    enums: [
      "Colombo",
      "Kandy",
      "Galle",
      "Ampara",
      "Anuradhapura",
      "Badulla",
      "Batticaloa",
      "Gampaha",
      "Hambantota",
      "Jaffna",
      "Kalutara",
      "Kegalle",
      "Kilinochi",
      "Kurunagela",
      "Mannar",
      "Matale",
      "Matara",
      "Monaragala",
      "Mullativu",
      "Nuawara Eliya",
      "Polannaruwa",
      "Puttalam",
      "Ratnapura",
      "Trincomalee",
      "Vavuniya",
    ],
  },

  fee: {
    //colombo = 150, outStation:300, farAway:400
    type: Number,
    required: [true, "shippingDetail must have a fee"],
  },

  AddOn: {
    //perKgAddOnFee after initial Fee
    //colombo = 50, outStation:75, farAway:100
    type: Number,
    required: [true, "shippingDetail must have a fee"],
  },
});

const shippingFee = mongoose.model("shippingFee", shippingFeeSchema);

module.exports = shippingFee;
