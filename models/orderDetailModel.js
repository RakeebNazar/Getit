const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  //NOTE: when showing products in the cart, then get the discount, and product price details from product table and update the discount and price in here.
  //but when showing order history, thn get the discount/price from this collection
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
  productImage: {
    type: String,
  },
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
    require: [true, "Booking must have a price."],
  },

  discount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
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
