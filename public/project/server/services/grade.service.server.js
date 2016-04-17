/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, userModel, classModel) {
    app.put("/api/project/grade/:gradeId/user/:userId", finishQuizPractice);
    app.put("/api/project/grade/:gradeId/class/:classId/user/:userId", finishClassQuiz);
    

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
    
    function finishClassQuiz(req, res) {
        var gradeId = req.params.gradeId;
        var classId = req.params.classId;
        var userId = req.params.userId;
        var gradeObj = req.body;
        userModel.updateGradeToClass(userId, classId, gradeId, gradeObj)
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