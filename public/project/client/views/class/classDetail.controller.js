"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ClassDetailController", classDetailController);

    function classDetailController($routeParams, $location, ClassService, UserService) {
        var vm = this;
        vm.message = null;
        var classId = $routeParams.classId;
        vm.currentClass = {};
        vm.currentUser = UserService.getCurrentUser();
        // vm.backToList = backToList;
        vm.joinClass = joinClass;
        vm.finishRate = finishRate;
        vm.inClass = false;
        vm.isTeacher = false;

        function init() {
            if (vm.currentUser == null) {
                $location.url("/home");
                return;
            }
            ClassService
                .findClassById(classId)
                .then(function (response) {
                    vm.currentClass = response.data;
                    vm.isTeacher = vm.currentUser.username == vm.currentClass.teacher;
                    vm.inClass = isInClass();
                });
        }
        init();
        
        function finishRate(ind) {
            var finishCount = 0;
            var g = vm.currentClass.performance[ind];
            for (var s in g.students) {
                if (g.finished[s]) {
                    finishCount += 1;
                }
            }
            return finishCount + "/" + g.students.length;
        }

        function isInClass() {
            var res = vm.currentClass.students.indexOf(vm.currentUser.username) > -1;
            return res || vm.currentUser.role == "TEACHER";
        }

        function backToList() {
            $location.url("/classList");
        }

        function joinClass() {
            ClassService.addStudentToClass(vm.currentClass._id, vm.currentUser)
                .then(
                    function(response) {
                        vm.currentClass = response.data;
                    }
                );
        }
    }
})();
