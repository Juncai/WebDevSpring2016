/**
 * Created by jonca on 3/16/2016.
 * Use clazz instead of class to avoid keyword conflicts
 */
module.exports = function (mongoose) {
    var ClassSchema = require("./class.schema.server.js")(mongoose);
    var ClassModel = mongoose.model('Class', ClassSchema);
    var api = {
        findClassById: findClassById,
        createClass: createClass,
        updateClass: updateClass,
        deleteClass: deleteClass,
        addStudentToClass: addStudentToClass
    };
    return api;

    function createClass(clazz) {
        var deferred = q.defer();
        ClassModel.create(clazz, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findClassById(classId) {
        var deferred = q.defer();
        ClassModel.findById(classId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateClass(id, clazz) {
        var deferred = q.defer();

        delete clazz._id;
        ClassModel.update({_id: id}, clazz, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteClass(id) {
        var deferred = q.defer();
        ClassModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                ClassModel.find({}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function addStudentToClass(id, student) {
        var deferred = q.defer();
        ClassModel.findOne({_id: id}, function (err, clazz) {
            if (err) {
                deferred.reject(err);
            } else {
                // TODO purse student
                clazz.students.push(student);
                delete clazz._id;
                ClassModel.update({_id: id}, clazz, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

};