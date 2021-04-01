import { Application, Temlate, Themes } from '../../models';

class ApplicationService {
  async createApplication(name, description, template, theme) {
    return await Application.create({ name, description, template, theme });
  }

  async getTemlatesByAppType(type) {
    return await Temlate.findAll({ type });
  }

  async getThemesByTemlate(temlate) {
    return await Themes.findAll({ temlate });
  }

  async getAppsByIds(ids) {
    return await Application.findAll({ where: { id: ids } });
  }
}

export default new ApplicationService();
