"use strict";

module.exports = function (mongoose) {

    var CardSchema = mongoose.Schema({
        question: { type: String, required: true },
        answer: { type: String, required: true },
        pic: String
    });
    return CardSchema;
};