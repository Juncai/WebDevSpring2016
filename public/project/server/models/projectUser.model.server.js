"use strict";
var q = require("q");

/**
 * Created by jonca on 3/16/2016.
 */

module.exports = function (mongoose, utils) {
    var ProjectUserSchema = require("./projectUser.schema.server.js")(mongoose);
    var ProjectUser = mongoose.model('ProjectUser', ProjectUserSchema);
    var api = {
        // createUser: createUser,
        register: register,
        // findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        // for classes
        addClassForStudent: addClassForStudent,
        addClassForTeacher: addClassForTeacher,
        // deleteClassById: deleteClassById,
        updateClassById: updateClassById,
        addGradeToClassForUsers: addGradeToClassForUsers,
        updateGradeToClass: updateGradeToClass,
        findGradeInClassByQuizId: findGradeInClassByQuizId,
        // for grades
        createQuizForUser: createGradeForUser,
        // deleteQuizById: deleteGradeById,
        updateQuizForUser: updateGradeForUser,
        findQuizById: findGradeById,
        // for users
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        addFollowed: addFollowed,
        removeFollowed: removeFollowed
    };
    return api;

    function addGradeToClassForUsers(usernames, classId, quiz, due) {
        var deferred = q.defer();
        ProjectUser.find({username: {$in: usernames}}, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var u in users) {
                    var user = users[u];
                    var id = user._id;
                    var grade = newGrade(quiz, user, due);
                    user.classes.id(classId).performance.push(grade);
                    user = user.toObject();
                    delete user._id;
                    ProjectUser.update({_id: id}, user, function (err, doc) {
                        if (err) {
                            // nothing
                        }
                    });
                    // user.markModified('classes');
                    // user.save();
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function updateUsers(users) {

    }

    function createUser(user) {
        var deferred = q.defer();

        ProjectUser.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    ProjectUser.create(user, function (err, newUser) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            // resolve promise
                            ProjectUser.find({}, function (err, users) {
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

        ProjectUser.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    ProjectUser.create(user, function (err, newUser) {
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
        ProjectUser.find({}, function (err, users) {
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
        ProjectUser.findById(userId, function (err, doc) {
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
        ProjectUser.findOne({
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

        //user = user.toObject();
        delete user._id;
        ProjectUser.update({_id: id}, user, function (err, doc) {

            // reject promise if error
            if (err) {
                // console.log(err);
                deferred.reject(err);
            } else {
                // resolve promise with user
                // console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        ProjectUser.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                ProjectUser.find({}, function (err, doc) {
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
        ProjectUser.findOne(
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
    function addClassForStudent(userId, clazz) {
        var deferred = q.defer();
        ProjectUser.findById(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                // TODO handle the existing quizzes
                initQuizzesInClass(clazz, user);
                user.classes.push(clazz);
                //user.save();
                user = user.toObject();
                    delete user._id;
                    ProjectUser.update({_id: userId}, user, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(clazz);
                        }
                    });
                //deferred.resolve(clazz);
            }
        });
        return deferred.promise;
    }

    function addClassForTeacher(username, clazz) {
        var deferred = q.defer();
        ProjectUser.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                user.classes.push(clazz);
                //user.save();
                var id = user._id;
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: id}, user, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(clazz);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteClassById(userId, classId) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(classId, user.classes);
                if (indToRemove > -1) {
                    user.classes.splice(indToRemove, 1);
                }
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
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
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(classId, user.classes);
                if (ind > -1) {
                    clazz._id = classId;
                    user.classes[ind] = clazz;
                }
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
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

    function updateGradeToClass(userId, classId, quizId, gradeObj) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var clazz = user.classes.id(classId);
                var grade = null;
                for (var g in clazz.performance) {
                    if (clazz.performance[g].quizId == quizId) {
                        grade = clazz.performance[g];
                        break;
                    }
                }
                if (!grade.finished[0]) {
                    grade.finished[0] = gradeObj.finished[0];
                    grade.grades[0] = gradeObj.grades[0];
                    grade.finishTSs[0] = gradeObj.finishTSs[0];
                    grade.durations[0] = gradeObj.durations[0];
                    // user.save();
                    user = user.toObject();
                    delete user._id;
                    ProjectUser.update({_id: userId}, user, function (err, doc) {
                        if (err) {

                        } else {
                            deferred.resolve(grade);
                        }
                    });
                } else {
                    deferred.resolve(grade);
                }
            }
        });

        return deferred.promise;
    }

    function findGradeInClassByQuizId(userId, classId, quizId) {
        var deferred = q.defer();
        var gradeFound = null;
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var clazz = user.classes.id(classId);
                // gradeFound = clazz.performance.id(gradeId);
                for (var g in clazz.performance) {
                    if (clazz.performance[g].quizId == quizId) {
                        gradeFound = clazz.performance[g];
                        break;
                    }
                }
                deferred.resolve(gradeFound);
            }
        });

        return deferred.promise;
    }

    // for grades
    function createGradeForUser(id, quiz) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: id}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var grade = newGrade(quiz, user, null);
                user.quizCreated.push(grade);
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: id}, user, function (err, doc) {
                    if (err) {
                        console.log(err);
                        console.log(user);
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
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                res = user.quizCreated.id(gradeId);
                // var ind = utils.findIndexById(gradeId, user.quizCreated);
                // if (ind > -1) {
                //     res = user.quizCreated[ind];
                // }
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function deleteGradeById(userId, gradeId) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(gradeId, user.quizCreated);
                if (indToRemove > -1) {
                    user.quizCreated.splice(indToRemove, 1);
                }
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
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

    function updateGradeForUser(userId, gradeId, gradeObj) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var grade = user.quizCreated.id(gradeId);
                grade.finished = gradeObj.finished;
                grade.grades = gradeObj.grades;
                grade.finishTSs = gradeObj.finishTSs;
                grade.durations = gradeObj.durations;
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // for users
    function addFollowing(userId, followedUsername) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                if (user.following.indexOf(followedUsername) < 0) {
                    user.following.push(followedUsername);
                    //user.save();
                    user = user.toObject();
                    delete user._id;
                    ProjectUser.update({_id: userId}, user, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(user);
                        }
                    });
                } else {
                    deferred.resolve(user);
                }
            }
        });

        return deferred.promise;

    }

    function removeFollowing(userId, followedUsername) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = user.following.indexOf(followedUsername);
                if (indToRemove > -1) {
                    user.following.splice(indToRemove, 1);
                }
                //user.save();
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
                //deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function addFollowed(userId, followingUsername) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                if (user.followed.indexOf(followingUsername) < 0) {
                    user.followed.push(followingUsername);
                    //user.save();
                    user = user.toObject();
                    delete user._id;
                    ProjectUser.update({_id: userId}, user, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(user);
                        }
                    });
                } else {
                    deferred.resolve(user);
                }
            }
        });

        return deferred.promise;
    }

    function removeFollowed(username, followingUsername) {
        var deferred = q.defer();
        ProjectUser.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = user.followed.indexOf(followingUsername);
                if (indToRemove > -1) {
                    user.followed.splice(indToRemove, 1);
                }
                //user.save();
                var id = user._id;
                user = user.toObject();
                delete user._id;
                ProjectUser.update({_id: id}, user, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
                //deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    // utils
    function initQuizzesInClass(clazz, user) {
        for (var q in clazz.performance) {
            initGrade(clazz.performance[q], user);
        }
    }

    function initGrade(grade, user) {
        grade.students = [user.username];
        grade.finished = [false];
        grade.grades = [-1];
        grade.finishTSs = [null];
        grade.durations = [0];
    }

    function newGrade(quiz, user, due) {
        var grade = {};
        grade.quizId = quiz._id;
        grade.quizName = quiz.name;
        grade.due = due;
        grade.students = [user.username];
        grade.finished = [false];
        grade.grades = [-1];
        grade.finishTSs = [null];
        grade.durations = [0];
        return grade
    }
};
