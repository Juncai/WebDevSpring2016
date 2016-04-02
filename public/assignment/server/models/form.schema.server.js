/**
 * Created by juncai on 4/1/16.
 */
module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: { type: String, default: 'New Form' },
        fields: [FieldSchema],
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }, {collection: 'form'});
    return FormSchema;
};