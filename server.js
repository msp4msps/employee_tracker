const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql2");

const questions = [
  {
    type: "list",
    name: "manage",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Departments",
      "View All Roles",
      "Add a department",
    ],
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

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name",
        name: "department",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO department SET ?",
        { name: res.department },
        function (err) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        }
      );
    });
};

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
        db.query(
          "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
          function (err, results) {
            console.table(results);
            console.log(err);
            employeeTracker();
          }
        );
      }
      if (A1.manage === "View All Departments") {
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          employeeTracker();
        });
      }
      if (A1.manage === "View All Roles") {
        db.query(
          "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON department.id = role.department_id",
          function (err, results) {
            console.table(results);
            employeeTracker();
          }
        );
      }
      if (A1.manage === "Add a department") {
        addDepartment();
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

employeeTracker();
