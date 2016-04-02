"use strict";

module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
    }, {collection: 'user'});
    return UserSchema;
};