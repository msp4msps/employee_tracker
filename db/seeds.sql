INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ("Nick", "Ross", 2, 5),
       ("Rick", "Noss", 1, 3),
       ("Alex", "Wilber", 4, 2),
       ("James", "Jones", 2, 4),
       ("Cindy", "Cline", 3, 5);

INSERT INTO department (id, name)
VALUES ("Sales"),
       ("Accounting"),
       ("Engineering"),
       ("Support"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 45000, 2),
       ("Account Manager", 60000, 1),
       ("Software Engineer", 75000, 3),
       ("Tier 1 Tech", 55000, 4),
       ("Recruiter", 50000, 5);
