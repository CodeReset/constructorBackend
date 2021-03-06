import { Category } from '../../models';

class CategoryService {
  async getCategoriesByAppId(appId, status = 'active') {
    return await Category.findAll({
      where: { appId, status },
      order: [['createdAt', 'DESC']]
    });
  }

  async addCategory(appId, name, img, status) {
    return await Category.create({ name, appId, img, status });
  }

  async deleteCategoryById(appId, id) {
    return await Category.destroy({ where: { id, appId } });
  }

  async updateCategoryNameById(appId, id, data) {
    return await Category.update(data, { where: { id, appId } });
  }
}

export default new CategoryService();
