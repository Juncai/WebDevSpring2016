"use strict";

var q = require("q");

module.exports = function (db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    var api = {
        createUser: createUser,
        register: register,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUserById: updateUser,
        updateUserByIdAdmin: updateUserAdmin,
        deleteUser: deleteUser,
        // sortUser: sortUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };
    return api;

    // function sortUser(startInd, endInd) {
    //     var deferred = q.defer();
    //     UserModel.find({}, function (err, users) {
    //         if (err) {
    //             deferred.reject(err);
    //         } else {
    //             users.splice(endInd, 0, users.splice(startInd, 1)[0]);
    //             users.markModified();
    //             users.save();
    //             deferred.resolve(200);
    //         }
    //     });
    //
    //     return deferred.promise;
    // }

    function createUser(user) {
        var deferred = q.defer();

        UserModel.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, newUser) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            // resolve promise
                            UserModel.find({}, function (err, users) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(users);
                                }
                            });
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function register(user) {
        var deferred = q.defer();

        UserModel.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, newUser) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            // resolve promise
                            deferred.resolve(newUser);
                        }
                    });
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
        UserModel.findOne({
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

        delete user._id;
        UserModel.update({_id: id}, user, function (err, doc) {

            // reject promise if error
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                // resolve promise with user
                console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUserAdmin(id, user) {
        var deferred = q.defer();

        delete user._id;
        UserModel.update({_id: id}, user, function (err, doc) {

            // reject promise if error
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                // resolve promise with user
                UserModel.find({}, function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find({}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
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
