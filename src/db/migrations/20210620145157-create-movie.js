'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      title: Sequelize.STRING,
      director: Sequelize.STRING,
      price: Sequelize.INTEGER,
      inStock: Sequelize.INTEGER,
      rented: Sequelize.INTEGER,
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'createdAt',
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
        field: 'updatedAt',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movies');
  }
};
