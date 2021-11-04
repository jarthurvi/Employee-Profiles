const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs');
const path = require("path");

const team = [];
const output_dir = path.resolve(__dirname, "ouput");
const outputPath = path.join(output_dir, "team.html");
const render = require("./src/template.js");


function init() {

  function createManager() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: 'What is the team managers name?',
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'What is the team managers id?',
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: 'What is the team managers email?',
        },
        {
          type: 'input',
          name: 'managerNumber',
          message: 'What is the team managers office number?',
        }

      ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerNumber)
        team.push(manager)
        console.log(team)
        buildTeam()
      })
  }

  function buildTeam() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which type of teammate would you like to add?',
        name: 'teammate',
        choices: ['Engineer', 'Intern', 'Manager', "I dont want to add anymore members"],
      }
    ]).then(answer => {
      let userChoice = answer.teammate;
      if (userChoice === "Manager") {
        createManager();
      } else if (userChoice === "Engineer") {
        createEngineer();
      } else if (userChoice === "Intern") {
        createIntern()
      } else {
        // render to html function
        renderTeam()
      }
    })
  }

  function createEngineer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: "What is the engineer's name?",
        },
        {
          type: 'input',
          name: 'engineerId',
          message: "What is the engineer's id?",
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: "What is the engineer's email?",
        },
        {
          type: 'input',
          name: 'Github',
          message: " What is the engineer's Github?",
        }
      ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.Github)
        team.push(engineer)
        console.log(team)
        buildTeam()
      })

      
  }
  function createIntern() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "What is the intern's name?",
        },
        {
          type: 'input',
          name: 'internId',
          message: "What is the intern's id?",
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "What is the intern's email?",
        },
        {
          type: 'input',
          name: 'SchoolName',
          message: " What is the intern's school?",
        }
      ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.SchoolName)
        team.push(intern)
        console.log(team)
        buildTeam()
      })
}
function buildTeam(){
  if(!fs.existsSync(output_dir)){
    fs.mkdirSync(output_dir)
  }
  fs.writeFileSync(outputPath, render(team), 'utf-8')
}
createManager();

}
init();

