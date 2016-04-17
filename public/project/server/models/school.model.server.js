/**
 * Created by jonca on 3/16/2016.
 * Use clazz instead of class to avoid keyword conflicts
 */
module.exports = function (mongoose) {
    var SchoolSchema = require("./school.schema.server.js")(mongoose);
    var SchoolModel = mongoose.model('School', SchoolSchema);
    var api = {
        findSchoolById: findSchoolById,
        findSchoolByUNITID: findSchoolByUNITID,
        createSchool: createSchool,
        updateSchool: updateSchool,
        deleteSchool: deleteSchool,
        addClassToSchool: addClassToSchool
    };
    return api;
    function createSchool(school) {
        var deferred = q.defer();

        SchoolModel.findOne({UNITID: school.UNITID},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(doc);
                } else {
                    SchoolModel.create(school, function (err, newSchool) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            deferred.resolve(newSchool);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findSchoolById(schoolId) {
        var deferred = q.defer();

        SchoolModel.findOne({_id: schoolId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findSchoolByUNITID(unitid) {
        var deferred = q.defer();

        SchoolModel.findOne({UNITID: unitid},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function updateSchool(id, school) {
        var deferred = q.defer();

        delete school._id;
        SchoolModel.update({_id: id}, school, function (err, doc) {

            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteSchool(id) {
        var deferred = q.defer();
        SchoolModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                SchoolModel.find({}, function (err, doc) {
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

    function addClassToSchool(id, clazz) {
        var deferred = q.defer();

        SchoolModel.findOne({_id: id},
            function (err, school) {
                if (err) {
                    deferred.reject(err);
                } else {
                    school.classes.push(clazz);
                    school.save();
                    deferred.resolve(school);
                }
            });

        return deferred.promise;
    }
};