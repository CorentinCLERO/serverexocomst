module.exports = (sequelize, Sequelize) => {
    const Demandeamis = sequelize.define("Demandeamis", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAmi: { // Personne qui est l'ami
            type: Sequelize.INTEGER
        },
    }, {
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    Demandeamis.associate = (models) => {
        Demandeamis.belongsTo(models.Utilisateurs, {
            as: "Utilisateurs",
            foreignKey: {
                name: "idUtilisateur",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
        Demandeamis.belongsTo(models.Utilisateurs, {
            as: "UtilisateurAmi",
            foreignKey: {
                name: "idAmi",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
    };

    return Demandeamis;
};