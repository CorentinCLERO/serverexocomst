const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Utilisateur = require("./modelutilisateurs.js")(sequelize, Sequelize);
db.Listeamis = require("./modellisteamis.js")(sequelize, Sequelize);
db.Demandeamis = require("./modeldemandeamis.js")(sequelize, Sequelize);
db.Requeteamis = require("./modelrequeteamis.js")(sequelize, Sequelize);

db.Utilisateur.hasMany(db.Listeamis, { foreignKey: 'idUtilisateur', as: 'leslistemamis' });
db.Utilisateur.hasMany(db.Requeteamis, { foreignKey: 'idUtilisateur', as: 'lesrequeteamis' });
db.Utilisateur.hasMany(db.Demandeamis, { foreignKey: 'idUtilisateur', as: 'lesdemandeamis' });

db.Listeamis.belongsTo(db.Utilisateur, { foreignKey: 'idUtilisateur', as: 'utilisateurAmi' });
db.Requeteamis.belongsTo(db.Utilisateur, { foreignKey: 'idUtilisateur', as: 'utilisateurAmi' });
db.Demandeamis.belongsTo(db.Utilisateur, { foreignKey: 'idUtilisateur', as: 'utilisateurAmi' });

module.exports = db;