"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("QuizDetailController", quizDetailController);

    function quizDetailController($scope, $location) {
        var quiz =
        {
            "_id": 123, "name": "Quiz Set 01", "authorID": 123, "created": "2016-03-05 12:00.00",
            "classes": [123, 234], "grades": {"123": 90, "234": 60},
            "cards": [
                {
                    "question": "Car",
                    "answer": "车",
                    "picture": "https://farm1.staticflickr.com/514/19933361592_5bd2542eb2_n.jpg"
                },
                {
                    "question": "Cat",
                    "answer": "猫",
                    "picture": "https://farm4.staticflickr.com/3665/10224967706_33f6f2b961_n.jpg"
                }
            ]
        };
        $scope.message = null;
        $scope.currentIndex = 0;
        $scope.currentCard = quiz.cards[$scope.currentIndex];
        $scope.currentQuiz = quiz;
        $scope.next = next;
        $scope.prev = prev;
        $scope.saveQuiz = saveQuiz;
        $scope.backToList = backToList;


        function next() {
            if ($scope.currentIndex < quiz.cards.length - 1) {
                $scope.currentIndex += 1;
                $scope.currentCard = quiz.cards[$scope.currentIndex];
            }
        }

        function prev() {
            if ($scope.currentIndex > 0) {
                $scope.currentIndex -= 1;
                $scope.currentCard = quiz.cards[$scope.currentIndex];
            }
        }

        function saveQuiz() {
            $location.url("/quizList");
        }

        function backToList() {
            $location.url("/quizList");
        }
    }
})();
