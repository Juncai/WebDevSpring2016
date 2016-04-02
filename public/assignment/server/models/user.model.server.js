/**
 * Created by jonca on 3/16/2016.
 */
var q = require("q");

module.exports = function (db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({}, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            username: username
        }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();

        // find the user
        UserModel.findById(id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // update user info
                doc.password = user.password;
                doc.firstName = user.firstName;
                doc.password = user.password;
                doc.emails = user.emails;

                // save user
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.remove({userId: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(removed);
            }
        });

        return deferred.promise;
    }


    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {
                username: credentials.username,
                password: credentials.password
            },

            // doc is unique instance matches predicate
            function (err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }
};
