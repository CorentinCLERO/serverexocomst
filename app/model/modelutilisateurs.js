module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("Utilisateur", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: Sequelize.STRING
        },
        motdepasse: {
            type: Sequelize.STRING
        },
        etatconnection: {
            type: Sequelize.STRING
        },
        listeamis: {
            type: Sequelize.STRING
        },
        demandeamis: {
            type: Sequelize.STRING
        },
        requeteamis: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Utilisateur;
};