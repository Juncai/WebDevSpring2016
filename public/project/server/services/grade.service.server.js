/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, userModel, classModel) {
    app.delete("/api/project/grade/:gradeId/user/:id", deleteGradeForUser);
    app.get("/api/project/grade/:gradeId/user/:id", findGradeForUser);
    app.get("/api/project/grade/:quizId/class/:classId/user/:userId", findGradeInClassForUser);
    app.put("/api/project/grade/:gradeId/user/:userId", finishQuizPractice);
    app.put("/api/project/grade/:quizId/class/:classId/user/:userId", finishClassQuiz);

    function deleteGradeForUser(req, res) {
        var id = req.params.id;
        var gradeId = req.params.gradeId;
        userModel.deleteQuizById(id, gradeId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findGradeForUser(req, res) {
        var id = req.params.id;
        var gradeId = req.params.gradeId;
        userModel.findQuizById(id, gradeId)
            .then(
                function (grade) {
                    res.json(grade);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function finishQuizPractice(req, res) {
        var gradeId = req.params.gradeId;
        var userId = req.params.userId;
        var gradeObj = req.body;
        userModel.updateQuizForUser(userId, gradeId, gradeObj)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findGradeInClassForUser(req, res) {
        var classId = req.params.classId;
        var userId = req.params.userId;
        var quizId = req.params.quizId;
        userModel.findGradeInClassByQuizId(userId, classId, quizId)
            .then(
                function (grade) {
                    res.json(grade);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function finishClassQuiz(req, res) {
        var quizId = req.params.quizId;
        var classId = req.params.classId;
        var userId = req.params.userId;
        var gradeObj = req.body;
        userModel.updateGradeToClass(userId, classId, quizId, gradeObj)
            .then(
                function (grade) {
                    if (grade != null) {
                        return classModel.updateStudentGrade(classId, grade.quizId, grade);
                    } else {
                        res.json(null);
                    }
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
            )
    }
};