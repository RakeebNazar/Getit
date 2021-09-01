"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");

// const bcrypt = require('bcryptjs');

var cartSchema = new mongoose.Schema({
  customer: {
    //follower should be a user/artist
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Cart Must Belong to a user"],
    //check weather the followThem id is artist or not. if not thn throw error,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: Number,
    enums: [
      0, //pending
      1, //sent,
      2, //RecievedByCustomer
    ],
    required: [true, "Cart Must Belong to a user"],
  },
  wayBillNo: {
    type: String,
  },
  shippingAddress: {
    //added when payment is made
    type: String,
  },
  shippingPrice: {
    //added when payment is made
    //if shipping address / quantity is out of colombo or larger than 20, thn calculate the shipping price based on that, on the front end and verify the shipping price on the backned based on the quantity and address before accepting the payment
    type: Number,
    default: 150,
  },
  mobileNumber: {
    //added when payment is made
    type: String,
  },

  paymentMethod: {
    //added when payment is made
    type: String,
    default: "Cash", //Cash/Card
  },
  tax: {
    //added when payment is made
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
  },
  IsActive: {
    //when a order is paid successfully, thn mark this as inactive.
    //thn when we need to show the current cart, thn we could, search this cartUd from orderDetail and display the current products on the cart
    type: Boolean,
    default: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  isDiscountApplied: {
    //if special/newUser discout is applied once, dont allow customer to apply that again
    type: Boolean,
    default: false,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
// var test = mongoose.model("Test", Test);

// (async function () {
//   var doc = new test({
//     name: "john",
//     followThem: [{ id: "61253bccb7ec5edfcfd2b5ff", status: "friends" }],
//   });
//   await doc.save();
//   console.log(await test.find({}));
// })();

module.exports = Cart;
