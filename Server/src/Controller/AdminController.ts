import User from "../Model/UserModel";
import Product from '../Model/ProductModel';
const pkg=require('bcryptjs');
const bcrypt =require('bcryptjs') 
const { genSalt, hash ,} = pkg;
import { ADMIN, PASSWORD, JWT_KEY } from '../utils/config'
import { Request, Response } from 'express';
const jwt =require('jsonwebtoken') ;

interface AdminCredentials {
  email: string;
  password: string;
}

export const adminLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    

    

    if (email !== ADMIN || password !== PASSWORD) {
      
      return res.send({ passVer: false });
    }

    if (email === ADMIN && password === PASSWORD) {
      const token = jwt.sign({ email: ADMIN }, JWT_KEY, { expiresIn: '1h' });

      return res.status(200).cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      }).send({
        message: 'Admin logged in successfully!',
        token: token,
        AdminVer: true,
      });
    } else {
      return res.status(401).send({ message: 'Invalid email or password.', passVer: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'An error occurred during login.', AdminVer: false });
  }
};



    interface Product {
        name: string;
        price: number;
        description: string;
        quantity: number;
        imageUrl:string;
      }
      
export const AddProducts=async(req:Request,res:Response) =>{
  const {name,price,description,quantity,imageUrl}:Product= req.body
   try{
    
    const product=new Product({
      name,
      price,
      description,
      quantity,
      imageUrl

    })
   

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
   }catch(err){
    console.log(err)
   }
  
   
}


export const ProductLists=async(req:Request,res:Response)=>{
  try{
    const Productlist=await Product.find({})
    res.send(Productlist)
    
  }catch(err){
    console.log(err)
  }
}

export const userslist=async(req:Request,res:Response)=>{
  try{
    const users=await User.find({})
     res.send(users)
  }catch(err){
    console.log(err)
  }
}
