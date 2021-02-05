import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models";

class UserService {
  async signup(email, name, password, appId) {
    const candidate = await User.findOne({ where: { email, appId } });
    if (candidate) {
      return {
        status: 400,
        message: "Пользователь с такой почтой уже существует",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 14);
    await User.create({ email, password: hashedPassword, name, appId });
    return {
      status: 201,
      message: "Поздравляем, вы успешно прошли регистрацию",
    };
  }

  async signin(email, password, appId) {
    const candidate = await User.findOne({ where: { email, appId } });
    if (!candidate) {
      return {
        status: 400,
        message: "Пользователь не найден, пройдите регистрацию",
      };
    }
    const isCompate = await bcrypt.compare(password, candidate.password);
    if (!isCompate) {
      return {
        status: 400,
        message: "Неправильный логин или пароль",
      };
    }
    const token = jwt.sign({ userid: candidate.id }, process.env.JWT_SECRET);
    return {
      status: 200,
      token,
      message: "Поздравляем, вы успешно зашли",
    };
  }
}

export default new UserService();
