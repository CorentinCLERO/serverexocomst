const db = require("../model");
const Utilisateur = db.Utilisateur;
const Op = db.Sequelize.Op;


// Create and Save a new Utilisateur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.pseudo) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Utilisateur
    const utilisateur = {
        id: req.body.id,
        pseudo: req.body.pseudo,
        motdepasse: req.body.motdepasse,
        etatconnection: req.body.etatconnection
    };

    // Save Utilisateur in the database
    Utilisateur.create(utilisateur)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Utilisateur."
            });
        });
};

// Retrieve all Utilisateurs from the database.
exports.findAll = (req, res) => {
    const pseudo = req.query.pseudo;
    var condition = pseudo ? { pseudo: { [Op.like]: `${pseudo}` } } : null;

    Utilisateur.findAll({
        where: condition,
        attributes: { exclude: ['motdepasse'] }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving utilisateurs."
            });
        });
};

// Find a single Utilisateur with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Utilisateur.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Utilisateur with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Utilisateur with id=" + id
            });
        });
};

// Update a Utilisateur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Utilisateur.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Utilisateur with id=${id}. Maybe Utilisateur was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Utilisateur with id=" + id
            });
        });
};

exports.updateamis = (req, res) => {
    const id = req.params.id;
    const { champ, nouvelleValeur, type } = req.body; // Extraire la clé et la valeur du corps de la requête

    if (type === 'add') {
        // Récupérer l'utilisateur actuel depuis la base de données et ajouter l'ami
        Utilisateur.findByPk(id)
            .then(utilisateur => {
                if (!utilisateur) {
                    return res.status(404).send({
                        message: `Utilisateur with id=${id} not found.`
                    });
                }

                // Vérifier quel champ doit être mis à jour
                let champExistant = utilisateur[champ];
                let ajoutdonnées = false

                if (champExistant === "") {
                    // Si le champ est null, créez une nouvelle liste avec la nouvelle valeur
                    champExistant = nouvelleValeur;
                    ajoutdonnées = true
                } else {
                    // Divisez la chaîne champExistant en un tableau de valeurs
                    const valeursExistantes = champExistant.split(',');

                    // Vérifiez si la nouvelle valeur est déjà présente dans le tableau
                    if (!valeursExistantes.includes(nouvelleValeur)) {
                        // Ajoutez la nouvelle valeur au tableau
                        valeursExistantes.push(nouvelleValeur);
                        ajoutdonnées = true
                    } else {
                        ajoutdonnées = false
                    }

                    // Joignez les valeurs du tableau avec des virgules pour obtenir la nouvelle valeur de champExistant
                    champExistant = valeursExistantes.join(',');
                    // champExistant = null
                }

                // Créez un objet pour mettre à jour le champ spécifié
                const champMaj = {};
                champMaj[champ] = champExistant; // Utilisez la clé extraite directement

                // Mettre à jour le champ spécifié dans la base de données
                utilisateur.update(champMaj)
                    .then(updatedUtilisateur => {
                        if (ajoutdonnées) {
                            res.send({
                                message: `Demande d'ami envoyée à ${nouvelleValeur}`,
                                updatedUtilisateur
                            });
                        } else {
                            res.send({
                                message: `Demande d'ami déjà effectuée`,
                                updatedUtilisateur
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Utilisateur with id=" + id
                        });
                    });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Utilisateur with id=" + id
                });
            });
    } else if (type === 'sup') {
        // Récupérer l'utilisateur actuel depuis la base de données et supprimer l'ami
        Utilisateur.findByPk(id)
            .then(utilisateur => {
                if (!utilisateur) {
                    return res.status(404).send({
                        message: `Utilisateur with id=${id} not found.`
                    });
                }

                // Vérifier quel champ doit être mis à jour
                let champExistant = utilisateur[champ];
                let suppressiondonnées = false

                function supprimerValeur(tableau, valeurASupprimer) {
                    const index = tableau.indexOf(valeurASupprimer);
                    if (index !== -1) {
                        tableau.splice(index, 1);
                    }
                }

                if (champExistant !== null) {
                    // Divisez la chaîne champExistant en un tableau de valeurs
                    const valeursExistantes = champExistant.split(',');

                    // Vérifiez si la nouvelle valeur est déjà présente dans le tableau
                    if (valeursExistantes.includes(nouvelleValeur)) {
                        // Ajoutez la nouvelle valeur au tableau
                        supprimerValeur(valeursExistantes, nouvelleValeur);
                        suppressiondonnées = true
                    }
                    // Joignez les valeurs du tableau avec des virgules pour obtenir la nouvelle valeur de champExistant
                    champExistant = valeursExistantes.join(',').replace(/,+/g, ',').replace(/^,|,$/g, '');

                }

                // Créez un objet pour mettre à jour le champ spécifié
                const champMaj = {};
                champMaj[champ] = champExistant; // Utilisez la clé extraite directement

                // Mettre à jour le champ spécifié dans la base de données
                utilisateur.update(champMaj)
                    .then(updatedUtilisateur => {
                        if (suppressiondonnées) {
                            res.send({
                                message: `${nouvelleValeur} a été supprimé du champ ${champ}`,
                                updatedUtilisateur
                            });
                        } else {
                            res.send({
                                message: `Aucune suppression effectuée`,
                                updatedUtilisateur
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Utilisateur with id=" + id
                        });
                    });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Utilisateur with id=" + id
                });
            });
    }
};

// Delete a Utilisateur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Utilisateur.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Utilisateur with id=${id}. Maybe Utilisateur was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Utilisateur with id=" + id
            });
        });
};


// Delete all Utilisateurs from the database.
exports.deleteAll = (req, res) => {
    Utilisateur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Utilisateurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all utilisateurs."
            });
        });
};

// Find all published Utilisateurs
exports.findAllPublished = (req, res) => {
    Utilisateur.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving utilisateurs."
            });
        });
};

// Test for pseudo and motdepasse
exports.testConnexion = (req, res) => {
    const pseudo = req.body.pseudo;
    const motdepasse = req.body.motdepasse;

    Utilisateur.findOne({ where: { pseudo: pseudo } })
        .then((utilisateur) => {
            if (utilisateur) {
                if (utilisateur.motdepasse === motdepasse) {
                    res.send({ message: "Connexion réussie !", connexion: true, id: utilisateur.id, pseudo: utilisateur.pseudo, etatconnexion: utilisateur.etatconnexion, publique: utilisateur.publique });
                } else {
                    res.status(401).send({ message: "Mot de passe incorrect.", connexion: false });
                }
            } else {
                res.status(404).send({ message: "Utilisateur non trouvé.", connexion: false });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erreur lors de la recherche de l'utilisateur : " + err.message, connexion: false
            });
        });
};


module.exports = exports