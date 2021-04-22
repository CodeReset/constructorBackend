import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models';

class UserService {
  async signup(email, name, password, appId, type) {
    const candidate = await User.findOne({ where: { email, appId, type } });
    if (candidate) {
      return {
        status: 400,
        message: 'Пользователь с такой почтой уже существует'
      };
    }
    let options = {};
    if(type === 'admin') {
      options = {
        applications: ['14cd0829-3d9b-4934-a1f9-0980d11bf09f'],
        rate: 'test'
      }
    }
    const hashedPassword = await bcrypt.hash(password, 14);
    await User.create({ email, password: hashedPassword, type, name, appId, options });
    return {
      status: 201,
      message: 'Поздравляем, вы успешно прошли регистрацию'
    };
  }

  async getProfileById(id, type) {
    const user = await User.findOne({ attributes: ['name', 'options', 'email'], where: { id, type } });
    return user;
  }

  async changeProfileById(id, type, options) {
    const user = await User.update( options, { where: { id, type } });
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
    const data = await User.update(user, { where: { id } });
    return data;
  }

  async addAppToUser(appId, id) {
    const user = (await User.findOne({ where: { id } })).dataValues;
    user.options.applications.push(appId);
    const data = await User.update(user, { where: { id } });
    return data;
  }

  async signin(email, password, appId, type) {
    const candidate = await User.findOne({ where: { email, appId, type } });
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
    let token;
    type === 'admin' ? token = process.env.JWT_SECRET_ADMIN : token = process.env.JWT_SECRET;
    token = jwt.sign({ userid: candidate.id }, token);
    return {
      status: 200,
      token,
      message: 'Поздравляем, вы успешно зашли'
    };
  }
}

export default new UserService();
