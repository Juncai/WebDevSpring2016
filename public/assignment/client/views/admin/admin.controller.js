"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($location, UserService) {
        var vm = this;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;
        vm.sortUser = sortUser;
        vm.rolesToString = rolesToString;
        // vm.newUser = {}
        vm.users = [];
        function init() {
            UserService
                .findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                })
        }

        init();

        function addUser(user) {
            user.roles = stringToRoles(user.roles);
            UserService
                .createUser(user)
                .then(function (response) {
                    vm.users = response.data;
                });
        }

        function updateUser() {
            if (vm.newUser._id != null) {
                UserService
                    .updateUserAdmin(vm.newUser._id, vm.newUser)
                    .then(function (response) {
                        vm.users = response.data;
                        vm.newUser = {};
                    });
            }
        }

        function deleteUser(index) {
            var userToDelete = vm.users[index];
            UserService
                .deleteUserById(userToDelete._id)
                .then(function (response) {
                    vm.users = response.data;
                });
        }

        function editUser(index) {
            vm.newUser = vm.users[index];
            // vm.selectedUser = vm.users[index];
            // vm.newUser.title = vm.selectedUser.title;
        }
        
        function rolesToString(roles) {
            var rolesStr = ""
            for (var r in roles) {
                if (r != 0) {
                    rolesStr += ",";
                }
                rolesStr += roles[r];
            }
            return rolesStr;
        }

        function stringToRoles(rStr) {
            return rStr.split(',');
        }
        
        function sortUser(start, end) {
            UserService
                .sortPage(vm.applicationId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
