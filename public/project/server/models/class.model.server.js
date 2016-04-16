/**
 * Created by jonca on 3/16/2016.
 * Use clazz instead of class to avoid keyword conflicts
 */
module.exports = function (mongoose) {
    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var ClassModel = mongoose.model('Class', ClassSchema);
    var api = {
        findClassById: findClassById,
        createClass: createClass,
        updateClass: updateClass,
        deleteClass: deleteClass,
        // for grades
        createGradeForClass: createGradeForClass,
        deleteGradeById: deleteGradeById,
        updateGradeForClass: updateGradeForClass,
        updateStudentGrade: updateStudentGrade,
        findGradesByClassId: findGradesByClassId,
        findGradeById: findGradeById,
        // for students
        addStudentToClass: addStudentToClass,
        deleteStudentById: deleteStudentById,
        updateStudentForClass: updateStudentForClass
    };
    return api;

    function createClass(clazz) {
        var deferred = q.defer();
        ClassModel.create(clazz, function (err, doc) {
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
        ClassModel.findById(classId, function (err, doc) {
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
        ClassModel.update({_id: id}, clazz, function (err, doc) {
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
        ClassModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                ClassModel.find({}, function (err, doc) {
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
    function createGradeForClass(id, grade) {
        var deferred = q.defer();
        ClassModel.findOne({_id: id}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                clazz.performance.push(grade);
                delete clazz._id;
                ClassModel.update({_id: id}, clazz, function (err, doc) {
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

    function findGradesByClassId(classId) {
        var deferred = q.defer();
        ClassModel.findOne({_id: classId}, function (err, clazz) {
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
        var res = null;
        ClassModel.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = findIndexById(gradeId, clazz.performance);
                if (ind > -1) {
                    res = clazz.performance[ind];
                }
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function deleteGradeById(classId, gradeId) {
        var deferred = q.defer();
        ClassModel.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = findIndexById(gradeId, clazz.performance);
                if (indToRemove > -1) {
                    clazz.performance.splice(indToRemove, 1);
                }
                delete clazz._id;
                ClassModel.update({_id: classId}, clazz, function (err, doc) {
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
        ClassModel.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = findIndexById(gradeId, clazz.performance);
                if (ind > -1) {
                    grade._id = gradeId;
                    clazz.performance[ind] = grade;
                }
                delete clazz._id;
                ClassModel.update({_id: classId}, clazz, function (err, doc) {
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
        ClassModel.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = findGradeByQuizId(quizId, clazz.performance);
                if (ind > -1) {
                    updateStudentGradeInGrade(clazz.performance[ind], studentGrade);
                }
                delete clazz._id;
                ClassModel.update({_id: classId}, clazz, function (err, doc) {
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

    // for students
    function addStudentToClass(id, student) {
        var deferred = q.defer();
        ClassModel.findOne({_id: id}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                // TODO purge student
                clazz.students.push(student);
                for (var g in clazz.performance) {
                    addStudentToGrade(clazz.performance[g], student);
                }
                delete clazz._id;
                ClassModel.update({_id: id}, clazz, function (err, doc) {
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

    function deleteStudentById(classId, studentId) {
        var deferred = q.defer();
        ClassModel.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = findIndexById(studentId, clazz.students);
                if (indToRemove > -1) {
                    clazz.students.splice(indToRemove, 1);
                    // also remove the quiz records for that student
                    for (var gInd in clazz.performance) {
                        deleteStudentFromGrade(clazz.performance[gInd], studentId);
                    }
                }
                delete clazz._id;
                ClassModel.update({_id: classId}, clazz, function (err, doc) {
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

    function updateStudentForClass(classId, studentId, student) {
        var deferred = q.defer();
        ClassModel.findOne({_id: classId}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = findIndexById(studentId, clazz.students);
                if (ind > -1) {
                    student._id = studentId;
                    clazz.students[ind] = student;
                }
                delete clazz._id;
                ClassModel.update({_id: classId}, clazz, function (err, doc) {
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
    function findIndexById(id, group) {
        var res = -1;
        for (var g in group) {
            if (group[g]._id === id) {
                res = g;
            }
        }
        return res;
    }

    function removeElementAt(collection, index) {
        collection.splice(index, 1);
    }

    function findGradeByQuizId(quizId, performance) {
        var res = -1;
        for (var q in performance) {
            if (performance[q].quizId == quizId) {
                res = q;
            }
        }
        return res;
    }

    function addStudentToGrade(grade, student) {
        grade.students.push(student);
        grade.finished.push(false);
        grade.grades.push(-1);
        grade.finishTSs.push(null);
        grade.durations.push(0);
    }

    function deleteStudentFromGrade(grade, studentId) {
        var ind = findIndexById(studentId, grade.students);
        if (ind > -1) {
            removeElementAt(grade.students, ind);
            removeElementAt(grade.finished, ind);
            removeElementAt(grade.grades, ind);
            removeElementAt(grade.finishTSs, ind);
            removeElementAt(grade.durations, ind);
        }
    }

    function updateStudentGradeInGrade(grade, studentGrade) {
        var ind = findIndexById(studentGrade.students[0]._id, grade.students);
        if (ind > -1) {
            grade.finished[ind] = studentGrade.finished[0];
            grade.grades[ind] = studentGrade.grades[0];
            grade.finishTSs[ind] = studentGrade.finishTSs[0];
            grade.durations[ind] = studentGrade.durations[0];
        }
    }
};