//Updating a Documents- Update First
//Starting in MongoDB 5.0, update operators process document fields with string-based names in lexicographic order. 
//Fields with numeric names are processed in numeric order.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...')) 
   .catch(err => console.error('Could not connect to MongoDB...', err));
   
const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   date: {type: Date, default: Date.now},
   isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); //model return class

async function updateCourse(id){
    
    const  result = await Course.updateOne( { _id: id }, {
       $set: {
      author: 'Mosh',
      isPublished: false
    }});

    console.log(result);

}

updateCourse('637b28910bf936cd8edbcccd');


//collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.