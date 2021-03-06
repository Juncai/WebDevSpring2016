"use strict";

module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var GradeSchema = require("./grade.schema.server.js")(mongoose);
    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var ProjectUserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        birthDate: Date,
        email: String,
        role: {type: String, default: 'STUDENT', enum: ['STUDENT', 'TEACHER']},
        followed: [String],
        following: [String],
        classes: [ClassSchema],
        quizCreated: [GradeSchema]
    }, {collection: 'project.user'});
    return ProjectUserSchema;
};