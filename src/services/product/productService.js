import { Product } from "../../models";

class ProductService {
  async getProductsByAppId(appId) {
    return await Product.findAll({ where: { appId }});
  }

  async getProductsByIds(appId, ids) {
    return await Product.findAll({ where: { appId, id: ids }});
  }
}

export default new ProductService();
