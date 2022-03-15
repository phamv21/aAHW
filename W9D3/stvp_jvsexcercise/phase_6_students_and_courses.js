function Student(fname,lname) {
    this.firstName = fname;
    this.lastName = lname;
    this.courses = [];
}

//helper method for enroll check
Student.prototype.hasConflict = function(course){
    let result = false;
    this.courses.forEach((el)=>{
        if(el.conflictsWith(course)){result = true}
    })

    return result;
}

Student.prototype.enroll = function(course){
    //check there is confict course
    if(this,this.hasConflict(course)){return console.log('has conflict')}
    if((this.courses.findIndex((el)=>el===course)===-1))
    {this.courses.push(course);
    course.addStudent(this);
    }
}


function Course(name, department, numOfCredit, days, block){
    this.name  = name;
    this.department = department;
    this.numOfCredit = numOfCredit;
    this.students = [];
    this.scheduleDays = days; //like ['tue'..]
    this.scheduleBlock = block; // from 1-8 
}

Course.prototype.addStudent = function(student){
    if ((this.students.findIndex((el) => el === student))===-1 ) {
        this.students.push(student);
    }
}

//helper method to check overlap arrs
function checkOverlap(ar1, ar2) {
    let result = false
    ar1.forEach((el) => {

        if (ar2.includes(el)) {
            result = true
        }
    })
    return result;
}

Course.prototype.conflictsWith = function(secondCourse){
    let result = false;
    if(this.scheduleBlock === secondCourse.scheduleBlock){
        if(checkOverlap(this.scheduleDays,secondCourse.scheduleDays)){
            result = true;
        }
    }
    return result;
}

let steve = new Student('pham','vu');
let physic = new Course('physic','science',3,['mon','tue'],2);
let math = new Course('math', 'science', 3, ['wed', 'thurs'], 2);
steve.enroll(physic);
console.log(steve);
console.log(physic);
console.log(physic.conflictsWith(math));
steve.enroll(math);
steve.enroll(physic);
console.log(steve);
