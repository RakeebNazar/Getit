"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');

var following = new mongoose.Schema({
  _id: false,
  user: {
    //ifollowingss should be artist

    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "userId can not be empty!"],
  },
  following: [
    //artista yaru yaru follow panrarnga

    //to get the count of tghe followingss, create a virtuals data on scehama. in that virtual data function, count all the followingss  this.followingssArray.length();
    {
      _id: false,
      followingId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      status: {
        type: Number,
        enums: [
          0, //requested
          1, //accepted/followings/remove,
        ],
      },
      //set the min/max in pre create hook, se code below
    },
  ],
});

// schema.pre('create', function(next) {
//   if (this.todoList.length > 10) throw("todoList exceeds maximum array size (10)!");
//   next();
// });
const following = mongoose.model("following", followingSchema);
// var test = mongoose.model("Test", Test);

// (async function () {
//   var doc = new test({
//     name: "john",
//     followThem: [{ id: "61253bccb7ec5edfcfd2b5ff", status: "friends" }],
//   });
//   await doc.save();
//   console.log(await test.find({}));
// })();

module.exports = followings;
