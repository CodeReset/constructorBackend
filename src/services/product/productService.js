import { Product } from "../../models";

class ProductService {
  async getProductsByAppId(appId) {
    return await Product.findAll({ where: { appId } });
  }

  async getProductsByIds(appId, ids) {
    return await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'appId', 'options'] },
      where: { appId, id: ids }
    });
  }

  async addProduct(appId, categoryId, name, description, price, img, options = {}) {
    return await Product.create({ appId, categoryId, name, description, price, img, options });
  }

  async deleteProductById(appId, id) {
    return await Product.destroy({ where: { id, appId } });
  }

  async updateProductById(appId, id, data) {
    return await Product.update(data, { where: { id, appId } });
  }
}

export default new ProductService();
