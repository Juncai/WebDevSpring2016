/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, classModel, schoolModel) {
    app.get("/api/project/class/:id", findClassById);
    app.post("/api/project/class/:unitid", createClassForSchool);
    app.put("/api/project/class/:classId", updateClass);
    app.delete("/api/project/class/:classId", deleteClass);

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
        var unitid = req.params.unitid;
        var clazzObj = req.body;
        schoolModel.findSchoolByUNITID(unitid)
            .then(
                function (school) {
                    clazzObj.school = school;
                    classModel.createClass(clazzObj)
                        .then(
                            function (clazz) {
                                schoolModel.addClassToSchool(school._id, clazz)
                                    .then(
                                        function (doc) {
                                            res.json(doc);
                                        },
                                        function (err) {
                                            res.status(400).send(err);
                                        }
                                    );
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                }, function (err) {
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