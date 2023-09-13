module.exports = app => {
    const utilisateurSrv = require("../controller/controllerutilisateurs.js");

    var router = require("express").Router();

    // Create a new Utilisateur
    router.post("/", utilisateurSrv.create);

    // Retrieve all Utilisateurs
    router.get("/", utilisateurSrv.findAll);

    // Retrieve all published Utilisateurs
    router.get("/published", utilisateurSrv.findAllPublished);

    // Retrieve a single Utilisateur with id
    router.get("/:id", utilisateurSrv.findOne);

    // Update a Utilisateur with id
    router.put("/:id", utilisateurSrv.update);

    // Update a Utilisateur with id
    router.put("/amis/:id", utilisateurSrv.updateamis);

    // Delete a Utilisateur with id
    router.delete("/:id", utilisateurSrv.delete);

    // Delete all Utilisateurs
    router.delete("/", utilisateurSrv.deleteAll);

    router.post("/test", utilisateurSrv.testConnexion)

    app.use('/api/utilisateurs', router);
};