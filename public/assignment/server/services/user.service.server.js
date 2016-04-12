"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose      = require("mongoose");

module.exports = function (app, formModel, userModel) {
    var auth = authorized;
    app.post("/api/assignment/user", auth, addUser);
    app.post("/api/assignment/register", register);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/user", getUser);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/user/:id", profile);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function getUser(req, res) {
        var username = req.query.username;
        if (username != null) {
            findUserByUsername(req, res);
        } else {
            all(req, res);
        }
    }

    function all(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
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

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
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
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
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
        if (isAdmin(req.user)) {
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
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        return user.roles.indexOf("admin") > 0;
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};