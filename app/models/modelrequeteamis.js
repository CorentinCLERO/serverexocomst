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
        idAmi: { // Personne qui est l'ami
            type: Sequelize.INTEGER
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    Requeteamis.associate = (models) => {
        Requeteamis.belongsTo(models.Utilisateurs, {
            as: "Utilisateurs",
            foreignKey: {
                name: "idUtilisateur",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
        Requeteamis.belongsTo(models.Utilisateurs, {
            as: "UtilisateurAmi",
            foreignKey: {
                name: "idAmi",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
    };

    return Requeteamis;
};