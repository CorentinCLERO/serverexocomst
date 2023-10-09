'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Demandeamis', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idUtilisateur: { // Personne qui a l'ami
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id',
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
      },
      idAmi: { // Personne qui est l'ami
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id',
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
      },
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Demandeamis');
  }
};