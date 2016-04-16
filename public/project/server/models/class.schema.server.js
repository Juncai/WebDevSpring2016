"use strict";

module.exports = function (mongoose) {

    var GradeSchema = require("./grade.schema.server.js")(mongoose);
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var SchoolSchema = require("./school.schema.server.js")(mongoose);
    var ClassSchema = mongoose.Schema({
        name: { type: String, required: true },
        school: SchoolSchema,
        created: Date,
        students: [UserSchema],
        teachers: [UserSchema],
        performance: [GradeSchema]
    }, {collection: 'project.class'});
    return ClassSchema;
};