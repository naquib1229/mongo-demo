//SchemaType Options

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
      enum: ['web', 'mobile', 'network'],
      lowercase: true, //uppercase: true
      trim: true
   },
   author: String,
   tags: {
      type: Array,
      validate: {
         validator: (v) => v && v.length > 0,
         message: 'A course should have at least one tag.'
      }
   },
   date: {type: Date, default: Date.now},
   isPublished: Boolean,
   price:  {
      type: Number,
      required: function() { return this. isPublished;}, //here we can't use arrow function
      min: 10,
      max: 200,
      get: v => Math.round(v),
      set: v => Math.round(v)
     }
});

const Course = mongoose.model('Course', courseSchema); //model return class

async function createCourse() {
   const course = new Course( {
     name: 'Angular course',
     category: 'Web',
     author: 'Mosh',
     tags: ['frontend'],   //if null, cannot read property 'lenght' of null
     isPublished: true,
     price: 15.8
   })
   try{
      //await course.validate(); //retuns promise or void
      const result = await course.save();
      console.log(result);  
   }
   catch(ex){
      for(field in ex.errors)
         console.log(ex.errors[field].message);
   }
   
 }

 async function getCourses() {
   const pageNumber = 2;
   const pageSize = 10;

   const courses = await Course
      .find({ _id: '6382c1b834128af8f1b1e451'})
      // .skip((pageNumber - 1) * pageSize)
      // .limit(pageSize)
      .sort({name : 1})
      .select( { name: 1, tags: 1, price: 1}); //NaN if price was not included
    console.log(courses[0].price);  

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

getCourses();


