"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("CardService", cardService);

    function cardService($http) {
        var model = {
            createCardForQuiz: createCardForQuiz,
            getCardsForQuiz: getCardsForQuiz,
            getCardForQuiz: getCardForQuiz,
            deleteCardFromQuiz: deleteCardFromQuiz,
            updateCard: updateCard
        };
        return model;

        function createCardForQuiz(quizId, card) {
            return $http.post("/api/project/quiz/" + quizId + "/card", card);
        }

        function getCardsForQuiz(quizId) {
            return $http.get("/api/project/quiz/" + quizId + "/card");
        }

        function getCardForQuiz(quizId, cardId) {
            return $http.get("/api/project/quiz/" + quizId + "/card/" + cardId);
        }

        function deleteCardFromQuiz(quizId, cardId) {
            return $http.delete("/api/project/quiz/" + quizId + "/card/" + cardId);
        }

        function updateCard(quizId, cardId, card) {
            return $http.put("/api/project/quiz/" + quizId + "/card/" + cardId, card);
        }
    }
})();
