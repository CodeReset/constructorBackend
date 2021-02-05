module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('categories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      appId: { type: Sequelize.UUID },
      name: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('categories');
  }
};
