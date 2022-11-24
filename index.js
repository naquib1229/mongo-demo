//Pagination

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

// async function createCourse() {
//     const course = new Course({
//     name: 'Angular course',
//     author: 'Mosh',
//     tags: ['Angular', 'frontend'],
//     isPublished: true
// });

// const result =  await course.save();
// console.log(result);
// }

//createCourse();

async function getCourse() {
    const pageNumber = 2;
    const pageSize =10;
    
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .skip((pageNumber -1)*pageSize)
        .limit(pageSize)
        .sort({name: 1})            
        .count();
    console.log(courses);
}

getCourse();