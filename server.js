const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql2");

const questions = [
  {
    type: "list",
    name: "manage",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role"],
  },
];

const employeeTracker = () => {
  inquirer
    .prompt(questions)
    .then((A1) => {
      if (A1.manage === "View All Employees") {
        console.log("Hello babyyyyyyyyyyy");
        employeeTracker();
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

employeeTracker();
