/**
 * Created by jonca on 3/16/2016.
 * Use clazz instead of class to avoid keyword conflicts
 */
var mock = require("./class.mock.json");
var uuid = require('node-uuid');
module.exports = function () {
    var api = {
        findClassByID: findClassByID,
        findClassesBySchoolId: findClassesBySchoolId,
        findClassesByStudentId: findClassesByStudentId,
        createClass: createClass,
        updateClass: updateClass,
        deleteClass: deleteClass,
        //findClassByName: findClassByName,
        //findStudentsByClassId: findStudentsByClassId,
        //deleteStudentById: deleteStudentById,
        addStudentToClass: addStudentToClass
    };
    return api;

    function createClass(clazz) {
        // sanity check for class name
        var name = clazz.name;
        var schoolId = clazz.schoolId;
        var cClasses = findClassesBySchoolId(schoolId);
        for (var c in cClasses) {
            if (cClasses[c].name == name) {
                return null;
            }
        }
        clazz._id = uuid.v1();
        mock.push(clazz);
        return mock;
    }

    function updateClass(id, clazz) {
        var i = findIndexById(mock, id);
        if (i > -1) {
            for (var p in clazz) {
                mock[i][p] = clazz[p];
            }
        }
        return mock;
    }

    function deleteClass(id) {
        // TODO also delete classes in the user side
        var indexToRemove = findIndexById(mock, id);
        if (indexToRemove > -1) {
            mock.splice(indexToRemove, 1);
        }
        return mock;
    }

    function findIndexById(collection, id) {
        for (var i in collection) {
            if (collection[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

    function findClassByID(clazzID) {
        for (var m in mock) {
            if (mock[m]._id === clazzID) {
                return mock[m];
            }
        }
        return null;
    }

    //function findClassByTitle(title) {
    //    for (var m in mock) {
    //        if (mock[m].title === title) {
    //            return mock[m];
    //        }
    //    }
    //    return null;
    //}
    function findClassesBySchoolId(schoolId) {
        var studentClasses = [];
        for (var m in mock) {
            if (mock[m].schoolId == schoolId) {
                studentClasses.push(mock[m]);
            }
        }
        return studentClasses;
    }

    function findClassesByStudentId(studentId) {
        var studentClasses = [];
        for (var m in mock) {
            if (mock[m].students.indexOf(studentId) > -1) {
                studentClasses.push(mock[m]);
            }
        }
        return studentClasses;
    }

    // for students
    function findStudentsByClassId(clazzId) {
        var clazz = findClassByID(classId);
        if (clazz) {
            return clazz.students;
        }
        return [];
    }

    function deleteStudentById(clazzId, studentId) {
        var clazz = findClassByID(classId);
        var indexToRemove = findIndexById(clazz.students, studentId);
        if (indexToRemove > -1) {
            clazz.students.splice(indexToRemove, 1);
            var indClass = findIndexById(mock, clazz._id);
            mock[indClass] = clazz;
        }
        return clazz.students;
    }

    function addStudentToClass(clazzId, student) {
        var clazz = findClassByID(classId);
        student._id = uuid.v1();
        clazz.students.push(student);
        var indClass = findIndexById(mock, clazz._id);
        mock[indClass] = clazz;
        return clazz.students;
    }

    function updateStudentForClass(clazzId, studentId, student) {
        var clazz = findClassByID(classId);
        var indStudent = findIndexById(clazz.students, studentId);
        for (var p in student) {
            clazz.students[indStudent][p] = student[p];
        }
        var indClass = findIndexById(mock, clazz._id);
        mock[indClass] = clazz;
        return clazz.students;
    }
};