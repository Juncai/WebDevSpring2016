"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, formModel, userModel, projectUserModel) {
    var auth = authorized;
    var admin = isAdmin;
    app.post("/api/assignment/register", register);
    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/user/:id", auth, profile);
    app.put("/api/assignment/user/:userId", auth, updateUser);
    app.post("/api/assignment/admin/user", admin, addUser);
    app.get("/api/assignment/admin/user", admin, getUser);
    app.delete("/api/assignment/admin/user/:userId", admin, deleteUser);
    app.put("/api/assignment/admin/user/:userId", admin, updateUserAdmin);

    // for project login
    app.post("/api/project/register", projectRegister);
    app.post("/api/project/login", passport.authenticate('project'), projectLogin);
    app.post("/api/project/logout", projectLogout);
    app.get("/api/project/loggedin", projectLoggedin);


    // passport.use(new LocalStrategy(localStrategy));
    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function assignmentLocalStrategy(username, password, done) {
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

    function projectLocalStrategy(username, password, done) {
        projectUserModel
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
        if (user.roles != null) {
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
        } else {
            projectUserModel
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

    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function getUser(req, res) {
        var uid = req.query.userId;
        if (uid != null) {
            findUserById(req, res);
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
        if (req.user._id == id) {
            userModel.findUserById(id)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.send(401);
        }
    }

    function findUserById(req, res) {
        var uid = req.query.uesrId;
        userModel.findUserById(uid)
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

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.register(newUser);
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
        var id = req.params.userId;
        var user = req.body;
        if (req.user._id == id) {
            userModel.updateUserById(id, user)
                .then(
                    function (stats) {
                        res.send(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.send(401);
        }

    }

    function updateUserAdmin(req, res) {
        var id = req.params.userId;
        var user = req.body;
        userModel.updateUserByIdAdmin(id, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel.deleteUser(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf("admin") == -1) {
            res.send(403);
        } else {
            next();
        }
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    // for project user
    function projectRegister(req, res) {
        var newUser = req.body;

        projectUserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return projectUserModel.register(newUser);
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

    function projectLogin(req, res) {
        var user = req.user;
        res.json(user);
    }

    function projectLogout(req, res) {
        req.logout();
        res.send(200);
    }
   
    function projectLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

};