const mongoose = require("mongoose");

const orderedItem = new mongoose.Schema({
  cart: {
    //to get the shipping details and stuffs
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
    required: [true, "orderItem must belong to a cart!"],
  },
  artistId: {
    type: String,
    required: [true, "orderItem must belong to a artist!"],
  },

  productId: {
    //the seller might change/delete the name  of a product in future thats why this data.
    type: String,
    required: [true, "orderItem must belong to a Product!"],
  },
  customerId: {
    type: String,
    required: [true, "orderItem must belong to a Customer!"],
  },

  productDetail: {
    //to get the history pf the ordered item
    type: Object,
    productName: {
      //the seller might change/delete the name  of a product in future thats why this data.
      type: String,
      required: [true, "orderItem must belong to a Product!"],
    },
    customerName: {
      type: String,
      required: [true, "orderItem must belong to a Customer!"],
    },
    artistName: {
      //when a artist updates his name, we should update here
      type: String,
      required: [true, "orderItem must belong to a Artist!"],
    },
    price: {
      //we might change the price of a product in future thats why this data.
      type: Number,
      require: [true, "Product must have a price."],
    },
    artistPrice: {
      //we might change the price of a product in future thats why this data.
      type: Number,
      require: [true, "Product must have a price."],
    },
    //no need for discount history in orderHistory
    backgroundColor: {
      type: String,
      require: [true, "Product must have a color"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },

  alignment: {
    //only fill if the cart is inactive, when paid
    //alignment of the art(image) inside previewDetailImage
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

  isRefundAsked: {
    //if refund is asked thn based on that delete the quantity and price from the order details when querying
    type: Boolean,
    default: false,
  },
  refundRequestDate: {
    type: Date,
  },
  isRefunded: {
    type: Boolean,
    default: false,
  },
  refundType: {
    //based on the refund type, in the admin panel, allow admin to select from drop down . if full refund is selected,mark every product in the carts refund amount===price and
    //if not then ask fdrom admins to select the refund product and refund amount/qty
    type: String,
    enum: ["Full", "Partial"],
    default: "Partial",
  },
  refundAmount: {
    type: Number,
    default: 0,
    select: false,
  },
  refundQty: {
    type: Number,
    default: 0,
    select: false,
  },
  isPaidToArtist: {
    type: Boolean,
    default: false,
  },
  instruction: {
    //any instruction made by the customer. - add my name in the back of the tshirt
    type: String,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "name",
  });
  next();
});

const orderedItem = mongoose.model("orderedItem", orderedItemSchema);

module.exports = orderedItem;

//create virtual for price-artistPrice and paid to artist or not. Inorder to check the transactions happened in teh company. [credit,debit]
