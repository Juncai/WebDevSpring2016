"use strict";

module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: 'TEXT',
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        placeholder: String,
        options: [{label: String, value: String}]
    });
    return FieldSchema;
};