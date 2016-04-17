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
        findGradeInClassById: findGradeInClassById,
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
                    var grade = newGrade(quiz, due);
                    user.classes.id(classId).performance.push(grade);
                    user.save();
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise;
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

        delete user._id;
        ProjectUser.update({_id: id}, user, function (err, doc) {

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
                user.classesEnroll.push(clazz);
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
                    if (err) {
                        // console.log(err);
                        deferred.reject(err);
                    } else {
                        // console.log(doc);
                        deferred.resolve(clazz);
                    }
                });
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
                // TODO handle the existing quizzes
                user.classesEnroll.push(clazz);
                delete user._id;
                ProjectUser.update({_id: userId}, user, function (err, doc) {
                    if (err) {
                        // console.log(err);
                        deferred.reject(err);
                    } else {
                        // console.log(doc);
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

    function updateGradeToClass(userId, classId, gradeId, gradeObj) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var grade = user.classes.id(classId).performance.id(gradeId);
                if (!grade.finished[0]) {
                    grade.finished[0] = gradeObj.finished[0];
                    grade.grades[0] = gradeObj.grades[0];
                    grade.finishTSs[0] = gradeObj.finishTSs[0];
                    grade.durations[0] = gradeObj.durations[0];
                    user.save();
                    deferred.resolve(grade);
                } else {
                    deferred.resolve(null);
                }
            }
        });

        return deferred.promise;
    }

    function findGradeInClassById(userId, classId, gradeId) {
        var deferred = q.defer();
        var gradeFound = null;
        ProjectUser.findOne({_id: userId}, function (err, user) {
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
    function createGradeForUser(id, quiz) {
        var deferred = q.defer();
        ProjectUser.findOne({_id: id}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var grade = newGrade(quiz, null);
                user.quizCreated.push(grade);
                delete user._id;
                ProjectUser.update({_id: id}, user, function (err, doc) {
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
        ProjectUser.findOne({_id: userId}, function (err, user) {
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
        ProjectUser.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(gradeId, user.quizCreated);
                if (indToRemove > -1) {
                    user.quizCreated.splice(indToRemove, 1);
                }
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
                deferred.resolve(user.save());
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
                    user.save();
                }
                deferred.resolve(user);
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
                user.save();
                deferred.resolve(user);
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
                    user.save();
                }
                deferred.resolve(user);
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
                user.save();
                deferred.resolve(user);
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

    function newGrade(quiz, due) {
        var grade = {};
        grade.quizId = quiz._id;
        grade.quizName = quiz.name;
        grade.due = due;
        grade.students = [quiz.createdBy];
        grade.finished = [false];
        grade.grades = [-1];
        grade.finishTSs = [null];
        grade.durations = [0];
        return grade
    }
};
