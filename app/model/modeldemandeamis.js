module.exports = (sequelize, Sequelize) => {
    const Demandeamis = sequelize.define("Demandeamis", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: { // Personne qui envoie la demande d'ami
            type: Sequelize.INTEGER
        },
        pseudoAmi: { // Personne qui est demandé en ami
            type: Sequelize.STRING
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Demandeamis;
};