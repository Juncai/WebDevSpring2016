/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (mongoose, utils) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    var api = {
        createUser: createUser,
        register: register,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        // for classes
        addClassForUser: addClassForUser,
        deleteClassById: deleteClassById,
        updateClassById: updateClassById,
        addGradeToClass: addGradeToClass,
        updateGradeToClass: updateGradeToClass,
        findGradeInClassById: findGradeInClassById,
        // for grades
        createQuizForUser: createGradeForUser,
        deleteQuizById: deleteGradeById,
        updateQuizForUser: updateGradeForUser,
        findQuizById: findGradeById,
        // for users
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        addFollowed: addFollowed,
        removeFollowed: removeFollowed
    };
    return api;

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

    // for classes
    function addClassForUser(userId, clazz) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                // TODO handle the existing quizzes
                initQuizzesInClass(clazz, user);
                user.classesEnroll.push(clazz);
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
                    if (err) {
                        // console.log(err);
                        deferred.reject(err);
                    } else {
                        // console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteClassById(userId, classId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(classId, user.classes);
                if (indToRemove > -1) {
                    user.classes.splice(indToRemove, 1);
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    function updateClassById(userId, classId, clazz) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(classId, user.classes);
                if (ind > -1) {
                    clazz._id = classId;
                    user.classes[ind] = clazz;
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    // addGradeToClass: addGradeToClass,
    function addGradeToClass(userId, classId, grade) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(classId, user.classes);
                if (ind > -1) {
                    // init grade
                    initQuiz(grade, user);
                    user.classes[ind].performance.push(grade);
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    // updateGradeToClass: updateGradeToClass,
    function updateGradeToClass(userId, classId, gradeId, grade) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(classId, user.classes);
                if (ind > -1) {
                    var gInd = utils.findIndexById(gradeId, user.classes[ind].performance);
                    if (gInd > -1) {
                        grade._id = gradeId;
                        user.classes[ind].performance[gInd] = grade;
                    }
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    function findGradeInClassById(userId, classId, gradeId) {
        var deferred = q.defer();
        var gradeFound = null;
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(classId, user.classes);
                if (ind > -1) {
                    var gInd = utils.findIndexById(gradeId, user.classes[ind].performance);
                    if (gInd > -1) {
                        gradeFound = user.classes[ind].performance[gInd];
                    }
                }
                deferred.resolve(gradeFound);
            }
        });

        return deferred.promise;
    }

    // for grades
    function createGradeForUser(id, grade) {
        var deferred = q.defer();
        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                initQuiz(grade, user);
                user.quizCreated.push(grade);
                delete user._id;
                UserModel.update({_id: id}, user, function (err, doc) {
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

    function findGradeById(userId, gradeId) {
        var deferred = q.defer();
        var res = null;
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(gradeId, user.quizCreated);
                if (ind > -1) {
                    res = user.quizCreated[ind];
                }
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function deleteGradeById(userId, gradeId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(gradeId, user.quizCreated);
                if (indToRemove > -1) {
                    user.quizCreated.splice(indToRemove, 1);
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    function updateGradeForUser(userId, gradeId, grade) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(gradeId, user.quizCreated);
                if (ind > -1) {
                    grade._id = gradeId;
                    user.quizCreated[ind] = grade;
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    // for users
    function addFollowing(userId, following) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                user.following.push(following);
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    function removeFollowing(userId, followingId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(followingId, user.following);
                if (indToRemove > -1) {
                    user.following.splice(indToRemove, 1);
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    function addFollowed(userId, followed) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                user.followed.push(followed);
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    function removeFollowed(userId, followedId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(followedId, user.followed);
                if (indToRemove > -1) {
                    user.followed.splice(indToRemove, 1);
                }
                delete user._id;
                UserModel.update({_id: userId}, user, function (err, doc) {
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

    // utils
    function initQuizzesInClass(clazz, user) {
        for (var q in clazz.performance) {
            initQuiz(clazz.performance[q], user);
        }
    }

    function initQuiz(quiz, user) {
        var pUser = utils.purgeUser(user);
        quiz.students = [pUser];
        quiz.finished = [false];
        quiz.grades = [-1];
        quiz.finishTSs = [null];
        quiz.durations = [0];
    }
};
