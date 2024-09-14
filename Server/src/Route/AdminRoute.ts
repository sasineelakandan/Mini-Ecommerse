import { Router } from "express";
import {adminLogin,AddProducts,ProductLists} from "../Controller/AdminController";
const AdminRoute = Router();

AdminRoute.post('/adminlogin', adminLogin);
AdminRoute.post('/product',AddProducts);
AdminRoute.get('/productlist',ProductLists)

export default AdminRoute;