/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (mongoose) {
    var QuizSchema = require("./quiz.schema.server.js")(mongoose);
    var Quiz = mongoose.model('Quiz', QuizSchema);
    var api = {
        findQuizById: findQuizById,
        createQuiz: createQuiz,
        updateQuiz: updateQuiz,
        deleteQuizById: deleteQuizById,
        addClassToQuiz: addClassToQuiz,
        //
        getModel: getModel
    };
    return api;

    function getModel() {
        return Quiz;
    }

    function addClassToQuiz(quizId, classId) {
        var deferred = q.defer();
        Quiz.findById(quizId, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                quiz.classes.push(classId);
                deferred.resolve(quiz.save());
            }
        });

        return deferred.promise;
    }

    function createQuiz(quiz) {
        var deferred = q.defer();
        Quiz.create(quiz, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findQuizById(id) {
        var deferred = q.defer();
        Quiz.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateQuiz(id, quizObj) {
        var deferred = q.defer();

        delete quizObj._id;
        Quiz.update({_id: id}, quizObj, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(quiz);
            }
        });

        return deferred.promise;
    }

    function deleteQuizById(id) {
        var deferred = q.defer();
        Quiz.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(removed);
            }
        });

        return deferred.promise;
    }

    //function deleteQuizById(id) {
    //    var deferred = q.defer();
    //    Quiz.remove({_id: id}, function (err, removed) {
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //            Quiz.find({}, function (err, doc) {
    //                if (err) {
    //                    deferred.reject(err);
    //                } else {
    //                    deferred.resolve(doc);
    //                }
    //            });
    //        }
    //    });
    //
    //    return deferred.promise;
    //}
};