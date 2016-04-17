/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (mongoose, utils) {
    var QuizSchema = require("./quiz.schema.server.js")(mongoose);
    var QuizModel = mongoose.model('Quiz', QuizSchema);
    var api = {
        findQuizById: findQuizById,
        createQuiz: createQuiz,
        updateQuiz: updateQuiz,
        deleteQuizById: deleteQuizById,
        // for cards
        findCardsByQuizId: findCardsByQuizId,
        findCardById: findCardById,
        deleteCardById: deleteCardById,
        createCardForQuiz: createCardForQuiz,
        updateCardForQuiz: updateCardForQuiz
    };
    return api;

    function createQuiz(quiz) {
        var deferred = q.defer();
        QuizModel.create(quiz, function (err, doc) {
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
        QuizModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateQuiz(id, quiz) {
        var deferred = q.defer();

        delete quiz._id;
        QuizModel.update({_id: id}, clazz, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteQuizById(id) {
        var deferred = q.defer();
        QuizModel.remove({_id: id}, function (err, removed) {
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
    //    QuizModel.remove({_id: id}, function (err, removed) {
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //            QuizModel.find({}, function (err, doc) {
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


    // for cards
    function createCardForQuiz(id, card) {
        var deferred = q.defer();
        QuizModel.findOne({_id: id}, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                quiz.cards.push(card);
                delete quiz._id;
                QuizModel.update({_id: id}, quiz, function (err, doc) {
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

    function findCardsByQuizId(quizId) {
        var deferred = q.defer();
        QuizModel.findOne({_id: quizId}, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(quiz.cards);
            }
        });

        return deferred.promise;
    }

    function findCardById(quizId, cardId) {
        var deferred = q.defer();
        var res = null;
        QuizModel.findOne({_id: quizId}, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(cardId, quiz.cards);
                if (ind > -1) {
                    res = quiz.cards[ind];
                }
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function deleteCardById(quizId, cardId) {
        var deferred = q.defer();
        QuizModel.findOne({_id: quizId}, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                var indToRemove = utils.findIndexById(cardId, quiz.cards);
                if (indToRemove > -1) {
                    quiz.cards.splice(indToRemove, 1);
                }
                delete quiz._id;
                QuizModel.update({_id: quizId}, quiz, function (err, doc) {
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

    function updateCardForQuiz(quizId, cardId, card) {
        var deferred = q.defer();
        QuizModel.findOne({_id: quizId}, function (err, quiz) {
            if (err) {
                deferred.reject(err);
            } else {
                var ind = utils.findIndexById(cardId, quiz.cards);
                if (ind > -1) {
                    card._id = cardId;
                    quiz.cards[ind] = card;
                }
                delete quiz._id;
                QuizModel.update({_id: quizId}, quiz, function (err, doc) {
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
};