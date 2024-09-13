
;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../src/utils/config'; // Adjust the path according to your project structure

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }
interface JwtPayload {
  id: string;
  email: string;
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Retrieve token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ failToken: true }); // Send 401 Unauthorized if no token
  }

  try {
    // Verify token
    const verified = jwt.verify(token, String(JWT_KEY)) as JwtPayload;

    // Attach user information to request
    req.user = verified;

    // Proceed to the next middleware
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(400).json({ message: 'Invalid token' });
  }
}

export default authenticateToken;

