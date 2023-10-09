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
        idAmi: { // Personne qui est l'ami
            type: Sequelize.INTEGER
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    Listeamis.associate = (models) => {
        Listeamis.belongsTo(models.Utilisateurs, {
            as: "Utilisateurs",
            foreignKey: {
                name: "idUtilisateur",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
        Listeamis.belongsTo(models.Utilisateurs, {
            as: "UtilisateurAmi",
            foreignKey: {
                name: "idAmi",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
    };

    return Listeamis;
};

