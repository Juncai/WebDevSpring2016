"use strict";

module.exports = function (mongoose) {

    var CardSchema = require("./card.schema.server.js")(mongoose);
    var QuizSchema = mongoose.Schema({
        name: { type: String, required: true },
        created: Date,
        createdBy: String,
        assignTo: [String],  // classes' ids
        cards: [CardSchema]
    }, {collection: 'project.quiz'});
    return QuizSchema;
};