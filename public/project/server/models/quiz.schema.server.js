"use strict";

module.exports = function (mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var CardSchema = require("./card.schema.server.js")(mongoose);
    var QuizSchema = mongoose.Schema({
        name: { type: String, required: true },
        created: Date,
        createdBy: UserSchema,
        cards: [CardSchema]
    }, {collection: 'project.quiz'});
    return QuizSchema;
};