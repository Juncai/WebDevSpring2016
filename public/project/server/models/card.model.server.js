"use strict";
var q = require("q");

/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (quizModel) {
    var Quiz = quizModel.getModel();
    var api = {
        findCardsByQuizId: findCardsByQuizId,
        findCardById: findCardById,
        deleteCardById: deleteCardById,
        createCardForQuiz: createCardForQuiz,
        updateCardForQuiz: updateCardForQuiz,
    };
    return api;

    function createCardForQuiz(quizId, card) {
        return Quiz.findQuizById(quizId)
            .then(
                function (quiz) {
                    quiz.cards.push(card);
                    return quiz.save();
                }
            );
    }

    function findCardsByQuizId(quizId) {
        return Quiz.findQuizById(quizId).select("cards");
    }

    function findCardById(quizId, cardId) {
        return Quiz.findQuizById(quizId)
            .then(
                function (quiz) {
                    return quiz.cards.id(cardId);
                }
            );
    }

    function deleteCardById(quizId, cardId) {
        return Quiz.findQuizById(quizId)
            .then(
                function (quiz) {
                    quiz.cards.id(cardId).remove();
                    return quiz.save();
                }
            );
    }

    function updateCardForQuiz(quizId, cardId, cardObj) {
        return Quiz.findQuizById(quizId)
            .then(
                function (quiz) {
                    var card = quiz.cards.id(cardId);
                    card.question = cardObj.question;
                    card.answer = cardObj.answer;
                    card.pic = cardObj.pic;
                    return quiz.save();
                }
            );
    }
};