module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('templates', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: { type: Sequelize.STRING },
      images: { type: Sequelize.ARRAY(Sequelize.STRING) },
      components: { type: Sequelize.ARRAY(Sequelize.JSONB) },
      pages: { type: Sequelize.ARRAY(Sequelize.JSONB) },
      type: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('templates');
  }
};
