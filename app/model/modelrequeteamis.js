module.exports = (sequelize, Sequelize) => {
    const Requeteamis = sequelize.define("Requeteamis", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: { // Personne qui envoie la requete
            type: Sequelize.INTEGER
        },
        pseudoAmi: { // Personne qui est requeté
            type: Sequelize.STRING
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Requeteamis;
};