/**
 * Created by jonca on 3/10/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("SearchService", searchService);

    function searchService($http) {

        var searchQueryString = "https://inventory.data.gov/api/action/datastore_search" +
            "?resource_id=38625c3d-5388-4c16-a30f-d105432553a4&q=";
        var findQueryString = "https://inventory.data.gov/api/action/datastore_search" +
            "?resource_id=38625c3d-5388-4c16-a30f-d105432553a4&limit=1&q=UNITID:";
        var api = {
            schools: {},
            searchSchoolsByName: searchSchoolsByName,
            findSchoolByID: findSchoolByID
        };
        return api;

        function findSchoolByID(schoolID) {
            // TODO find school in the database instead
            return $http.jsonp(findQueryString + schoolID + "&callback=JSON_CALLBACK");
        }

        function searchSchoolsByName(name) {
            return $http.jsonp(searchQueryString + name + "&callback=JSON_CALLBACK");
            //return $http.jsonp(searchQueryString + "&callback=JSON_CALLBACK");
            //return $http.jsonp(queryURL + "&callback=JSON_CALLBACK", {data: data});
        }
    }
})();
