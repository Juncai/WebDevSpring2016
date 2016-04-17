"use strict";

module.exports = function (mongoose) {

    // var UserSchema = require("./projectUser.schema.server.js")(mongoose);
    // var ClassSchema = require("./class.schema.server.js")(mongoose);
    var GradeSchema = mongoose.Schema({
        quizId: { type: String, required: true },
        quizName: { type: String, required: true },
        due: Date,
        students: [String], // this is username
        // class: ClassSchema,
        finished: [Boolean],
        grades: [Number],
        finishTSs: [Date],
        durations: [Number]
    });
    return GradeSchema;
};