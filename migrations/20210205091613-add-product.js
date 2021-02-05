'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      appId: { type: Sequelize.UUID },
      categoryId: { type: Sequelize.UUID },
      name: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      price: { type: Sequelize.INTEGER },
      img: { type: Sequelize.STRING },
      options: { type: Sequelize.JSONB },
      count: { type: Sequelize.INTEGER, defaultValue: 0 }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('products');
  }
};
