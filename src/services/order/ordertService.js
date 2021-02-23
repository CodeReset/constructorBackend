import { Order } from '../../models';

class OrederService {
  async createOrder(appId, clientId, products) {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.dataValues.price * product.dataValues.count;
    });
    return await Order.create({ appId, clientId, status: 'inProcess', products, totalPrice });
  }
}

export default new OrederService();
