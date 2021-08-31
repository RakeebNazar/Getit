// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  isAllowed: {
    //matureContent
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  productName: {
    //the seller might change/delete the name  of a product in future thats why this data.
    type: String,
    required: [true, "Product must have a name"],
  },
  price: {
    //we might change the price of a product in future thats why this data.
    type: Number,
    require: [true, "Product must have a price."],
  },
  discount: {
    type: mongoose.Schema.ObjectId,
    ref: "Discount",
  },
  backgroundColor: {
    type: String,
    required: [true, "Product must have a backgroundColor"],
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Product must belong to a artist!"],
  },
  previewId: {
    //must, when we want to render seller art edit previews, we might need thhis.see point 2 txt.
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "Product must have a preview!"],
  },
  previeDetailId: {
    //must, when rendering products on the front end for 6s cover, thn from the product table, we need the images of 6s, which is  available on previewDetail
    type: mongoose.Schema.ObjectId,
    ref: "Preview",
    required: [true, "Product must have a previewDetail!"],
  },
  art: {
    type: mongoose.Schema.ObjectId,
    ref: "Art",
    required: [true, "Product must have a art!"],
  },

  alignment: {
    type: Object,
    //alignments
    Alwidth: {
      //percentage
      type: String,
    },
    AlHeight: {
      //percentage
      type: String,
    },

    Alsize: {
      //percentage
      type: String,
    },
    AlLeft: {
      type: String,
    },
    AlRight: {
      type: String,
    },
    AlTop: {
      type: String,
    },
    AlBottom: {
      type: String,
    },
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
