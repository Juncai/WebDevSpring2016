"use strict";

module.exports = function (app, formModel, userModel) {
    app.post("/api/assignment/user", addUser);
    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user/:id", profile);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function getUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password != null) {
            login(req, res);
        } else if (username != null) {
            findUserByUsername(req, res);
        } else {
            all(req, res);
        }
    }

    function all(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res) {
        var id = req.params.id;
        userModel.findUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    delete user.password;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addUser(req, res) {
        var user = req.body;

        userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    //req.session.currentUser = doc;
                    //console.log(doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = {};
        credentials.username = req.query.username;
        credentials.password = req.query.password;
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel.updateUserById(id, user)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userModel.deleteUser(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};