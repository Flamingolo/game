import userServiceInstance from '../../src/service/userService';
import User from '../../src/model/User';
import bcrypt from 'bcrypt';

describe('User Service', () => {
  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockUser = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = await bcrypt.hash(mockUser.password, 10);
      const saveSpy = jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);

      const user = await userServiceInstance.createUser(mockUser.email, mockUser.password);

      expect(user.email).toBe(mockUser.email);
      expect(await bcrypt.compare(mockUser.password, user.password)).toBe(true);
      expect(saveSpy).toHaveBeenCalled();

      saveSpy.mockRestore();
    });

    it('should throw an error if user creation fails', async () => {
      const mockUser = { email: 'test@example.com', password: 'password123' };
      const saveSpy = jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error('Failed to create user'));

      await expect(userServiceInstance.createUser(mockUser.email, mockUser.password)).rejects.toThrow('Failed to create user');

      saveSpy.mockRestore();
    });
  });
});
