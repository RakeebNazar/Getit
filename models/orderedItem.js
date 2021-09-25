const mongoose = require("mongoose");

//when the cart is successfulltpaid then only ordered item will be created.
//when we render order history, we should group the order history based on cart.order
//we might get some data from orderedItem and some other from cart. when rendering order history on frontend.
//e.g --> totalShippingFee(cart), product specofcShippingFee, orderStatus(*orderedItem)
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
  //image positioning for own/artist items
  isOwn: {
    type: Boolean,
    default: false, //if this is true thn based on if condition inside aggregate, take only the image.
    // dpnt try to  position the image on previewIMage.
  },
  previewImage: {
    type: String,
  },
  image: {
    type: String,
    required: [true, "orderItem must have a image!"],
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
    shippingAddress: {
      //shipping address must have a mobile number too.
      //we might have multiple shipping address for multiple products on the cart. so cart doesnt have a shipping address. by default, the default shipping address
      //would be selected on the cart from the shiiping drop down on front end, whenever the cart is rendered.
      //added when payment is made
      //if shipping address / quantity is out of colombo or larger than 20, thn calculate the shipping price based on that,
      //on the front end and verify the shipping price on the backned based on the quantity and address before accepting the payment
      type: String,
      default: 150,
    },
    shippingFee: {
      //we might have seperate shipping fee for seperate orders. also, we have a total shipping fee on the cart as well. This
      //this is the total shipping fee of the orders made on the speicifc cart.
      //since we group the order history based on cart, we might get the total shipping fee from cart, and product specific shipping fee deom here.
      type: Number,
      default: 150,
    },
    orderStatus: {
      //this shouldnt be cart specific. because we might ship a singlee cart's item to multiple addresses.
      //we add it when a cart is oaid successfully.
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
  },

  alignment: {
    //only if it is not a own product
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
