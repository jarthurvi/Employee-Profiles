const Employee = require("./Employee");
class Intern extends Employee {
    constructor(name,id,email, SchoolName) {
        super(name, id, email)
       this.SchoolName = SchoolName;
    }
   
    getSchool(){
        return this.SchoolName;
    }
   getRole(){
       return "Intern";
   }
}

module.exports = Intern;
