"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("UserController", userController);

    function userController($scope, UserService) {
        var fields = ["_id", "firstName", "lastname", "username", "password", "email", "birthdate", "role"];

        $scope.message = null;
        $scope.create = create;
        $scope.update = update;
        $scope.remove = remove;
        $scope.select = select;
        //$scope.getAttribute = getAttribute;
        $scope.collection = all();
        $scope.fields = fields;
        $scope.newItem = {};

        function create(user) {
            user._id = (new Date).getTime();
            UserService.users.push(user);
            refreshCollection();
        }

        function all() {
            return UserService.users;
        }

        function update() {
            if ($scope.selectedItem) {
                updateHelper($scope.selectedItem._id, $scope.newItem);
                $scope.selectedItem = null;
            }
        }

        function select(index) {
            $scope.selectedItem = $scope.collection[index];
            prepareNewItem();
        }

        function updateHelper(id, user) {
            user._id = id;
            var indexToUpdate = find(id);
            if (indexToUpdate > -1) {
                UserService.users[indexToUpdate] = user;
            }
            refreshCollection();
        }

        function remove(index) {
            var indexToRemove = findIndexById($scope.collection[index]._id);
            if (indexToRemove > -1) {
                UserService.users.splice(indexToRemove, 1);
            }
            refreshCollection();
        }

        function findIndexById(id) {
            for (var i in UserService.users) {
                if (UserService.users[i]._id == id) {
                    return i;
                }
            }
            return -1;
        }

        function refreshCollection() {
            $scope.collection = all();
        }

        function prepareNewItem() {
            for (var f in fields) {
                $scope.newItem[fields[f]] = $scope.selectedItem[fields[f]];
            }
        }

        //function getAttribute(field) {
        //    return $scope.newItem[field];
        //}
    }
})();