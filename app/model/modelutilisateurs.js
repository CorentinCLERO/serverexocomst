module.exports = (sequelize, Sequelize) => {
    const Utilisateurs = sequelize.define("utilisateurs", {
        pseudo: {
            type: Sequelize.STRING
        },
        motdepasse: {
            type: Sequelize.STRING
        },
        etatconnection: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Utilisateurs;
};