"use strict";

module.exports = function (mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var GradeSchema = mongoose.Schema({
        quizId: { type: ObjectId, required: true },
        due: Date,
        students: [UserSchema],
        classId: ClassSchema,
        finished: [Boolean],
        grades: [Number],
        finishTSs: [Date],
        durations: [Number]
    });
    return GradeSchema;
};