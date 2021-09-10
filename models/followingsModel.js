"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');

var followings = new mongoose.Schema({
  _id: false,
  artist: {
    //ifollowingss should be artist

    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "followingsId can not be empty!"],
  },
  followings: [
    //artista yaru yaru follow panrarnga

    //to get the count of tghe followingss, create a virtuals data on scehama. in that virtual data function, count all the followingss  this.followingss.length();
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
      minItems: 0,
      maxItems: 1000,
      description: "A followings cannot follow more than 1000 artist",
    },
  ],
});

const followings = mongoose.model("followings", followingsSchema);
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
