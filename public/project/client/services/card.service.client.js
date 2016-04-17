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
            findCardById: findCardById,
            deleteCardFromQuiz: deleteCardFromQuiz,
            updateCard: updateCard
        };
        return model;

        function createCardForQuiz(quizId, card) {
            return $http.post("/api/project/card/quiz/" + quizId, card);
        }

        function getCardsForQuiz(quizId) {
            return $http.get("/api/project/card/quiz/" + quizId);
        }

        function findCardById(quizId, cardId) {
            return $http.get("/api/project/card/" + cardId + "/quiz/" + quizId);
        }

        function deleteCardFromQuiz(quizId, cardId) {
            return $http.delete("/api/project/card/" + cardId + "/quiz/" + quizId);
        }

        function updateCard(quizId, cardId, card) {
            return $http.put("/api/project/card/" + cardId + "/quiz/" + quizId, card);
        }
    }
})();
