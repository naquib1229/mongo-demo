//Updating Documents- Query First

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
    // Approach: Query first
    // findById()
    const course = await Course.findById(id);
    if(!course) return;

    // Modify its properties
    course.isPublished = true;
    course.author = 'Another Author'

    // course.set( {
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    // save()
    const result = await course.save();
    console.log(result);

}

updateCourse('637b28910bf936cd8edbcccd');
