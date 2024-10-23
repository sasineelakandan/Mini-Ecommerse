import User from "../Model/UserModel";
import Product from "../Model/ProductModel";
import Cart from '../Model/CartModel'
import { Request,Response,NextFunction } from "express";
const pkg=require('bcryptjs');
const bcrypt =require('bcryptjs') 
const { genSalt, hash ,} = pkg;
const jwt=require('jsonwebtoken')
import { JWT_KEY } from '../utils/config';
import cartCollection from "../Model/CartModel";
import 'express-session';
interface SignupData {
    name: string;
    email: string;
    password: string;
    phone: string;
  }

  
  export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { name, email, password, phone }: SignupData = req.body;
  
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        Name: name,
        email,
        phone,
        Password: hashedPassword,
      });
      await newUser.save();
  
      
      const token = jwt.sign(
        { id: newUser._id.toString(), email: newUser.email },
        String(JWT_KEY),
        { expiresIn: '1h' }
      );
  
      
      res.status(200).cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000
      }).json({
        message: 'User registered successfully!',
        token,
      });
    } catch (err) {
      
      console.error('Error during user registration:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
 interface LoginData{
   email:string,
   password:String
   
 }
 

 
  export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }:LoginData = req.body;
      
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
    
      const user = await User.findOne({ email });
         
      if (!user) {
        return res.status(404).json({ userVer: false });
      }
  
      
      const passwordVer = await bcrypt.compare(password, user.Password);
      if (!passwordVer) {
        return res.status(401).json({ passVer: true });
      }
  
      const token = jwt.sign(
        { id: user._id.toString(), email: user.email },
        String(JWT_KEY),
        { expiresIn: '1h' }
      );
     
      
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000, // 1 day
      }).send({
        message: 'Login successful!',
        token,
        user
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const ProductPage=async(req:Request,res:Response)=>{
    try{
      
      const Products=await Product.find({})
      
      res.send(Products)

    }catch(err){
      console.log(err)
    }

  }
  

  export const DetailPage=async(req:Request,res:Response)=>{
    try{
      
      const singleProduct=await Product.findOne({_id:req.query.id})
      res.send(singleProduct)
        
     
        

    }catch(err){
      console.log(err)
    }
  }
 

  export const AddToCart = async (req: Request, res: Response) => {
    interface data {
      userId: string;
      id: string;
      quantity: number;
    }
  
    try {
      const { userId, id, quantity }: data = req.body;
  
      const product = await Product.findOne({ _id: id });
  
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      // Check if the product already exists in the user's cart
      const existingCartItem = await Cart.findOne({ userId: userId, productId: id });
  
      if (Number(product.quantity) >= quantity) {
        const totalprice = quantity * product.price;
  
        
        if (existingCartItem) {
          existingCartItem.productQuantity += quantity;
          existingCartItem.totalCostPerProduct = existingCartItem.productQuantity * product.price;
          await existingCartItem.save();
  
          res.send({
            message: 'Product quantity updated in the cart',
            cartItem: existingCartItem,
          });
        } else {
          
          const cartItem = new Cart({
            userId: userId,
            productId: product._id,
            productImage: product.imageUrl,
            productQuantity: quantity,
            productprice: product.price,
            productName: product.name,
            totalCostPerProduct: totalprice,
          });
          await cartItem.save();
  
          res.send({
            message: 'Product added to the cart',
            cartItem,
          });
        }
      } else {
        
        res.status(400).json({ message: 'Not enough stock available' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  ;


export const cartDetail=async(req:Request,res:Response)=>{
  try{
    
   const cart=await Cart.find({})
   res.send(cart)
  }catch(err){
    console.log(err)
  }
}




  
  