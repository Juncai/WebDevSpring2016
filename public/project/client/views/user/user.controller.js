"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("UserController", userController);

    function userController($scope) {
        var fields = ["_id", "firstName", "lastname", "username", "password", "email", "birthdate", "role"];
        var model = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland", "birthdate": "2000-10-5",
                "username": "alice", "password": "alice", "role": "Student", "email": "abc@gmail.com",
                "followed": [234, 345], "following": [345, 456]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope", "birthdate": "2000-10-5",
                "username": "bob", "password": "bob", "role": "Student", "email": "abc@gmail.com",
                "followed": [123, 345], "following": [345, 456]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown", "birthdate": "2000-10-5",
                "username": "charlie", "password": "charlie", "role": "Teacher", "email": "abc@gmail.com",
                "followed": [123, 234], "following": [123, 234]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig", "birthdate": "2000-10-5",
                "username": "dan", "password": "dan", "role": "Teacher", "email": "abc@gmail.com",
                "followed": [123, 234], "following": []
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton", "birthdate": "2000-10-5",
                "username": "ed", "password": "ed", "role": "Student", "email": "abc@gmail.com",
                "followed": [], "following": []
            }
        ];
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
            model.push(newUser);
            refreshCollection();
        }

        function all() {
            return model;
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
                model[indexToUpdate] = user;
            }
            refreshCollection();
        }

        function remove(index) {
            var indexToRemove = findIndexById($scope.collection[index]._id);
            if (indexToRemove > -1) {
                model.splice(indexToRemove, 1);
            }
            refreshCollection();
        }

        function findIndexById(id) {
            for (var i in model) {
                if (model[i]._id == id) {
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