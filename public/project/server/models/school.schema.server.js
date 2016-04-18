"use strict";

module.exports = function (mongoose) {

    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var SchoolSchema = mongoose.Schema({
        name: String,
        UNITID: String,
        city: String,
        county: String,
        state: String,
        zip: String,
        classes: [ClassSchema]
    }, {collection: 'project.school'});
    return SchoolSchema;
};