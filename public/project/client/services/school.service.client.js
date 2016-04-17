/**
 * Created by jonca on 3/10/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("SchoolService", schoolService);

    function schoolService($http) {

        var searchQueryString = "https://inventory.data.gov/api/action/datastore_search" +
            "?resource_id=38625c3d-5388-4c16-a30f-d105432553a4&q=";
        var findQueryString = "https://inventory.data.gov/api/action/datastore_search" +
            "?resource_id=38625c3d-5388-4c16-a30f-d105432553a4&limit=1&q=UNITID:";
        var model = {
            // app.delete("/api/project/school/:id", deleteSchool);

            // schools: schools,
            searchSchoolsByName: searchSchoolsByName,
            findSchoolById: findSchoolById,
            findSchoolByUNITID: findSchoolByUNITID,
            createSchool: createSchool,
            updateSchool: updateSchool
        };
        return model;

        function findSchoolById(schoolId) {
            return $http.get("/api/project/school/" + schoolId);
        }
       
        function findSchoolByUNITID(unitid) {
            return $http.get("/api/project/school/unitid/" + unitid);
        }

        function createSchool(school) {
            return $http.post("/api/project/school", school);
        }

        function updateSchool(schoolId, school) {
            return $http.put("/api/project/school/" + schoolId, school);
        }

        function searchSchoolsByName(name) {
            return $http.jsonp(searchQueryString + name + "&callback=JSON_CALLBACK");
            //return $http.jsonp(searchQueryString + "&callback=JSON_CALLBACK");
            //return $http.jsonp(queryURL + "&callback=JSON_CALLBACK", {data: data});
        }
    }
})();
