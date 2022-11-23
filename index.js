//Comparison Query Operators

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
    //eq (equal to)
    //ne (not equal to)
    //gt (greater than)
    //gte (greater than equal to)
    //lt (less than)
    //lte (less than equal to)
    //in
    //nin (not in)

    const courses = await Course
        //.find({author: 'Mosh', isPublished: true})
        //.find({price: {$gt: 10}}) // for price greater than 10
        //.find({price: {$gte: 10, $lte: 20}}) // for price greater than equal to 10 and less than equal to 20
        .find({price: {$in: [10,15,20]}})   //for price either equal to 10 or 15 or 20
        .limit(10)
        .sort({name: 1})            
        .select({name: 1, tags: 1})
    console.log(courses);
}

getCourse();