/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function(app) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")();
    var quizModel   = require("./models/quiz.model.server.js")();
    var classModel   = require("./models/class.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, quizModel, userModel);
    var classService = require("./services/class.service.server.js")(app, classModel, userModel, quizModel);
    var quizService = require("./services/quiz.service.server.js")(app, quizModel, userModel);
    var cardService = require("./services/card.service.server.js")(app, quizModel);
};