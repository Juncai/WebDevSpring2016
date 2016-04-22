/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function(app, db, mongoose, projectUserModel) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    // var projectUserModel    = require("../../project/server/models/projectUser.model.server.js")(mongoose);
    var formModel   = require("./models/form.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, formModel, userModel, projectUserModel);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};