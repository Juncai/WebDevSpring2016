"use strict";

var q = require("q");

module.exports = function (db, mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);
    var api = {
        findFormByID: findFormByID,
        findFormsByUserId: findFormsByUserId,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm
    };
    return api;

    function createForm(form) {
        var deferred = q.defer();

        FormModel.create(form, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                FormModel.find({}, function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateForm(id, form) {
        var deferred = q.defer();

        // find the form
        FormModel.update({_id: id}, form, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // resolve promise with form
                FormModel.find({}, function (err, doc) {
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

    function deleteForm(id) {
        var deferred = q.defer();
        FormModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.find({}, function (err, doc) {
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

    function findFormByID(formID) {
        var deferred = q.defer();
        FormModel.findById(formID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.findOne({
            title: title
        }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();

        FormModel.find({
            userId: userId
        }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    // for fields
    function findFieldsByFormId(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function findFieldById(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var f;
                for (f in doc.fields) {
                    if (doc.fields[f] === fieldId) {
                        deferred.resolve(doc.fields[f]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFieldById(formId, fieldId) {
        var deferred = q.defer();

        // find the form
        FormModel.findById(formId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // update form info
                var indToRemove = findIndexById(fieldId, doc.fields);
                if (indToRemove > -1) {
                    doc.fields.splice(indToRemove, 1);
                }

                // save form
                doc.save(function (err, updatedForm) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm.fields);

                    }
                });
            }
        });

        return deferred.promise;
    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();

        // find the form
        FormModel.findById(formId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // update form info
                field._id = mongoose.Types.ObjectId();
                doc.fields.push(field);

                // save form
                doc.save(function (err, updatedForm) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm.fields);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateFieldForForm(formId, fieldId, field) {
        var deferred = q.defer();

        // find the form
        FormModel.findById(formId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // update form info
                var indField = findIndexById(fieldId, doc.fields);
                if (indField > -1) {
                    for (var p in field) {
                        doc.fields[indField][p] = field[p];
                    }
                }

                // save form
                doc.save(function (err, updatedForm) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm.fields);

                    }
                });
            }
        });

        return deferred.promise;
    }

    function findIndexById(id, collection) {
        for (var e in collection) {
            if (collection[e]._id == id) {
                return e;
            }
        }
        return -1;
    }

};