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
        vm.currentClass = null;
        vm.currentUser = UserService.getCurrentUser();
        vm.backToList = backToList;
        vm.joinClass = joinClass;

        function init() {
            if (vm.currentUser == null) {
                $location.url("#/home");
            }
            ClassService
                .findClassById(classId)
                .then(function (response) {
                    vm.currentClass = response.data;
                });

        }
        init();


        function backToList() {
            $location.url("/classList");
        }

        function joinClass() {
            $location.url("/classDetail");
        }
    }
})();
