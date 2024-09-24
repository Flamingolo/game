import jwt from 'jsonwebtoken';
import dotenv, { config } from 'dotenv';

dotenv.config();

const whitelistedEmails = ['olex@deez.nuts', 'ingo@deez.nuts'];

interface JwtPayload {
  id: string;
  email: string;
}


export const jwtMiddleware = (req, res, next) => {
  const publicRoutes = ['/users/login', '/users/register'];


  if (publicRoutes.includes(req.path)) {
    console.log(`path: ${req.path}`)
    return next();
  }
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      console.log(`path: ${decoded.email}`)
      if (whitelistedEmails.includes(decoded.email)) {
        req.user = decoded;
        console.log(`Bypassing authorization for ${decoded.email}`);
        return next();
      }

      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
  }

  return res.status(401).json({ message: 'Access Token Required' });
};

export default jwtMiddleware;
