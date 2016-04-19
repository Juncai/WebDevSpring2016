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
        vm.message = null;
        vm.correctMessage = null;
        vm.currentUser = UserService.getCurrentUser();
        vm.act = $routeParams.act; // can be [VIEW, EDIT, PRACTICE]
        vm.gradeId = $routeParams.gradeId;
        vm.classId = $routeParams.classId;
        vm.pageType = 'VIEW';
        vm.currentIndex = 0;
        vm.currentClass = null;
        vm.currentGrade = null;
        vm.currentQuiz = null;
        // vm.currentCard = quiz.cards[vm.currentIndex];
        vm.currentCard = null;
        vm.newAnswer = null;
        vm.selectedInd = -1;
        vm.finishedInd = -1;
        vm.startTime = Date.now();
        vm.score = 0;
        vm.next = next;
        vm.prev = prev;
        vm.remove = remove;
        vm.done = done;
        vm.cancel = cancel;
        vm.addAnswer = addAnswer;
        vm.canEdit = canEdit;
        // vm.updateAnswer = updateAnswer;
        vm.removeAnswer = removeAnswer;
        vm.selectAns = selectAns;

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
                // here the gradeId is quizId
                if (vm.currentUser.role == 'TEACHER') {
                    vm.pageType = 'PERFORMANCE';
                    ClassService.findClassById(vm.classId)
                        .then(
                            function (response) {
                                vm.currentClass = response.data;
                                for (var g in vm.currentClass.performance) {
                                    if (vm.currentClass.performance[g].quizId == vm.gradeId) {
                                        vm.currentGrade = vm.currentClass.performance[g];
                                        break;
                                    }
                                }
                            }
                        )
                } else {
                    UserService.findGradeInClassForUser(vm.currentUser._id, vm.classId, vm.gradeId)
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
                                    vm.currentCard = vm.currentQuiz.cards[0];
                                }
                                if (vm.currentGrade.finished[0]) {
                                    vm.correctMessage = "Quiz already finished!";
                                    vm.pageType = 'VIEW';
                                } else {
                                    vm.pageType = 'QUIZ';
                                }
                            }
                        );
                }
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
            vm.message = null;
            if (vm.currentIndex < vm.currentQuiz.cards.length - 1) {
                vm.currentIndex += 1;
                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
                vm.correctMessage = null;
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
            if (vm.pageType == 'QUIZ' || vm.pageType == 'PRACTICE') {
                return;
            }
            if (vm.currentIndex > 0) {
                vm.currentIndex -= 1;
                vm.currentCard = vm.currentQuiz.cards[vm.currentIndex];
                vm.message = null;
                vm.correctMessage = null;
            }
        }

        function addAnswer(newAns) {
            vm.currentCard.answers.push(newAns);
            vm.newAnswer = null;
        }

        // function updateAnswer(i, newAns) {
        //     vm.currentCard.answers[i] = newAns;
        // }

        function removeAnswer(i) {
            vm.currentCard.answers.splice(i, 1);
        }

        function selectAns(i) {
            if (vm.finishedInd >= vm.currentIndex) {
                vm.message = "Already answered!";
                return;
            }
            var correctInd = vm.currentCard.ansInd;
            if (i == correctInd) {
                vm.message = null;
                vm.correctMessage = "Correct!";
                vm.score += 1;
                vm.finishedInd = vm.currentIndex;
            } else {
                vm.correctMessage = null;
                vm.message = "Wrong. The correct answer is: " + vm.currentCard.answers[correctInd] + "!";
                vm.finishedInd = vm.currentIndex;
            }
        }

        function done() {
            if (vm.pageType == 'NEW') {
                vm.currentQuiz.created = Date.now();
                QuizService.createQuizForUser(vm.currentUser._id, vm.currentQuiz)
                    .then(
                        function (response) {
                            $location.url("/profile");
                        }
                    )
            } else if (vm.pageType == 'EDIT') {
                QuizService.updateQuizById(vm.currentQuiz._id, vm.currentQuiz)
                    .then(
                        function (response) {
                            $location.url("/profile");
                        }
                    )
            } else if (vm.pageType == 'VIEW') {
                $location.url("/profile");
            } else if (vm.pageType == 'PRACTICE') {
                vm.currentGrade.finished[0] = true;
                vm.currentGrade.grades[0] = vm.score;
                var endTime = Date.now();
                vm.currentGrade.finishTSs[0] = endTime;
                vm.currentGrade.durations[0] = Math.floor(Math.abs(vm.startTime - endTime) / 1000);
                UserService.finishQuizPractice(vm.currentUser._id, vm.gradeId, vm.currentGrade)
                    .then(
                        function (response) {
                            $location.url('/profile');
                        }
                    )
            } else if (vm.pageType == 'QUIZ') {
                vm.currentGrade.finished[0] = true;
                vm.currentGrade.grades[0] = vm.score;
                var endTime = Date.now();
                vm.currentGrade.finishTSs[0] = endTime;
                vm.currentGrade.durations[0] = Math.floor(Math.abs(vm.startTime - endTime) / 1000);
                ClassService.finishClassQuiz(vm.classId, vm.currentUser._id, vm.gradeId, vm.currentGrade)
                    .then(
                        function (response) {
                            if (vm.classId) {
                                $location.url("/classDetail/" + vm.classId);
                            } else {
                                $location.url("/profile");
                            }
                        }
                    )
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
            if (vm.classId) {
                $location.url("/classDetail/" + vm.classId);
            } else {
                $location.url("/profile");
            }
        }
    }
})();
