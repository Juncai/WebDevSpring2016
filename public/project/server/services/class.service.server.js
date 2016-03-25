/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, classModel, userModel, quizModel) {
    // TODO also manipulate the classes in other models
    app.get("/api/project/user/:userId/class", findClassesForUser);
    app.get("/api/project/school/:schoolId/class", findClassesForSchool);
    app.get("/api/project/class/:classId", findClassById);
    app.delete("/api/project/class/:classId", deleteClass);
    app.post("/api/project/user/:userId/class", addClassForUser);
    app.put("/api/project/class/:classId", updateClass);

    function findClassesForUser(req, res) {
        var userId = req.params.userId;
        res.json(classModel.findClassesByStudentId(userId));
    }

    function findClassesForSchool(req, res) {
        var schoolId = req.params.schoolId;
        res.json(classModel.findClassesBySchoolId(schoolId));
    }

    function findClassById(req, res) {
        var classId = req.params.classId;
        res.json(classModel.findClassByID(classId));
    }

    function deleteClass(req, res) {
        var classId = req.params.classId;
        res.json(classModel.deleteClass(classId));
    }

    function addClassForUser(req, res) {
        var userId = req.params.userId;
        var clazz = req.body;
        clazz.students = [userId];
        res.json(classModel.createClass(clazz));
    }

    function updateClass(req, res) {
        var classId = req.params.classId;
        var clazz = req.body;
        res.json(classModel.updateClass(classId, clazz));
    }
};