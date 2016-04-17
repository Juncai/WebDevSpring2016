"use strict";

module.exports = function (mongoose) {

    var GradeSchema = require("./grade.schema.server.js")(mongoose);
    var ClassSchema = mongoose.Schema({
        name: { type: String, required: true },
        schoolId: { type: String, required: true },
        schoolName: { type: String, required: true },
        created: Date,
        students: [String], // username
        teachers: String, // username
        performance: [GradeSchema]
    }, {collection: 'project.class'});
    return ClassSchema;
};