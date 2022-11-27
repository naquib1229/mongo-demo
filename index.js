//Async Validators
//Now sometimes the validation logic may evolve ridding something from a database or from a remote http service.
//So, we don't have the answer straight away. In that case we need an asynce validator.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(() => console.log('Connected to MongoDB...')) 
   .catch(err => console.error('Could not connect to MongoDB...', err));
   
const courseSchema = new mongoose.Schema({
   name: {
      type: String, 
      required: true,
      minlength: 5,
      maxlength: 255,
      // match: /pattern/
   },
   category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network']
   },
   author: String,
   tags: {
      type: Array,
      validate: {
         isAsync: true,
         validator: function(v, callback) {
            setTimeout(() => {
               //Do some async work
               const result = v && v.length > 0;
               callback(result); // Error- callback is not a function          
            }, 4000);     
      } ,
         message: 'A course should have at least one tag.'
      }
   },
   date: {type: Date, default: Date.now},
   isPublished: Boolean,
   price:  {
      type: Number,
      required: function() { return this. isPublished;}, //here we can't use arrow function
      min: 10,
      max: 200
     }
});

const Course = mongoose.model('Course', courseSchema); //model return class

async function createCourse() {
   const course = new Course( {
     name: 'Angular course',
     category: 'web',
     author: 'Mosh',
     tags: null,   //if null, cannot read property 'lenght' of null
     isPublished: true,
     price: 15
   })
   try{
      //await course.validate(); //retuns promise or void
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


