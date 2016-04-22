/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, userModel) {
    // app.post("/api/project/register", projectRegister);
    // app.post("/api/project/login", projectLogin);
    // app.post("/api/project/logout", projectLogout);
    // app.get("/api/project/user", projectLoggedin);
    app.get("/api/project/user/:id", profile);
    app.get("/api/project/user/username/:username", findUserByUsername);
    // app.post("/api/project/user", addUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    // for classes
    // app.post("/api/project/user/:id/class", addClassForUser);
    // app.delete("/api/project/user/:id/class/:classId", deleteClassById);
    // app.put("/api/project/user/:id/class/:classId", updateClassById);
    // app.post("/api/project/user/:id/class/:classId/grade", addGradeToClass);
    // app.put("/api/project/user/:id/class/:classId/grade/:gradeId", updateGradeToClass);
    app.get("/api/project/user/:id/class/:classId/grade/:gradeId", findGradeInClassById);


    // // for users
    app.post("/api/project/user/:id/following", addFollowing);
    app.delete("/api/project/user/:id/following/:followed", removeFollowing);

    function profile(req, res) {
        var id = req.params.id;
        // if (req.user._id == id) {
        userModel.findUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        // } else {
        //     res.send(401);
        // }
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


    // function projectLogout(req, res) {
    //     res.send(200);
    // }

    function updateUser(req, res) {
        var id = req.params.id;
        var userObj = req.body;
        userModel.updateUser(id, userObj)
            .then(
                function (user) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function all(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
    // app.delete("/api/project/user/:id/class/:classId", deleteClassById);
    // app.put("/api/project/user/:id/class/:classId", updateClassById);

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

    // app.get("/api/project/user/:id/class/:classId/grade/:gradeId", findGradeInClassById);
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


    // // for users
    function addFollowing(req, res) {
        var id = req.params.id;
        var followed = req.body;
        userModel.addFollowing(id, followed.username)
            .then(
                function (user) {
                    return userModel.addFollowed(followed._id, user.username);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function removeFollowing(req, res) {
        var id = req.params.id;
        var followedUsername = req.params.followed;
        userModel.removeFollowing(id, followedUsername)
            .then(
                function (user) {
                    return userModel.removeFollowed(followedUsername, user.username);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};