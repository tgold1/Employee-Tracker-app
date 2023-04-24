const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const promptMessages = {
    viewALLDepartments: "View all departments",
    viewAllRoles: "View all roles",
    viewAllemployees: "View all employees",
    addaDepartment: "Add a department",
    addaRole: "Add a role",
    addanEmployee: "Add an employee",
    updateanEmployeeRole: "Update an employee role",
    quit: "Quit"
};

const connection = mysql.createConnection({
    host: 'localhost',

    
    port: 3306,

    
    user: 'root',

    
    password: 'Phillies',
    database: 'employees_db'
});

connection.connect(err => {
    if (err) throw err;
    prompt();
});

function prompt() {
    inquirer
        .prompt({
            name: 'options',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                promptMessages.viewALLDepartments,
                promptMessages.viewAllRoles,
                promptMessages.viewAllemployees,
                promptMessages.addaDepartment,
                promptMessages.addaRole,
                promptMessages.addanEmployee,
                promptMessages.updateanEmployeeRole,
                promptMessages.quit
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            switch (answer.options) {
                case promptMessages.viewALLDepartments:
                    viewALLDepartments();
                    break;
                
                case promptMessages.viewAllRoles:
                    viewAllRoles();
                    break;

                case promptMessages.viewAllemployees:
                    viewAllemployees();
                    break;
                
                case promptMessages.addaDepartment:
                    addaDepartment();
                    break;

                case promptMessages.addaRole:
                    addaRole();
                    break;
                
                case promptMessages.addanEmployee:
                    addanEmployee();
                    break;

                case promptMessages.updateanEmployeeRole:
                    updateanEmployeeRole();
                    break;

                case promptMessages.quit:
                    connection.end();
                    break;
            }
        });
}

function viewALLDepartments () {
   const query = `SELECT name AS Department, id AS "Department Id" FROM department`;
   connection.query(query, (err, result) => {
    if (err) {
        console.log(err);
      }
      console.table(result);
   });

}

function viewAllRoles () {
    const query = `SELECT role.title AS "Job Title", role.id AS "Role Id", department.name AS Department, role.salary AS Salary FROM role INNER JOIN department ON department.id = role.department_id`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
          }
          console.table(result);
       });
}

function viewAllemployees () {
    const query = `SELECT e.id AS "Employee Id", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Job Title", department.name AS Department, role.salary AS Salary, m.first_name AS "Manager First Name", m.last_name AS "Manager Last Name" FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY e.id`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
          }
          console.table(result);
       });
}

function addaDepartment () {
    inquirer
        .prompt({
            name: 'newdepartment',
            type: 'input',
            message: 'What department name do you want to add?'
        })
        .then(answer => {
            const query = `INSERT INTO department(name) VALUES ("${answer.newdepartment}")`;
            connection.query(query, (err) => {
                if (err) {
                    console.log(err);
                  }
                  console.log("Success, your new department was added to the database");
               });
            });
}

function addaRole () {
    inquirer
        .prompt([{
            name: 'newrole',
            type: 'input',
            message: 'What role do you want to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What do you want the salary to be?'
        },
        {
            name: 'department',
            type: 'input',
            message: 'Which department would you like the role to be in?'
        }
    ])

        .then(answer => {
            const query = `INSERT INTO role(title, salary, department_id) VALUES ("${answer.newrole}", ${answer.salary}, (SELECT id FROM department WHERE name = "${answer.department}"))`;
            connection.query(query, (err) => {
                if (err) {
                    console.log(err);
                  }
                  console.log("Success, your new role was added to the database");
               });
            });
}
function addanEmployee () {
    inquirer
        .prompt([{
            name: 'newemployeefirstname',
            type: 'input',
            message: 'What is the new employee first name?'
        },
        {
            name: 'newemployeelastname',
            type: 'input',
            message: 'What is the new employee last name?'
        },
        {
            name: 'newjob',
            type: 'input',
            message: 'What would you like their role to be?'
        },
        {
            name: 'newmanager',
            type: 'input',
            message: 'What is the manager last name?'
        }
    ])

        .then(answer => {
            const rolequery = `SELECT id FROM role WHERE title = ("${answer.newjob}")`
            const managerquery = `(SELECT id FROM employee WHERE last_name = "${answer.newmanager}")`
            const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answer.newemployeefirstname}", "${answer.newemployeelastname}",(SELECT id FROM role WHERE title = "${answer.newjob}") , (SELECT id FROM employee WHERE last_name = "${answer.newmanager}"))`;
            connection.query(rolequery, (err, roledata) => {
                if (err) {
                    console.log(err);
                  } 
                  connection.query(managerquery, (err, managerdata) => {
                    if (err) {
                        console.log(err);
                      } 
                      connection.query( `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answer.newemployeefirstname}", "${answer.newemployeelastname}", "${roledata[0].id}", "${managerdata[0].id}")`, (err) => {
                        if (err) {
                            console.log(err);
                          }
                          console.log("Success, your new employee was added to the database");
                       });
                   });
                });
               });
}
function updateanEmployeeRole () {
    inquirer
        .prompt([{
            name: 'pickemployee',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: [
                'Jim Halpert',
                'Dwight Schrute',
                'Stanley Hudson',
                'Ryan Howard',
                'Kevin Malone',
                'Angela Martin',
                'Toby Flenderson',
                'Roy Richards',
                'Pam Beesly',
                'Kelly Kapor',
                'John Carter'
            ],
        },
        {
            name: 'picknewrole',
            type: 'list',
            message: 'What is their new role?',
            choices: [
                'Salesperson',
                'Junior Salesperson',
                'Accountant',
                'Payroll',
                'Human Resource Rep',
                'Warehouse Worker',
                'Receptionist',
                'Customer Service Rep'
            ],
        }
    ])

        .then (answer => {
            const query = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = "${answer.picknewrole}") WHERE CONCAT(first_name, " ", last_name) = "${answer.pickemployee}"`;
            connection.query(query, (err) => {
                if (err) {
                    console.log(err);
                  }
                  console.log("Success, your employee was updated to the database");
               });
            });
        }
