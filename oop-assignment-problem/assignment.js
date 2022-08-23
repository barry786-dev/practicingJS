class Course {
    #price;
    constructor(CourseTitle , CourseLength, CoursePrice) {
        this.title = CourseTitle;
        this.length = CourseLength;
        this.#setPrice = CoursePrice;
    }
    set #setPrice(value) {
        if (value < 0) {
            throw 'Invalid value for price';
        }
        this.#price = value;
    }
    get price() {
        return `\$${this.#price}`;
    }
    calculateValue() {
        return this.length / this.#price;
    }
    courseSummarize() {
        console.log(
          `The course ${this.title} is ${this.length} long and costs ${this.price}`
        );
    }
} 
const course1 = new Course('JavaScript', 2, 100);
const course2 = new Course('React', 3, 200);
console.log(course1);
console.log(course2);
//#####
console.log(course1.calculateValue());
console.log(course2.calculateValue());
course1.courseSummarize();
course2.courseSummarize();
//#####

class PracticalCourse extends Course {
    constructor(title, length, price, exercises) {
        super(title, length, price);
        this.NumOfExercises = exercises;
    }
}
const course3 = new PracticalCourse('Angular', 3, 100, 10);
course3.courseSummarize();
console.log(course3.NumOfExercises);

class TheoreticalCourse extends Course {
  /*   constructor(title, length, price) {
        super(title, length, price);
    } */
    publish() {
        console.log('Publishing');
    }
}
const course4 = new TheoreticalCourse('Flutter', 4, 250);
course4.courseSummarize();
course4.publish();
//course4.#setPrice = 10;
console.log(course4);
course4.courseSummarize();