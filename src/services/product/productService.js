import { Product } from '../../models';

class ProductService {
  async getProductsByAppId(appId, status = 'active', filter = {}) {
    return await Product.findAll({ where: { appId, status, ...filter } });
  }

  async getProductsByIds(appId, ids) {
    return await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'appId', 'options'] },
      where: { appId, id: ids }
    });
  }

  async addProduct(appId, categoryId, name, description, price, img, status, options = {}) {
    return await Product.create({
      appId,
      categoryId,
      name,
      description,
      price,
      img,
      options,
      status
    });
  }

  async deleteProductById(appId, id) {
    return await Product.destroy({ where: { id, appId } });
  }

  async updateProductById(appId, id, data) {
    return await Product.update(data, { where: { id, appId } });
  }
}

export default new ProductService();
