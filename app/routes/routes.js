module.exports = app => {
    const utilisateurs = require("../controller/controllerutilisateurs.js");

    var router = require("express").Router();

    // Create a new Utilisateur
    router.post("/", utilisateurs.create);

    // Retrieve all Utilisateurs
    router.get("/", utilisateurs.findAll);

    // Retrieve all published Utilisateurs
    router.get("/published", utilisateurs.findAllPublished);

    // Retrieve a single Utilisateur with id
    router.get("/:id", utilisateurs.findOne);

    // Update a Utilisateur with id
    router.put("/:id", utilisateurs.update);

    // Delete a Utilisateur with id
    router.delete("/:id", utilisateurs.delete);

    // Delete all Utilisateurs
    router.delete("/", utilisateurs.deleteAll);

    app.use('/api/utilisateurs', router);
};