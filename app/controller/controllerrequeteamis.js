const db = require("../models");
const Requeteamis = db.Requeteamis;
const Utilisateurs = db.Utilisateurs;
const Op = db.Sequelize.Op;

// Retrieve all Requeteamis from the database.
exports.find = (req, res) => {
    Requeteamis.findAll({
        include: [
            { model: Utilisateurs, as: 'Utilisateurs' },
            { model: Utilisateurs, as: 'UtilisateurAmi' },
        ],
        attributes: [
            'id',
            'idUtilisateur',
            'idAmi',
            [db.Sequelize.col('UtilisateurAmi.pseudo'), 'pseudoAmi'], // Ajoutez cette ligne pour inclure le pseudo de l'ami,
        ]
    })
        .then(data => {
            // Filtrer les champs "Utilisateurs" et "UtilisateurAmi" des résultats
            const filteredData = data.map(item => {
                const newItem = item.toJSON();
                delete newItem.Utilisateurs;
                delete newItem.UtilisateurAmi;
                return newItem;
            });

            res.send(filteredData);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving utilisateurs."
            });
        });
};

module.exports = exports


























const Requeteamispseudo = (idUtilisateur, idAmi, res) => {
    var condition = idUtilisateur ? { idUtilisateur: { [Op.like]: `${idUtilisateur}` } } : null;
    var condition2 = idAmi ? { idAmi: { [Op.like]: `${idAmi}` } } : null;

    Requeteamis.findAll({
        where: condition && condition2,
        include: [
            { model: Utilisateurs, as: 'Utilisateurs' },
            { model: Utilisateurs, as: 'UtilisateurAmi' },
        ],
        attributes: [
            'id',
            'idUtilisateur',
            'idAmi',
            [db.Sequelize.col('UtilisateurAmi.pseudo'), 'pseudoAmi'], // Ajoutez cette ligne pour inclure le pseudo de l'ami,
        ]
    })
        .then(data => {
            // Filtrer les champs "Utilisateurs" et "UtilisateurAmi" des résultats
            const filteredData = data.map(item => {
                const newItem = item.toJSON();
                delete newItem.Utilisateurs;
                delete newItem.UtilisateurAmi;
                return newItem;
            });

            res.send(filteredData);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving utilisateurs."
            });
        });
};
