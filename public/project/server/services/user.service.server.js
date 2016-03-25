/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel, userModel) {
    app.post("/api/project/user", addUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:id", profile);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

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
        res.json(userModel.findAllUsers());
    }

    function profile(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        console.log(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        res.json(userModel.findUserByUsername(username));
    }

    function addUser(req, res) {
        var user = req.body;
        res.json(userModel.createUser(user));
    }

    function login(req, res) {
        var credentials = {};
        credentials.username = req.query.username;
        credentials.password = req.query.password;
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(userModel.updateUser(id, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUser(id));
    }
};