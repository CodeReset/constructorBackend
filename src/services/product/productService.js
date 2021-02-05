import { Product } from "../../models";

class ProductService {
  async getProductsByAppId(appId) {
    return await Product.findAll({ where: { appId }});
  }
}

export default new ProductService();
