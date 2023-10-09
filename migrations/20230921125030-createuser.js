'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Utilisateurs', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pseudo: {
        type: Sequelize.DataTypes.STRING
      },
      motdepasse: {
        type: Sequelize.DataTypes.STRING
      },
      etatconnexion: {
        type: Sequelize.DataTypes.STRING
      },
      publique: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Utilisateurs');
  }
};