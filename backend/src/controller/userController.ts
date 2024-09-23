import { Request, Response } from 'express';
import userServiceInstance from '../service/userService';
import jsonwebtoken from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userServiceInstance.createUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userServiceInstance.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jsonwebtoken.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', message: error.message });
  }
};
