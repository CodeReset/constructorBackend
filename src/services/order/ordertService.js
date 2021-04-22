import { Order } from '../../models';

class OrederService {
  async createOrder(appId, clientId, products, paymentMethod, address) {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.dataValues.price * product.dataValues.count;
    });
    let status;
    paymentMethod === 'online' ? (status = 'waiting') : (status = 'inProcess');
    return await Order.create({
      appId,
      clientId,
      status,
      products,
      totalPrice,
      paymentMethod,
      address
    });
  }

  async changeStatusById(id, status) {
    return await Order.update({ status }, { where: { id } });
  }

  async getOrdersByAppId(appId) {
    return await Order.findAll({ where: { appId } });
  }
}

export default new OrederService();
