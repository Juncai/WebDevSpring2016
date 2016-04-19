"use strict";

module.exports = function (mongoose) {

    var CardSchema = mongoose.Schema({
        question: {type: String, required: true},
        answers: {type: [String], required: true},
        ansInd: {type: Number, required: true},
        pic: String
    });
    return CardSchema;
};