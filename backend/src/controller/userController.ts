import { Request, Response } from 'express';
import userServiceInstance from '../service/userService';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userServiceInstance.createUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', message: error.message });
  }
};
