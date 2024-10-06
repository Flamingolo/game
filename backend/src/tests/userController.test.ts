import { registerUser, loginUser } from '../controller/userController';
import mongoose from 'mongoose';
import User from '../model/User';

describe('UserController', () => {
  let req, res;

  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

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

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' }));

      const user = await User.findOne({ email: 'test@example.com' });
      expect(user).not.toBeNull();
    });

    it('should return 500 if registration fails', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };

      jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Failed to register user');
      });

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to register user', message: 'Failed to register user' });
    });
  });

  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };

      await registerUser(req, res);

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    it('should return 401 if authentication fails', async () => {
      req.body = { email: 'test@example.com', password: 'wrongpassword' };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
    });

    it('should return 500 if login fails', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };

      jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
        throw new Error('Failed to login');
      });

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to login', message: 'Failed to login' });
    });
  });
});
