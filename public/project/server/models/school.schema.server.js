"use strict";

module.exports = function (mongoose) {

    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var SchoolSchema = mongoose.Schema({
        name: String,
        UNITID: String,
        city: String,
        state: String,
        classes: [ClassSchema]
    }, {collection: 'project.school'});
    return SchoolSchema;
};