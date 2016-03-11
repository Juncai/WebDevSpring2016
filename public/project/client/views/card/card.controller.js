"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("CardController", cardController);

    function cardController($scope, CardService) {
        var fields = ["_id", "quizID", "question", "answer", "picture"];

        $scope.message = null;
        $scope.create = create;
        $scope.update = update;
        $scope.remove = remove;
        $scope.select = select;
        //$scope.getAttribute = getAttribute;
        $scope.collection = all();
        $scope.fields = fields;
        $scope.newItem = {};

        function create(card) {
            card._id = (new Date).getTime();
            CardService.cards.push(card);
            refreshCollection();
        }

        function all() {
            return CardService.cards;
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

        function updateHelper(id, item) {
            item._id = id;
            var indexToUpdate = find(id);
            if (indexToUpdate > -1) {
                CardService.cards[indexToUpdate] = item;
            }
            refreshCollection();
        }

        function remove(index) {
            var indexToRemove = findIndexById($scope.collection[index]._id);
            if (indexToRemove > -1) {
                CardService.cards.splice(indexToRemove, 1);
            }
            refreshCollection();
        }

        function findIndexById(id) {
            for (var i in CardService.cards) {
                if (CardService.cards[i]._id == id) {
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