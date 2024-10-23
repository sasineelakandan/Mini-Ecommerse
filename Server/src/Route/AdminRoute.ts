import { Router } from "express";
import {adminLogin,AddProducts,ProductLists, userslist} from "../Controller/AdminController";
const AdminRoute = Router();

AdminRoute.post('/adminlogin', adminLogin);
AdminRoute.post('/product',AddProducts);
AdminRoute.get('/productlist',ProductLists)
AdminRoute.get('/users',userslist)
export default AdminRoute;