const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  //NOTE: when showing products in the cart, then get the discount, and product price details from product table and update the discount and price in here.
  //(check if the orderdetail products details and product tables product details are same,if not thn pdate that orderDetails product from
  // the current product and thn based on that orderDetail create the items in the cart)
  //but when showing order history, thn get the discount/price from this collection
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
    required: [true, "OrderItem must belong to a cart!"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "OrderItem must belong to a Product!"],
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "OrderItem must belong to a customer!"],
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "OrderItem must belong to a artist!"],
  },
  discount: {
    type: mongoose.Schema.ObjectId,
    ref: "Discount",
  },
  productName: {
    //the seller might change/delete the name  of a product in future thats why this data.
    type: String,
    required: [true, "OrderItem must belong to a Product!"],
  },

  productDetail: {
    type: Object,
    customerName: {
      type: String,
      required: [true, "OrderItem must belong to a Customer!"],
    },
    artistName: {
      type: String,
      required: [true, "OrderItem must belong to a Artist!"],
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

    discount: {
      type: Number,
      default: 0,
    },

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

  removed: {
    //checking weather its removed from cart or not
    type: Boolean,
    default: false,
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

const Orderitem = mongoose.model("OrderDetail", OrderDetailSchema);

module.exports = OrderDetail;
