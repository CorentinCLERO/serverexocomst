module.exports = (sequelize, Sequelize) => {
    const Listeamis = sequelize.define("Listeamis", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: { // Personne qui a l'ami
            type: Sequelize.INTEGER
        },
        pseudoAmi: { // Personne qui est l'ami
            type: Sequelize.STRING
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Listeamis;
};