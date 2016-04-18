/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, mongoose) {

    // help functions
    var utils = require("./utils/utils.js");

    var projectUserModel = require("./models/projectUser.model.server.js")(mongoose, utils);
    var quizModel = require("./models/quiz.model.server.js")(mongoose);
    var classModel = require("./models/class.model.server.js")(mongoose, utils);
    var schoolModel = require("./models/school.model.server.js")(mongoose, utils);

    var userService = require("./services/user.service.server.js")(app, projectUserModel, quizModel, classModel);
    var classService = require("./services/class.service.server.js")(app, classModel, schoolModel, projectUserModel);
    var quizService = require("./services/quiz.service.server.js")(app, quizModel, projectUserModel, classModel);
    var cardService = require("./services/card.service.server.js")(app, quizModel);
    var schoolService = require("./services/school.service.server.js")(app, schoolModel);
};