//Schemas
//We use Schema to define the shape of documents within a collection in a MongoDB
//Schema is a specific to mongoose not part of MongoDB
//Schema Types- String, Number, Date, Bufffer, Boolean, ObjectID and Arrays

 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...')) 
    .catch(err => console.error('Could not connect to MongoDB...', err));

const CourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});