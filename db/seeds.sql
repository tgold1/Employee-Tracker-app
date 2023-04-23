INSERT INTO department (name)
VALUES ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Warehouse"),
       ("Reception"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
       ("Junior Salesperson", 55000, 1),
       ("Sales Manager", 110000, 1)
       ("Accountant", 60000, 2),
       ("Payroll", 45000, 2),
       ("Account Manager", 70000, 2),
       ("Human Resource Representative", 50000, 3),
       ("Human Resource Manager", 55000, 3),
       ("Warehouse Worker", 45000, 4),
       ("Warehouse Manager", 62000, 4),
       ("Receptionist", 48000, 5),
       ("Reception Manager", 56000, 5),
       ("Customer Service Representative", 43000, 6),
       ("Customer Service Manager", 51000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael","Scott", 3, NULL),
       ("Jim","Halpert", 1, 1),
       ("Dwight", "Schrute", 1, 1),
       ("Stanley", "Hudson", 1, 1),
       ("Ryan", "Howard", 2, 1),
       ("Oscar", "Martinez", 6, NULL),
       ("Kevin", "Malone", 4, 6),
       ("Angela", "Martin", 5, 6),
       ("Meredith", "Palmer", 8, NULL),
       ("Toby", "Flenderson", 7, 9),
       ("Darryl", "Philbin", 10, NULL),
       ("Roy", "Richards", 9, 11),
       ("Phyillis", "Vance", 12, NULL),
       ("Pam", "Beesly", 11, 13),
       ("Andy", "Bernard", 14, NULL),
       ("Kelly", "Kapor", 13, 15);

       