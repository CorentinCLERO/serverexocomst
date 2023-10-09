module.exports = app => {
    const utilisateurSrv = require("../controller/controllerutilisateurs.js");
    const requeteamiSrv = require("../controller/controllerrequeteamis.js");

    var router = require("express").Router();

    router.get("/ra", requeteamiSrv.find);

    // Create a new Utilisateur
    router.post("/", utilisateurSrv.create);

    // Retrieve all Utilisateurs
    router.get("/", utilisateurSrv.find);

    // Retrieve a single Utilisateur with id
    router.get("/:id", utilisateurSrv.find);

    // Retrieve all published Utilisateurs
    router.get("/published", utilisateurSrv.findAllPublished);

    // Update a Utilisateur with id
    router.put("/:id", utilisateurSrv.update);

    // Update a Utilisateur with id
    router.put("/amis/:id", utilisateurSrv.updateamis);

    // Delete a Utilisateur with id
    router.delete("/:id", utilisateurSrv.delete);

    // Delete all Utilisateurs
    router.delete("/", utilisateurSrv.deleteAll);

    router.post("/test", utilisateurSrv.testConnexion)

    router.post("/demandeamis", utilisateurSrv.demandeamis);

    router.post("/ajoutamis", utilisateurSrv.ajoutamis);

    router.post("/refusamis", utilisateurSrv.refusamis);

    app.use('/api/utilisateurs', router);
};