/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, classModel, schoolModel, userModel) {
    app.get("/api/project/class/:id", findClassById);
    app.post("/api/project/class", createClassForSchool);
    app.post("/api/project/class/:id/user", addStudentToClass);
    app.put("/api/project/class/:classId", updateClass);
    app.delete("/api/project/class/:classId", deleteClass);

    function addStudentToClass(req, res) {
        var id = req.params.id;
        var userObj = req.body;
        classModel.addStudentToClass(id, userObj.username)
            .then(
                function (clazz) {
                    return userModel.addClassForStudent(userObj._id, clazz);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (clazz) {
                    res.json(clazz);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findClassById(req, res) {
        var id = req.params.id;
        classModel.findClassById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createClassForSchool(req, res) {
        var clazzObj = req.body;

        classModel.createClass(clazzObj)
            .then(
                function (clazz) {
                    return userModel.addClassForTeacher(clazz.teacher, clazz);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (clazz) {
                    // schoolId is UNITID
                    return schoolModel.addClassToSchool(clazz.schoolId, clazz);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateClass(req, res) {
        var id = req.params.id;
        var clazz = req.body;
        classModel.updateClass(id, clazz)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteClass(req, res) {
        var id = req.params.id;
        classModel.deleteClass(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};