import mongoose from "mongoose"

const cartSchema = new mongoose.Schema(
  {
    userId: { type:String, required: true },
    productId: {
      type: String,
      required: true,
     
    },
    productImage: {type: String} ,
    Status:{type:String},
    productQuantity: { type: Number, required: true, default: 1, min: 1 },
    totalCostPerProduct: { type: Number },
    productName:{type:String},
    productprice:{ type: Number }
  },
 
);

const cartCollection = mongoose.model("carts", cartSchema);

export default  cartCollection;