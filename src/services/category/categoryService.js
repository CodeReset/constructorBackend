import { Category } from "../../models";

class CategoryService {
  async getCategoriesByAppId(appId) {
    return await Category.findAll({ where: { appId }});
  }
}

export default new CategoryService();
