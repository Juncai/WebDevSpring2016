/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function(app, formModel, userModel) {
    app.post("/api/assignment/user", addUser);
    //app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", all);
    app.get("/api/assignment/user/:id", profile);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.post("/api/assignment/user", login);
    app.get("/api/assignment/user?username=alice&password=wonderland", login);
    app.post("/api/project/omdb/logout", logout);
    app.post("/api/assignment/user", register);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        console.log(user);
    }

    function addUser(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        res.json(users);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        var credentials = {};
        credentials.username = req.params.username;
        credentials.password = req.params.password;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};