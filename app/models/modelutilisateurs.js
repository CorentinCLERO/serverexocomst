module.exports = (sequelize, Sequelize) => {
    const Utilisateurs = sequelize.define("Utilisateurs", {
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

    Utilisateurs.associate = (models) => {
        Utilisateurs.hasMany(models.Demandeamis, {
            as: 'lesdemandeamis',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "idUtilisateur"
        });
        Utilisateurs.hasMany(models.Demandeamis, {
            as: 'lesdemandeamisAmi',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "idAmi"
        });
        Utilisateurs.hasMany(models.Requeteamis, {
            as: 'lesrequeteamis',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "idUtilisateur"
        });
        Utilisateurs.hasMany(models.Requeteamis, {
            as: 'lesrequeteamisAmi',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "idAmi"
        });
        Utilisateurs.hasMany(models.Listeamis, {
            as: 'leslisteamis',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "idUtilisateur"
        });
        Utilisateurs.hasMany(models.Listeamis, {
            as: 'leslisteamisAmi',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: "idAmi"
        });
    };

    return Utilisateurs;
};