"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");

// const bcrypt = require('bcryptjs');

var cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Cart Must Belong to a user"],
  },
  product: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
      },
      qty: {
        type: String,
      },
    }, //set the max prodcut item in ore create hook, see code below
  ],
  shippingFee: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "shippingFee",
      },
      qty: {
        type: String,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    //we change it when a cart is oaid successfully.
    type: Number,
    enums: [
      0, //pending
      1, //sent,
      2, //RecievedByCustomer
    ],
    required: [true, "Cart Must have a order status"],
  },
  wayBillNo: {
    type: String,
  },
  shippingAddress: {
    //added on proceed to checkout. inorder to calculaye the toal amount
    type: String,
  },
  shippingPrice: {
    //added when payment is made
    //if shipping address / quantity is out of colombo or larger than 20, thn calculate the shipping price based on that,
    //on the front end and verify the shipping price on the backned based on the quantity and address before accepting the payment
    type: Number,
    default: 150,
  },
  mobileNumber: {
    //added when payment is made.mandotory on front end, before checkout
    type: String,
  },

  paymentMethod: {
    //added when payment is made.mandotory on front end, before checkout
    type: String,
    default: "Cash", //Cash/Card
  },

  IsActive: {
    //when a order is paid successfully, thn mark this as inactive.
    //thn when we need to show the current cart, thn we could, search the active cartId from orderDetail and display the current products on the cart
    //whenever user has a active cart, thn show them only that cart. do not allow them to create new
    type: Boolean,
    default: true,
  },
  paid: {
    //update this based on cash/cart payment
    type: Boolean,
    default: false,
  },
  total: {
    //on the front end show the total based on product price. thn calculate the sub total based on shipping price. if any coupon code is applied thn substract
    //that ampount as well. (on a datya set, add the shipping prices based on the shipping address and qty)
    //verify these amounts on backened. (check how jonas varyfied the tour price on backened. )
    //only create total cart price, after the varifyication and payment is made.
    //note: discount is added on the front end after checking the discount coupon is valid via fetch. and we would update isDiscountapplied to true on the
    //current cart doc. if user try to add any other coupon after that on front, we wont allow them to. on the front end.
    //once payemnt is clicked, on front, we would take the coupon code, shpping address, product id, qty and check these are valid and calculate the price on
    //backened  //allow them to pay. once the payment is done, we would add that details of the order to cart(discount amount).
    type: Number,
  },
  discount: {
    //when a discount is applied on front, create the discount coupon id here. based on the whenever a cart is request by user,
    //apply this discount and show the subtotal until, it is removed by the user on front. if removed on fron thn remove from the cart collection as well.

    type: mongoose.Schema.ObjectId,
    ref: "discount",
  },
  isDiscountApplied: {
    type: Boolean, //if special/newUser discout is applied once, dont allow customer to apply any other coupon again
    default: false,
  },
});

const cart = mongoose.model("Cart", cartSchema);

// schema.pre('create', function(next) {      //pre hook to limit products on a cart
//   if (this.todoList.length > 10) throw("todoList exceeds maximum array size (10)!");
//   next();
// });
// var test = mongoose.model("Test", Test);

// (async function () {
//   var doc = new test({
//     name: "john",
//     followThem: [{ id: "61253bccb7ec5edfcfd2b5ff", status: "friends" }],
//   });
//   await doc.save();
//   console.log(await test.find({}));
// })();

module.exports = cart;
