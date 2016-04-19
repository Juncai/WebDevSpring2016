"use strict";
var q = require("q");

/**
 * Created by jonca on 3/16/2016.
 * Use clazz instead of class to avoid keyword conflicts
 */
module.exports = function (mongoose, utils) {
    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var Class = mongoose.model('Class', ClassSchema);
    var api = {
        findClassById: findClassById,
        createClass: createClass,
        updateClass: updateClass,
        // deleteClass: deleteClass,
        // for grades
        createGradeForClass: createGradeForClass,
        // deleteGradeById: deleteGradeById,
        // updateGradeForClass: updateGradeForClass,
        updateStudentGrade: updateStudentGrade,
        findGradesByClassId: findGradesByClassId,
        findGradeById: findGradeById,
        // for students
        addStudentToClass: addStudentToClass,
        // deleteStudentById: deleteStudentById,
        // updateStudentForClass: updateStudentForClass,
        // 
        getModel: getModel
    };
    return api;

    function getModel() {
        return Class;
    }

    function createClass(clazz) {
        var deferred = q.defer();
        Class.create(clazz, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
    
    function findClassById(classId) {
        var deferred = q.defer();
        Class.findById(classId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateClass(id, clazz) {
        var deferred = q.defer();

        delete clazz._id;
        Class.update({_id: id}, clazz, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteClass(id) {
        var deferred = q.defer();
        Class.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                Class.find({}, function (err, doc) {
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


    // for grades
    function createGradeForClass(id, quiz, due) {
        var deferred = q.defer();
        Class.findById(id, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var grade = newGrade(quiz, clazz, due);
                clazz.performance.push(grade);
                // clazz.save();
                // deferred.resolve(clazz.students);
                delete clazz._id;
                Class.update({_id: id}, clazz, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(clazz.students);
                    }
                })
            }
        });

        return deferred.promise;
    }

    function findGradesByClassId(classId) {
        var deferred = q.defer();
        Class.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(clazz.performance);
            }
        });

        return deferred.promise;
    }

    function findGradeById(classId, gradeId) {
        var deferred = q.defer();
        // var res = null;
        Class.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                // var ind = utils.findIndexById(gradeId, clazz.performance);
                // if (ind > -1) {
                //     res = clazz.performance[ind];
                // }
                deferred.resolve(clazz.performance.id(gradeId));
            }
        });

        return deferred.promise;
    }

    function deleteGradeById(classId, gradeId) {
        var deferred = q.defer();
        Class.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                // var indToRemove = utils.findIndexById(gradeId, clazz.performance);
                // if (indToRemove > -1) {
                //     clazz.performance.splice(indToRemove, 1);
                // }
                clazz.performance.id(gradeId).remove();
                delete clazz._id;
                Class.update({_id: classId}, clazz, function (err, doc) {
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

    function updateGradeForClass(classId, gradeId, grade) {
        var deferred = q.defer();
        Class.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(gradeId, clazz.performance);
                if (ind > -1) {
                    grade._id = gradeId;
                    clazz.performance[ind] = grade;
                }
                delete clazz._id;
                Class.update({_id: classId}, clazz, function (err, doc) {
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

    function updateStudentGrade(classId, quizId, studentGrade) {
        var deferred = q.defer();
        Class.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = findGradeByQuizId(quizId, clazz.performance);
                if (ind > -1) {
                    updateStudentGradeInGrade(clazz.performance[ind], studentGrade);
                }
                // clazz.save();
                delete clazz._id;
                Class.update({_id: classId}, clazz, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(studentGrade);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // for students
    function addStudentToClass(id, studentUsername) {
        var deferred = q.defer();
        Class.findOne({_id: id}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                clazz.students.push(studentUsername);
                for (var g in clazz.performance) {
                    addStudentToGrade(clazz.performance[g], studentUsername);
                }
                clazz.save();
                deferred.resolve(clazz);
            }
        });

        return deferred.promise;
    }

    // function deleteStudentById(classId, studentId) {
    //     var deferred = q.defer();
    //     Class.findOne({_id: classId}, function (err, clazz) {
    //         if (err) {
    //             deferred.reject(err);
    //         } else {
    //             var indToRemove = utils.findIndexById(studentId, clazz.students);
    //             if (indToRemove > -1) {
    //                 clazz.students.splice(indToRemove, 1);
    //                 // also remove the quiz records for that student
    //                 for (var gInd in clazz.performance) {
    //                     deleteStudentFromGrade(clazz.performance[gInd], studentId);
    //                 }
    //             }
    //             delete clazz._id;
    //             Class.update({_id: classId}, clazz, function (err, doc) {
    //                 if (err) {
    //                     deferred.reject(err);
    //                 } else {
    //                     deferred.resolve(doc);
    //                 }
    //             });
    //         }
    //     });

    // return deferred.promise;
    // }

    // function updateStudentForClass(classId, studentId, student) {
    //     var deferred = q.defer();
    //     Class.findOne({_id: classId}, function (err, clazz) {
    //         if (err) {
    //             deferred.reject(err);
    //         } else {
    //             var ind = utils.findIndexById(studentId, clazz.students);
    //             if (ind > -1) {
    //                 student._id = studentId;
    //                 clazz.students[ind] = student;
    //             }
    //             delete clazz._id;
    //             Class.update({_id: classId}, clazz, function (err, doc) {
    //                 if (err) {
    //                     deferred.reject(err);
    //                 } else {
    //                     deferred.resolve(doc);
    //                 }
    //             });
    //         }
    //     });
    //
    //     return deferred.promise;
    // }

    // utils
    function findGradeByQuizId(quizId, performance) {
        var res = -1;
        for (var q in performance) {
            if (performance[q].quizId == quizId) {
                res = q;
            }
        }
        return res;
    }

    function addStudentToGrade(grade, studentUsername) {
        grade.students.push(studentUsername);
        grade.finished.push(false);
        grade.grades.push(-1);
        grade.finishTSs.push(null);
        grade.durations.push(0);
    }

    function deleteStudentFromGrade(grade, username) {
        var ind = findIndexByStudent(username, grade.students);
        if (ind > -1) {
            utils.removeElementAt(grade.students, ind);
            utils.removeElementAt(grade.finished, ind);
            utils.removeElementAt(grade.grades, ind);
            utils.removeElementAt(grade.finishTSs, ind);
            utils.removeElementAt(grade.durations, ind);
        }
    }

    function findIndexByStudent(student, grade) {
        var res = -1;
        for (var s in grade.students) {
            if (grade.students[s] == student) {
                res = s;
            }
        }
        return res;
    }

    function updateStudentGradeInGrade(grade, studentGrade) {
        var ind = findIndexByStudent(studentGrade.students[0], grade);
        if (ind > -1) {
            grade.finished[ind] = studentGrade.finished[0];
            grade.grades[ind] = studentGrade.grades[0];
            grade.finishTSs[ind] = studentGrade.finishTSs[0];
            grade.durations[ind] = studentGrade.durations[0];
        }
    }

    function newGrade(quiz, clazz, due) {
        var grade = {};
        grade.quizId = quiz._id;
        grade.quizName = quiz.name;
        grade.due = due;
        grade.students = [];
        grade.finished = [];
        grade.grades = [];
        grade.finishTSs = [];
        grade.durations = [];
        for (var s in clazz.students) {
            grade.students.push(clazz.students[s]);
            grade.finished.push(false);
            grade.grades.push(-1);
            grade.finishTSs.push(null);
            grade.durations.push(0);
        }
        return grade;
    }
};