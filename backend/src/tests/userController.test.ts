import request from 'supertest';
import express, { Application } from 'express';
import * as userController from '../controller/userController';
import userServiceInstance from '../service/userService'; // Default import
import jsonwebtoken from 'jsonwebtoken';

jest.mock('../service/userService', () => ({
  __esModule: true,
  default: {
    createUser: jest.fn(),
    authenticateUser: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

const app: Application = express();
app.use(express.json());
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

describe('UserController', () => {
  describe('registerUser', () => {
    it('should register a user and return 201 status with user data', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      (userServiceInstance.createUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
      expect(userServiceInstance.createUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should return 500 status if user registration fails', async () => {
      (userServiceInstance.createUser as jest.Mock).mockRejectedValue(new Error('Registration error'));

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Failed to register user',
        message: 'Registration error',
      });
    });
  });

  describe('loginUser', () => {
    it('should authenticate user and return a JWT token', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockToken = 'mock-jwt-token';
      (userServiceInstance.authenticateUser as jest.Mock).mockResolvedValue(mockUser);
      (jsonwebtoken.sign as jest.Mock).mockReturnValue(mockToken);

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: mockToken });
      expect(userServiceInstance.authenticateUser).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(jsonwebtoken.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    });

    it('should return 401 status if authentication fails', async () => {
      (userServiceInstance.authenticateUser as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({ email: 'invalid@example.com', password: 'invalidpassword' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'Invalid email or password',
      });
    });

    it('should return 500 status if login fails due to server error', async () => {
      (userServiceInstance.authenticateUser as jest.Mock).mockRejectedValue(new Error('Authentication error'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Failed to login',
        message: 'Authentication error',
      });
    });
  });
});
