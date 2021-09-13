const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(viewsController.alerts);

router.get("/"); //get all products.

//productsView
router.get("/product/:name");

//artView
router.get("/art/:id"); //show the art and show all products available on it. on shops art click and products page's art click, should redirect here. on
router.get("/art/edit/:id"); //show previews of the specific art to be edited, should be redirected to the page when a artist click on settings symbol on his art,
// inside shop //allow

//userView
router.get("/user/:id"); //this route should redirect the request to /shop. on the backened we should filter for only artist based on this :id
router.get("/user/:id/shop"); //show all the arts in a shop.
router.get("/user/:id/followers");
router.get("/user/:id/follwings");

//accountView
//subCategort
router.get("/account/settings"); //show all settings, but account edit option should be selected when rendered this view.
router.get("/account/settings/password"); //password change should be selected. //password update should be a seperate route from other user details update.
//because of encryption and stuffs
router.get("/account/deleteAccount");
router.get("/account/settings/sales"); //only for artist, if normal user clicked, tell them to create a shop first.
router.get("/account/payment"); //allow artist to add payment method.
router.get("/account/pricing"); // edit product price percentage
router.get("/account/shop"); // allow them to edit shop name/cover photo

//subCategort
router.get("/:subCategory");

//wishList
router.get("/wishlist");

//cart
router.get("/cart"); //if not loggeds in thn take the cart prodcuts from device, if loggesd in show from db+device.

module.exports = router;
