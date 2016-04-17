/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, userModel, quizModel, classModel) {
    app.post("/api/project/register", register);
    app.post("/api/project/login", login);
    app.post("/api/project/logout", logout);
    app.get("/api/project/user", loggedin);
    app.get("/api/project/user/:id", profile);
    app.post("/api/project/user", addUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    // for classes
    app.post("/api/project/user/:id/class", addClassForUser);
    // app.delete("/api/project/user/:id/class/:classId", deleteClassById);
    // app.put("/api/project/user/:id/class/:classId", updateClassById);
    app.post("/api/project/user/:id/class/:classId/grade", addGradeToClass);
    app.put("/api/project/user/:id/class/:classId/grade/:gradeId", updateGradeToClass);
    app.get("/api/project/user/:id/class/:classId/grade/:gradeId", findGradeInClassById);

    // // for grades
    app.post("/api/project/user/:id/quiz", createQuizForUser);
    app.delete("/api/project/user/:id/quiz/:quizId", deleteQuizById);
    app.put("/api/project/user/:id/quiz/:quizId", updateQuizForUser);
    app.get("/api/project/user/:id/quiz/:quizId", findQuizById);

    // // for users
    app.post("/api/project/user/:id/following", addFollowing);
    app.delete("/api/project/user/:id/following/:followingId", removeFollowing);
    app.post("/api/project/user/:id/followed", addFollowed);
    app.delete("/api/project/user/:id/followed/:followedId", removeFollowed);

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

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function all(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        res.json(userModel.findUserByUsername(username));
    }

    function addUser(req, res) {
        var user = req.body;
        res.json(userModel.createUser(user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUser(id));
    }

    // for classes
    function addClassForUser(req, res) {
        var id = req.params.id;
        var clazz = req.body;
        userModel.addClassForUser(id, clazz)
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

    // app.delete("/api/project/user/:id/class/:classId", deleteClassById);
    // app.put("/api/project/user/:id/class/:classId", updateClassById);

    function addGradeToClass(req, res) {
        var id = req.params.id;
        var classId = req.params.classId;
        var grade = req.body;
        userModel.addGradeToClass(id, classId, grade)
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

    function updateGradeToClass(req, res) {
        var id = req.params.id;
        var classId = req.params.classId;
        var gradeId = req.params.gradeId;
        var grade = req.body;
        userModel.updateGradeToClass(id, classId, gradeId, grade)
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

    app.get("/api/project/user/:id/class/:classId/grade/:gradeId", findGradeInClassById);
    function findGradeInClassById(req, res) {
        var id = req.params.id;
        var classId = req.params.classId;
        var gradeId = req.params.gradeId;
        userModel.findGradeInClassById(id, classId, gradeId)
            .then(
                function (grade) {
                    res.json(grade);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // // for grades
    function createQuizForUser(req, res) {
        var id = req.params.id;
        var grade = req.body;
        userModel.createQuizForUser(id, grade)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteQuizById(req, res) {
        var id = req.params.id;
        var gradeId = req.params.quizId;
        userModel.deleteQuizById(id, gradeId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateQuizForUser(req, res) {
        var id = req.params.id;
        var gradeId = req.params.quizId;
        var grade = req.body;
        userModel.updateQuizForUser(id, gradeId, grade)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findQuizById(req, res) {
        var id = req.params.id;
        var gradeId = req.params.quizId;
        userModel.findQuizById(id, gradeId)
            .then(
                function (grade) {
                    res.json(grade);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // // for users
    function addFollowing(req, res) {
        var id = req.params.id;
        var following = req.body;
        userModel.addFollowing(id, following)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeFollowing(req, res) {
        var id = req.params.id;
        var followingId = req.params.followingId;
        userModel.removeFollowing(id, followingId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFollowed(req, res) {
        var id = req.params.id;
        var followed = req.body;
        userModel.addFollowed(id, followed)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeFollowed(req, res) {
        var id = req.params.id;
        var followedId = req.params.followedId;
        userModel.removeFollowed(id, followedId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


};