import User from '../model/User';
import bcrypt from 'bcrypt';

class UserService {
  
  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id: Date.now(),
      email: email,
      password: hashedPassword,
      created: new Date(),
      deleted: null,
    });

    await newUser.save();

    return newUser;
  };

  async authenticateUser(email: string, password: string) {
    const user = await User.findOne({ email: email });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  };
}

const mobServiceInstance = new UserService();
export default mobServiceInstance;
