import { Order } from '../../models';

class OrederService {
  async createOrder(appId, clientId, products) {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.dataValues.price * product.dataValues.count;
    });
    return await Order.create({ appId, clientId, status: 'inProcess', products, totalPrice });
  }

  async changeStatusById(id, status) {
    return await Order.update({ status }, { where: { id } });
  }
}

export default new OrederService();
