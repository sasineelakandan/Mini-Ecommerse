// AuthRoute.ts
import { Router } from "express";
import { SignUp ,Login,ProductPage, DetailPage,AddToCart,cartDetail} from "../Controller/UserConteoller";
const AuthRoute = Router();

AuthRoute.post('/signup', SignUp);
AuthRoute.post('/login', Login);
AuthRoute.get('/userproducts',ProductPage)
AuthRoute.get('/Sviewpage',DetailPage)
AuthRoute.post('/addtocart',AddToCart)
AuthRoute.get('/cartdetails',cartDetail)
export default AuthRoute;
