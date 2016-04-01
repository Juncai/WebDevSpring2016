/**
 * Created by juncai on 4/1/16.
 */
module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: Date,
        updated: Date
    }, {collection: 'form'});
    return FormSchema;
};