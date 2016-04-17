/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, schoolModel) {
    app.get("/api/project/school/:id", findSchoolById);
    app.get("/api/project/school/unitid/:unitid", findSchoolByUNITID);
    app.post("/api/project/school", createSchool);
    app.put("/api/project/school/:id", updateSchool);
    app.delete("/api/project/school/:id", deleteSchool);
    app.post("/api/project/school/:schoolId/class", addClassToSchool);

    function findSchoolById(req, res) {
        var id = req.params.id;
        schoolModel.findSchoolById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findSchoolByUNITID(req, res) {
        var unitid = req.params.unitid;
        schoolModel.findSchoolByUNITID(unitid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteSchool(req, res) {
        var id = req.params.id;
        schoolModel.deleteSchool(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createSchool(req, res) {
        var school = req.body;
        schoolModel.createSchool(school)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateSchool(req, res) {
        var id = req.params.id;
        var school = req.body;
        schoolModel.updateSchool(id, school)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // for class
    function addClassToSchool(req, res) {
        var id = req.params.schoolId;
        var clazz = req.body;
        schoolModel.addClassToSchool(id, clazz)
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