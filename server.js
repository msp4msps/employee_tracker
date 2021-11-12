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

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "nross",
    password: "Summ3r1969!1",
    database: "employees_db",
  },
  console.log(`Connected to the employees database.`)
);

// async function main() {
//   console.log("Calling Main");
//   // get the client
//   const mysql = require("mysql2/promise");
//   // create the connection
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "nross",
//     password: "Summ3r1969!1",
//     database: "employees_db",
//   });
//   console.log("gtetCalling Main");
//   // query database
//   const data = await connection.execute("SELECT * FROM employee;");
//   console.log(data);
// }

const employeeTracker = () => {
  inquirer
    .prompt(questions)
    .then((A1) => {
      if (A1.manage === "View All Employees") {
        console.log("Hello babyyyyyyyyyyy");
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
        });
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

employeeTracker();
