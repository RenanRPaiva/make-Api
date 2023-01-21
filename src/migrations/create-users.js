'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
      password: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      role: {         
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user' 
      },
      active: {         
        type: Sequelize.INTEGER,
        defaultValue: false
      },
      pin: {         
        type: Sequelize.STRING(6),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};