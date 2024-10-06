import { registerUser, loginUser } from '../controller/userController';
import userServiceInstance from '../service/userService';
import jsonwebtoken from 'jsonwebtoken';

jest.mock('../service/userService');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      userServiceInstance.createUser.mockResolvedValue({ id: 1, email: 'test@example.com' });

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
    });

    it('should return 500 if registration fails', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      userServiceInstance.createUser.mockRejectedValue(new Error('Failed to register user'));

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to register user', message: 'Failed to register user' });
    });
  });

  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      userServiceInstance.authenticateUser.mockResolvedValue({ id: 1, email: 'test@example.com' });
      jsonwebtoken.sign.mockReturnValue('token');

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should return 401 if authentication fails', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      userServiceInstance.authenticateUser.mockResolvedValue(null);

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
    });

    it('should return 500 if login fails', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      userServiceInstance.authenticateUser.mockRejectedValue(new Error('Failed to login'));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to login', message: 'Failed to login' });
    });
  });
});
