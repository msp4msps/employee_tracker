INSERT INTO employee (id, first_name, last_name,role_id, manager_id)
VALUES (1,"Nick", "Ross", 2, 5),
       (2,"Rick", "Noss", 1, 3),
       (3,"Alex", "Wilber", 4, 2),
       (4,"James", "Jones", 2, 4),
       (5,"Cindy", "Cline", 3, 5);

INSERT INTO department (id, name)
VALUES (1,"Sales"),
       (2,"Accounting"),
       (3,"Engineering"),
       (4,"Support"),
       (5,"HR");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"Manager", 45, 2),
       (2,"Account Manager", 60, 1),
       (3,"Software Engineer", 75, 3),
       (4,"Tier 1 Tech", 55, 4),
       (5,"Recruiter", 50, 5);
