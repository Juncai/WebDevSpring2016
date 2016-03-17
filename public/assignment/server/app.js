/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function(app) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")();
    var formModel   = require("./models/form.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, formModel, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel);
};