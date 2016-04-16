"use strict";

module.exports = function (mongoose) {

    var QuizSchema = require("./quiz.schema.server.js")(mongoose);
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var GradeSchema = mongoose.Schema({
        quizId: { type: QuizSchema, required: true },
        students: [UserSchema],
        classId: ClassSchema,
        finished: [Boolean],
        grades: [Number],
        finishTSs: [Date],
        durations: [Number]
    });
    return GradeSchema;
};