/**
 * Created by jonca on 3/16/2016.
 */
var mock = require("./quiz.mock.json");
var uuid = require('node-uuid');
module.exports = function () {
    var api = {
        findQuizByID: findQuizByID,
        findQuizsByUserId: findQuizsByUserId,
        createQuiz: createQuiz,
        updateQuiz: updateQuiz,
        deleteQuiz: deleteQuiz,
        findQuizByTitle: findQuizByTitle,
        findCardsByQuizId: findCardsByQuizId,
        findCardById: findCardById,
        deleteCardById: deleteCardById,
        createCardForQuiz: createCardForQuiz,
        updateCardForQuiz: updateCardForQuiz
    };
    return api;

    function createQuiz(quiz) {
        quiz._id = uuid.v1();
        mock.push(quiz);
        return mock;
    }

    function updateQuiz(id, quiz) {
        var i = findIndexById(mock, id);
        if (i > -1) {
            for (var p in quiz) {
                mock[i][p] = quiz[p];
            }
            //return mock[u];
        }
        return mock;
    }

    function deleteQuiz(id) {
        var indexToRemove = findIndexById(mock, id);
        if (indexToRemove > -1) {
            mock.splice(indexToRemove, 1);
        }
        return mock;
    }

    function findIndexById(collection, id) {
        for (var i in collection) {
            if (collection[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

    function findQuizByID(quizID) {
        for (var m in mock) {
            if (mock[m]._id === quizID) {
                return mock[m];
            }
        }
        return null;
    }

    function findQuizByTitle(title) {
        for (var m in mock) {
            if (mock[m].title === title) {
                return mock[m];
            }
        }
        return null;
    }

    function findQuizsByUserId(userId) {
        var userQuizs = [];
        for (var m in mock) {
            if (mock[m].userId == userId) {
                userQuizs.push(mock[m]);
            }
        }
        return userQuizs;
    }

    // for cards
    function findCardsByQuizId(quizId) {
        var quiz = findQuizByID(quizId);
        if (quiz) {
            return quiz.cards;
        }
        return [];
    }

    function findCardById(quizId, cardId) {
        var quiz = findQuizByID(quizId);
        for (var f in quiz.cards) {
            if (quiz.cards[f]._id === cardId) {
                return quiz.cards[f];
            }
        }
    }

    function deleteCardById(quizId, cardId) {
        var quiz = findQuizByID(quizId);
        var indexToRemove = findIndexById(quiz.cards, cardId);
        if (indexToRemove > -1) {
            quiz.cards.splice(indexToRemove, 1);
            var indQuiz = findIndexById(mock, quiz._id);
            mock[indQuiz] = quiz;
        }
        return quiz.cards;
    }

    function createCardForQuiz(quizId, card) {
        var quiz = findQuizByID(quizId);
        card._id = uuid.v1();
        quiz.cards.push(card);
        var indQuiz = findIndexById(mock, quiz._id);
        mock[indQuiz] = quiz;
        return quiz.cards;
    }

    function updateCardForQuiz(quizId, cardId, card) {
        var quiz = findQuizByID(quizId);
        var indCard = findIndexById(quiz.cards, cardId);
        for (var p in card) {
            quiz.cards[indCard][p] = card[p];
        }
        var indQuiz = findIndexById(mock, quiz._id);
        mock[indQuiz] = quiz;
        return quiz.cards;
    }
};