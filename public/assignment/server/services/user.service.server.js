/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, formModel, userModel) {
    app.post("/api/assignment/user", addUser);
    app.get("/api/assignment/user", all);
    app.get("/api/assignment/user/:id", profile);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", login);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function profile(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        console.log(user);
    }

    function addUser(req, res) {
        var user = req.body;
        res.json(userModel.createUser(user));
    }

    //function register(req, res) {
    //    var user = req.body;
    //    user = userModel.createUser(user);
    //    req.session.currentUser = user;
    //    res.json(user);
    //}

    function login(req, res) {
        var credentials = {};
        credentials.username = req.params.username;
        credentials.password = req.params.password;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
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