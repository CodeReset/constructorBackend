import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models';

class UserService {
  async signup(email, name, password, appId) {
    const candidate = await User.findOne({ where: { email, appId } });
    if (candidate) {
      return {
        status: 400,
        message: 'Пользователь с такой почтой уже существует'
      };
    }
    const hashedPassword = await bcrypt.hash(password, 14);
    await User.create({ email, password: hashedPassword, name, appId });
    return {
      status: 201,
      message: 'Поздравляем, вы успешно прошли регистрацию'
    };
  }

  async getProfileById(id) {
    const user = await User.findOne({ attributes: ['name', 'options', 'email'], where: { id } });
    return user;
  }

  async addProductToWishList(productId, id) {
    const user = (await User.findOne({ where: { id } })).dataValues;
    if(user.options){
      if (user.options.wishlist) {
        user.options.wishlist.push(productId);
      } else {
        user.options.wishlist = [productId];
      }
    } else {
      user.options = {
        wishlist: [productId]
      }
    }
    console.log(user)
    const data = await User.update(user, { where: { id } });
    console.log(data)
    return data;
  }

  async signin(email, password, appId) {
    const candidate = await User.findOne({ where: { email, appId } });
    if (!candidate) {
      return {
        status: 400,
        message: 'Пользователь не найден, пройдите регистрацию'
      };
    }
    const isCompate = await bcrypt.compare(password, candidate.password);
    if (!isCompate) {
      return {
        status: 400,
        message: 'Неправильный логин или пароль'
      };
    }
    const token = jwt.sign({ userid: candidate.id }, process.env.JWT_SECRET);
    return {
      status: 200,
      token,
      message: 'Поздравляем, вы успешно зашли'
    };
  }
}

export default new UserService();
