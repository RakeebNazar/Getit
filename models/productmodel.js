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
  previewDetailId: {
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
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "subCategories",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

//in pre find hook/virtuals, create a background color, discount and Finalprice(based on prevoew price + artist commision) amount based on prviewDetail, because, if we embed the discount on product schema, when we update a discountdiscount on
//preview detail, it wont effect here.
