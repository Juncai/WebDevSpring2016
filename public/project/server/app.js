/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, mongoose) {

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.server.js")(mongoose);
    var quizModel = require("./models/quiz.model.server.js")(mongoose);
    var classModel = require("./models/class.model.server.js")(mongoose);
    var schoolModel = require("./models/school.model.server.js")(mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel, quizModel, classModel);
    var classService = require("./services/class.service.server.js")(app, classModel, quizModel, userModel);
    var quizService = require("./services/quiz.service.server.js")(app, quizModel);
    var schoolService = require("./services/school.service.server.js")(app, schoolModel, classModel);
};