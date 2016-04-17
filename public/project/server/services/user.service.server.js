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
    // addClassForUser: addClassForUser,
    app.post("/api/project/user/:id/class", addClassForUser);
    // deleteClassById: deleteClassById,
    // app.delete("/api/project/user/:id/class/:classId", deleteClassById);
    // updateClassById: updateClassById,
    // app.put("/api/project/user/:id/class/:classId", updateClassById);
    // addGradeToClass: addGradeToClass,
    app.post("/api/project/user/:id/class/:classId/grade", addGradeToClass);
    // updateGradeToClass: updateGradeToClass,
    app.put("/api/project/user/:id/class/:classId/grade", updateGradeToClass);
    // findGradeInClassById: findGradeInClassById,
    app.get("/api/project/user/:id/class/:classId/grade/:gradeId", findGradeInClassById);

    // // for grades
    // createQuizForUser: createGradeForUser,
    app.post("/api/project/user/:id/quiz", createQuizForUser);
    // deleteQuizById: deleteGradeById,
    app.delete("/api/project/user/:id/quiz/:quizId", deleteQuizById);
    // updateQuizForUser: updateGradeForUser,
    app.put("/api/project/user/:id/quiz/:quizId", updateQuizForUser);
    // findQuizById: findGradeById,
    app.get("/api/project/user/:id/quiz/:quizId", findQuizById);

    // // for users
    // addFollowing: addFollowing,
    app.post("/api/project/user/:id/following", addFollowing);
    // removeFollowing: removeFollowing,
    app.delete("/api/project/user/:id/following/:followingId", removeFollowing);
    // addFollowed: addFollowed,
    app.post("/api/project/user/:id/followed", addFollowed);
    // removeFollowed: removeFollowed
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
};