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
        etatconnexion: {
            type: Sequelize.STRING
        },
        publique: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Utilisateur;
};