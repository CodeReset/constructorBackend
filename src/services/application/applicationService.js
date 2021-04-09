import { Application, Template, Themes } from '../../models';

class ApplicationService {
  async createApplication(name, description, template, theme) {
    return await Application.create({ name, description, template, theme });
  }

  async getTemlatesByAppType(type) {
    return await Template.findAll({ type });
  }

  async getThemesByTemlate(temlate) {
    return await Themes.findAll({ temlate });
  }

  async getAppsByIds(ids) {
    return await Application.findAll({ where: { id: ids } });
  }

  async getAppPages(id) {
    return await Template.findOne({ attributes: ['pages'], where: { id } });
  }
  async getAppComponent(id, name, page) {
    const { dataValues } = await Template.findOne({ attributes: ['components'], where: { id } });
    return dataValues.components.filter((component) => component.name === name && component.page === page);
  }
}

export default new ApplicationService();
