import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const whitelistedEmails = ['olex@deez.nuts', 'ingo@deez.nuts'];

const jwtMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!whitelistedEmails.includes(decoded.email)) {
      return res.status(403).json({ error: 'Access denied. Email not whitelisted.' });
    }
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default jwtMiddleware;
