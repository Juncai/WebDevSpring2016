/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, formModel, userModel) {
    app.post("/api/assignment/user", addUser);
    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user/:id", profile);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.get("/api/assignment/user?username=alice&password=wonderland", login);
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
        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
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
        var user = userModel.findUserByCredentials(credentials);
        //req.session.currentUser = user;
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