import User from '../model/User';
import bcrypt from 'bcrypt';

export const createUser = async (email: string, password: string) => {
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
