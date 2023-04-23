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
    database: 'employees'
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
   const query = `SELECT department.name AS departments, department.id AS department id`
}