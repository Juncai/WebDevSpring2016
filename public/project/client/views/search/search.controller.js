/**
 *
 * Created by jonca on 3/10/2016.
 */
(function(){
    angular
        .module("QuizZ")
        .controller("SearchController", searchController);

    function searchController($location, SchoolService) {
        var vm = this;
        vm.search = search;
        vm.details = details;
        vm.data = null;

        function init() {

        }
        init();

        function search(school) {
            SchoolService
                .searchSchoolsByName(school.name)
                .success(function(response){
                    vm.data = response.result;
                });
        }

        function details(index) {
            var cSchool = vm.data.records[index];
            SchoolService.createSchool(cSchool);
            //$location.url("/details/" + cSchool.UNITID);
        }
    }
})();
