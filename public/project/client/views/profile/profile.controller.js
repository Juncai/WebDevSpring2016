"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService, ClassService, QuizService) {
        var vm = this;

        vm.error = null;
        vm.message = null;
        vm.currentUser = null;
        vm.update = update;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.isTeacher = isTeacher;
        vm.view = view;
        vm.edit = edit;
        vm.practice = practice;
        vm.assign = assign;
        vm.followed = followed;
        vm.isSelf = true;
        vm.self = {};

        function init() {
            if (UserService.getCurrentUser() == null) {
                $location.url("/home");
                return;
            }
            if ($routeParams.username) {
                vm.self = UserService.getCurrentUser();

                UserService.findUserByUsername($routeParams.username)
                    .then(function (response) {
                        vm.currentUser = response.data;
                        if ($routeParams.username == vm.self.username) {
                            UserService.setCurrentUser(vm.currentUser);
                        } else {
                            vm.isSelf = false;
                        }
                    });

            } else {
                UserService.profile(UserService.getCurrentUser()._id)
                    .then(function (response) {
                        vm.currentUser = response.data;
                        UserService.setCurrentUser(vm.currentUser);
                    });
            }
        }

        init();

        function update(user) {
            if (user.verifyPassword) {
                if (user.verifyPassword != user.password) {
                    vm.message = "Passwords don't match.";
                    return;
                }
            } else {
                delete user.password;
            }

            if (!user.email) {
                vm.message = "Email is required.";
                return;
            }
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function (response) {
                    // var cUser = response.data;
                    // if (cUser != null) {
                    //     vm.currentUser = cUser;
                    // }
                });
        }

        function follow(user) {
            UserService.addFollowing(vm.self._id, user)
                .then(
                    function (response) {
                        vm.currentUser = response.data;
                    }
                )
        }

        function unfollow(user) {
            UserService.removeFollowing(vm.self._id, user.username)
                .then(
                    function (response) {
                        vm.currentUser = response.data;
                    }
                )
        }

        function view(gradeId) {
            $location.url('quizDetail/' + gradeId + '/act/VIEW');

        }

        function edit(gradeId) {
            $location.url('quizDetail/' + gradeId + '/act/EDIT');

        }

        function practice(gradeId) {
            $location.url('quizDetail/' + gradeId + '/act/PRACTICE');

        }

        function assign(quizId, classId) {
            ClassService.findClassById(classId)
                .then(
                    function (response) {
                        var clazz = response.data;
                        for (var g in clazz.performance) {
                            if (clazz.performance[g].quizId == quizId) {
                                return;
                            }
                        }
                        return QuizService.assignQuizToClass(quizId, classId, null);
                    }
                )
                .then(
                    function (response) {
                        // do nothing
                    }
                )
        }

        function isTeacher() {
            return vm.isSelf && vm.currentUser.role == 'TEACHER';
        }

        function followed() {
            if (!vm.isSelf && vm.currentUser != null) {
                return vm.currentUser.followed.indexOf(vm.self.username) > -1;
            }
            return false;
        }
    }
})();
