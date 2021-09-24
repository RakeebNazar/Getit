// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  //note: if you want to add products, (own), withut any designs at all, thn turn off the art, alignments required and add the products on a specific route by admins.
  //and thn change the isOwner to true, so when rendering products on the front end, i can  do if(product.isOwner) dont try to apply art/alignemtn
  productName: {
    //previewDetailName+artTitle. update this if art title is changed.
    type: String,
    required: [true, "Product must have a name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    //previewDetailsPrice+atistCommisionTakenByArt
    type: String,
    required: [true, "Product must have a price"],
  },
  previewDetailId: {
    //must, when rendering products on the front end for 6s cover, thn from the product table, we need the images of 6s, which is  available on previewDetail
    type: mongoose.Schema.ObjectId,
    ref: "previewDetail",
    // required: [true, "Product must have a previewDetail!"], only add this if its not own
  },
  art: {
    //populate inside aggregate //need art image,art commision, and filter the mature content based on art's is allowerd.(ndexed) and private or public.
    //and create new filed on aggregate pipleine. always do this on aggregate find()
    // use if statement inside aggregate or javascript (before getting the art or after getting the empty art) to filter the own products. and to
    //to dont add art image for own products. do this for art and alignments.
    type: mongoose.Schema.ObjectId,
    ref: "art",
    required: [true, "Product must have a art!"], //no art for own products add condition
  },
  artist: {
    //when artist changes his name we have to update it here.. i could have taken the artist from art.
    // but when a customer clicked on products of this artist we have to filter all the products of him.
    //artist
    //1:1
    type: String,
    required: [true, "Product must have a artist"], //for artis - sold by getIt.lk
  },
  subCategory: {
    //1:many, gonna index
    type: String,
    required: [true, "Product must belong to a subCategory!"],
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
    //    required: [true, "Product must have alignments!"], only add this as conditonb to non own product
  },

  //data for own product. should not be filled for no own products

  isOwn: {
    type: Boolean,
    deafult: false,
  },

  images: [
    { type: String, require: [true, "product must have a image."] }, //conditionally onluy for own product,
  ],
  dressAvailabilty: {
    //fill this only if the previewDetail is a dress
    type: Object,
    extraSmall: Number,
    small: Number,
    medium: Number,
    large: Number,
    extraLarge: Number,
  },
  availablity: {
    //use this if its other prodycts other then dress
    type: Number,
  },
  Description: {
    //Durable flexible case that grips around the edges of your phone //Shock absorbent TPU case with anti-fingerprint finish
    type: String,
  },
  maxShipping: {
    //for tshirt.(130g) 6tshirt per kg. so 6shirtMaxqty. if max quantity is reached,thn additional shipping fee will be deducted per additonal kg
    type: Number,
    required: [true, "previewDetail must have a maxShipping"], //conditionally onluy for own product,`
  },
  sizeChart: {
    //size chart should be created to dresses, and it will be a image
    type: String,
  },
});

productSchema.index({ price: 1, productName: 1, subCategory: 1 });

const product = mongoose.model("Product", productSchema);

module.exports = product;

//in pre find hook/virtuals, create a background color, discount and Finalprice(based on prevoew price + artist commision) amount based on prviewDetail,
//because, if we embed the discount on product schema, when we update a discountdiscount on
//preview detail, it wont effect here.
//as u know u cant combine aggregate and virtuals together.(check this). oif this is true, thn populate inside aggregate and create
//a new price field inside aggregate object.
