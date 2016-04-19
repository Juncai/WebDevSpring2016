"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 * pageTypes: VIEW, {NEW, EDIT}, {PRACTICE, QUIZ}
 */

(function () {
    angular
        .module("QuizZ")
        .controller("QuizDetailController", quizDetailController);

    function quizDetailController($routeParams, $location, UserService, QuizService, ClassService) {
        var vm = this;
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
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();
        vm.act = $routeParams.act; // can be [VIEW, EDIT, PRACTICE]
        vm.gradeId = $routeParams.gradeId;
        vm.classId = $routeParams.classId;
        vm.pageType = 'VIEW';
        vm.currentIndex = 0;
        vm.currentGrade = null;
        vm.currentQuiz = null;
        // vm.currentCard = quiz.cards[vm.currentIndex];
        vm.currentCard = null;
        vm.newAnswer = null;
        vm.next = next;
        vm.prev = prev;
        vm.remove = remove;
        vm.done = done;
        vm.cancel = cancel;
        vm.addAnswer = addAnswer;
        vm.canEdit = canEdit;
        vm.updateAnswer = updateAnswer;
        vm.removeAnswer = removeAnswer;

        function init() {
            if (vm.currentUser == null) {
                $location.url('/home');
                return;
            }
            if (vm.act != null) {
                // owner entry
                vm.pageType = vm.act;
                UserService.findGradeForUser(vm.currentUser._id, vm.gradeId)
                    .then(
                        function (response) {
                            vm.currentGrade = response.data;
                            return QuizService.findQuizById(vm.currentGrade.quizId);
                        }
                    )
                    .then(
                        function (response) {
                            vm.currentQuiz = response.data;
                            if (vm.currentQuiz.cards.length > 0) {
                                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
                            }
                            if (vm.currentUser.username != vm.currentQuiz.createdBy) {
                                vm.pageType = 'VIEW';
                            }
                        }
                    );
            } else if (vm.classId != null) {
                // class entry: for students take quiz if not finished, for teacher view the performance
                UserService.findGradeInClassForUser(userId, classId, gradeId)
                    .then(
                        function (response) {
                            vm.currentGrade = response.data;
                            return QuizService.findQuizById(vm.currentGrade.quizId);
                        }
                    )
                    .then(
                        function (response) {
                            vm.currentQuiz = response.data;
                            if (vm.currentQuiz.cards.length > 0) {
                                vm.currentCard = cm.currentQuiz.cards[0];
                            }
                            if (vm.currentUser.role == 'TEACHER') {
                                vm.pageType = 'PERFORMANCE';
                            } else {
                                vm.pageType = 'QUIZ';
                            }
                        }
                    );
            } else {
                // for new quiz creation
                vm.pageType = 'NEW';
                vm.currentQuiz = newQuiz();
                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
            }
        }

        init();

        function newQuiz() {
            var res = {};
            res.createdBy = vm.currentUser.username;
            res.name = "Quiz Name";
            res.assignTo = [];
            res.cards = [newCard()];
            return res;
        }

        function newCard() {
            var res = {};
            res.question = "Question";
            res.answers = [];
            res.ansInd = 0;
            res.pic = null;
            return res;
        }

        function next() {
            if (vm.currentIndex < vm.currentQuiz.cards.length - 1) {
                vm.currentIndex += 1;
                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
            } else if (canEdit()) {
                vm.currentQuiz.cards.push(newCard());
                vm.currentIndex += 1;
                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
            }
        }
        
        function canEdit() {
            return vm.pageType == 'NEW' || vm.pageType == 'EDIT';
        }

        function prev() {
            if (vm.currentIndex > 0) {
                vm.currentIndex -= 1;
                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
            }
        }

        function addAnswer(newAns) {
            vm.currentCard.answers.push(newAns);
            vm.newAnswer = null;
        }

        function updateAnswer(i, newAns) {
            vm.currentCard.answers[i] = newAns;
        }

        function removeAnswer(i) {
            vm.currentCard.answers.splice(i, 1);
        }

        function done() {
            if (vm.pageType == 'NEW') {
                vm.currentQuiz.created = Date.now();
                QuizService.createQuizForUser(vm.currentUser._id, vm.currentQuiz)
                    .then(
                        function(response) {
                            $location.url("/profile");
                        }
                    )
            } else if (vm.pageType == 'EDIT') {
                 QuizService.updateQuizById(vm.currentQuiz._id, vm.currentQuiz)
                    .then(
                        function(response) {
                            $location.url("/profile");
                        }
                    )               
            } else if (vm.pageType == 'VIEW') {
                $location.url("/profile");
            }
        }
        
        function remove() {
            if (vm.currentQuiz.cards.length <= 1) {
                vm.message = "Quiz should at least have one card in it";
                return;
            }
            vm.currentQuiz.cards.splice(vm.currentIndex, 1);
            if (vm.currentIndex >= vm.currentQuiz.cards.length) {
                vm.currentIndex = vm.currentQuiz.cards.length - 1;
            }
            vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
        }
        
        function cancel() {
            $location.url("/profile");
        }
    }
})();
