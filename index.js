//Removing Documents

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
    
    const  course = await Course.findByIdAndUpdate( id, {
       $set: {
      author: 'jason',
      isPublished: false
    }}, { new: true });

    console.log(course);

}

async function removeCourse(id){
   //const result = await Course.deleteOne( { _id: id } ); //deleteMany for multiple deletion
   const course = await Course.findByIdAndRemove(id);
   console.log(course);
}

removeCourse('637b28910bf936cd8edbcccd');


