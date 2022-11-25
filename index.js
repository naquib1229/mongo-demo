//Validation
//this validation implemented here is only meaningful in Mongoose and not MongoDB like SQL DB.
//Joi vs mongoose validation, we should use both Joi insures in RESTapi that user doesn't entered wrong data, here mongoose ensures after that any flaw not entered by mistake.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...')) 
   .catch(err => console.error('Could not connect to MongoDB...', err));
   
const courseSchema = new mongoose.Schema({
   name: {type: String, required: true},
   author: String,
   tags: [String],
   date: {type: Date, default: Date.now},
   isPublished: Boolean,
   price: Number
});

const Course = mongoose.model('Course', courseSchema); //model return class

async function createCourse() {
   const course = new Course( {
     //name: 'Angular course',
     author: 'Mosh',
     tags: ['angular', 'frontend'],
     isPublished: true,
     price: 15
   })
   try{
      //await course.validate();
      const result = await course.save();
      console.log(result);  
   }
   catch(ex){
      console.log(ex.message);
   }
   
 }

 
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

createCourse();


