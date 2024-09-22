import request from 'supertest';
import express from 'express';
import { registerUser } from '../../src/controller/userController';
import userServiceInstance from '../../src/service/userService';

const app = express();
app.use(express.json());
app.post('/register', registerUser);

describe('User Controller', () => {
  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      const mockUser = { email: 'test@example.com', password: 'password123' };
      const createUserSpy = jest.spyOn(userServiceInstance, 'createUser').mockResolvedValue(mockUser);

      const response = await request(app).post('/register').send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
      expect(createUserSpy).toHaveBeenCalledWith(mockUser.email, mockUser.password);

      createUserSpy.mockRestore();
    });

    it('should return 500 if user registration fails', async () => {
      const mockUser = { email: 'test@example.com', password: 'password123' };
      const createUserSpy = jest.spyOn(userServiceInstance, 'createUser').mockRejectedValue(new Error('Failed to register user'));

      const response = await request(app).post('/register').send(mockUser);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to register user', message: 'Failed to register user' });

      createUserSpy.mockRestore();
    });
  });
});
