// AuthRoute.ts
import { Router } from "express";
import { SignUp ,Login} from "../Controller/UserConteoller";
const AuthRoute = Router();

AuthRoute.post('/signup', SignUp);
AuthRoute.post('/login', Login);

export default AuthRoute;
