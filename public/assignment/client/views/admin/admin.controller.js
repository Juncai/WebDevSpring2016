"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;
        vm.rolesToString = rolesToString;
        vm.sortByUsername = sortByUsername;
        vm.sortByFirstName = sortByFirstName;
        vm.sortByLastName = sortByLastName;
        vm.sortedByUsername = null;
        vm.sortedByFirstName = null;
        vm.sortedByLastName = null;

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

        function sortByUsername() {
            if (vm.sortedByUsername) {
                vm.users.sort(function (a, b) {
                    return a.username.localeCompare(b.username);
                });
                vm.sortedByUsername = false;
            } else {
                vm.users.sort(function (a, b) {
                    return b.username.localeCompare(a.username);
                });
                vm.sortedByUsername = true;
                vm.sortedByFirstName = null;
                vm.sortedByLastName = null;
            }
        }

        function sortByFirstName() {
            if (vm.sortedByFirstName) {
                vm.users.sort(function (a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });
                vm.sortedByFirstName = false;
            } else {
                vm.users.sort(function (a, b) {
                    return b.firstName.localeCompare(a.firstName);
                });
                vm.sortedByFirstName = true;
                vm.sortedByUsername = null;
                vm.sortedByLastName = null;
            }
        }

        function sortByLastName() {
            if (vm.sortedByLastName) {
                vm.users.sort(function (a, b) {
                    return a.lastName.localeCompare(b.lastName);
                });
                vm.sortedByLastName = false;
            } else {
                vm.users.sort(function (a, b) {
                    return b.lastName.localeCompare(a.lastName);
                });
                vm.sortedByLastName = true;
                vm.sortedByUsername = null;
                vm.sortedByFirstName = null;
            }
        }
    }
})();
