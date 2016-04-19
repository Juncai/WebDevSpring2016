"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("QuizService", quizService);

    function quizService($http) {
        var model = {
            createQuizForUser: createQuizForUser,
            findAllQuizzesForUser: findAllQuizzesForUser,
            deleteQuizById: deleteQuizById,
            updateQuizById: updateQuizById,
            findQuizById: findQuizById,
            assignQuizToClass: assignQuizToClass
        };
        return model;
        
        function assignQuizToClass(quizId, classId, due) {
            return $http.post("/api/project/quiz/" + quizId + "/class/" + classId, due);
        }

        function createQuizForUser(userId, quiz) {
            return $http.post("/api/project/quiz/user/" + userId, quiz);
        }

        function findAllQuizzesForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/quiz");
        }

        function deleteQuizById(quizId) {
            return $http.delete("/api/project/quiz/" + quizId);
        }

        function findQuizById(quizId) {
            return $http.get("/api/project/quiz/" + quizId);
        }

        function updateQuizById(quizId, newQuiz) {
            return $http.put("/api/project/quiz/" + quizId, newQuiz);
        }
    }
})();
