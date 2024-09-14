// AuthRoute.ts
import { Router } from "express";
import { SignUp ,Login,ProductPage} from "../Controller/UserConteoller";
const AuthRoute = Router();

AuthRoute.post('/signup', SignUp);
AuthRoute.post('/login', Login);
AuthRoute.get('/userproducts',ProductPage)
export default AuthRoute;
