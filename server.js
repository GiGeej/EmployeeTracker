const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Wassie098",
  database: "employees_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`);
  startApp();
});

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;

        case "Exit":
          console.log("Exiting the application.");
          db.end();
          break;

        default:
          console.log("Invalid option. Please try again.");
          startApp();
      }
    });
}

function viewAllDepartments() {
  const query = "SELECT id, name FROM department";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

function viewAllRoles() {
  const query = "SELECT id, title, salary, department_id FROM roles";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

function viewAllEmployees() {
  const query =
    "SELECT id, first_name, last_name, title, department_id, salary, manager_id FROM employee";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO department (name) VALUES (?)";
      db.query(query, [answer.departmentName], (err, results) => {
        if (err) throw err;
        console.log("Department added successfully!");
        startApp();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the role:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answer) => {
      const query =
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
      db.query(
        query,
        [answer.roleTitle, answer.roleSalary, answer.departmentId],
        (err, results) => {
          if (err) throw err;
          console.log("Role added successfully!");
          startApp();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for the employee:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID for the employee:",
      },
    ])
    .then((answer) => {
      const query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
        (err, results) => {
          if (err) throw err;
          console.log("Employee added successfully!");
          startApp();
        }
      );
    });
}

function updateEmployeeRole() {
  // Fetch employee data to display for selection
  const query = "SELECT id, first_name, last_name FROM employee";
  db.query(query, (err, employees) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: "input",
          name: "newRoleId",
          message: "Enter the new role ID for the employee:",
        },
      ])
      .then((answer) => {
        const updateQuery = "UPDATE employee SET role_id = ? WHERE id = ?";
        db.query(
          updateQuery,
          [answer.newRoleId, answer.employeeId],
          (err, results) => {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            startApp();
          }
        );
      });
  });
}

// Exporting the startApp function to be used in other modules if needed
module.exports = startApp;
