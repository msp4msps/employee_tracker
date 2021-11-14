const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql2");

//List Initial Questions
const questions = [
  {
    type: "list",
    name: "manage",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add employee",
      "Update Employee Role",
      "View All Departments",
      "View All Roles",
      "Add a department",
      "Add a role",
    ],
  },
];

//Create DB Connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "nross",
    password: "Summ3r1969!1",
    database: "employees_db",
  },
  console.log(`Connected to the employees database.`)
);

//Add Employee
const addEmployee = () => {
  let managers = [];
  let roles = [];
  db.query("SELECT * FROM employee;", function (err, res) {
    res.forEach((result) =>
      managers.push({
        name: result.first_name + " " + result.last_name,
        value: result.id,
      })
    );
  });
  db.query("SELECT * FROM role;", function (err, res) {
    res.forEach((result) =>
      roles.push({
        name: result.title,
        value: result.id,
      })
    );
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee first name?",
        name: "firstname",
      },
      {
        type: "input",
        message: "What is the last name?",
        name: "lastname",
      },
      {
        type: "list",
        name: "manager",
        message: "Who is manager for this employee?",
        choices: managers,
      },
      {
        type: "list",
        name: "role",
        message: "What is the role for this employee?",
        choices: roles,
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstname,
          last_name: res.lastname,
          role_id: res.role,
          manager_id: res.manager,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        }
      );
    });
};

//Update Employee

const updateEmployee = () => {
  let employee = [];
  let roles = [];
  db.query("SELECT * FROM employee;", function (err, res) {
    res.forEach((result) =>
      employee.push({
        name: result.first_name + " " + result.last_name,
        value: result.id,
      })
    );
  });
  db.query("SELECT * FROM role;", function (err, res) {
    res.forEach((result) =>
      roles.push({
        name: result.title,
        value: result.id,
      })
    );
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee first name?",
        name: "firstname",
      },
      {
        type: "list",
        name: "employee",
        message: "Who is employee?",
        choices: employee,
      },
      {
        type: "list",
        name: "role",
        message: "What is the new role for this employee?",
        choices: roles,
      },
    ])
    .then((res) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?;",
        [res.role, res.employee],
        function (err) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        }
      );
    });
};

//Add Role
const addRole = () => {
  let departments = [];
  db.query("SELECT * FROM department;", function (err, res) {
    res.forEach((result) =>
      departments.push({ name: result.name, value: result.id })
    );
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the role salary?",
        name: "salary",
      },
      {
        type: "list",
        name: "department",
        message: "What is the department for this role?",
        choices: departments,
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: res.name,
          salary: res.salary,
          department_id: res.department,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        }
      );
    });
};

//Add a Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name?",
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

///Initialize Inquirer Prompt
const employeeTracker = () => {
  inquirer
    .prompt(questions)
    .then((A1) => {
      //Get all Employees
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
      if (A1.manage === "Add a role") {
        addRole();
      }
      if (A1.manage === "Add employee") {
        addEmployee();
      }
      if (A1.manage === "Update Employee Role") {
        updateEmployee();
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

employeeTracker();
