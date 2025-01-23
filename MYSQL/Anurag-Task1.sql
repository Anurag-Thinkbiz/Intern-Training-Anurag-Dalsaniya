CREATE DATABASE Company;

USE Company;

CREATE TABLE Employee(
  Emp_id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Job_title VARCHAR(50) NOT NULL,
  Manager_id INT,
  Hire_date DATE,
  Salary DECIMAL(10,2),
  Commision DECIMAL(10,2),
  Dept_no INT,
  Address_street VARCHAR(50),
  Address_city VARCHAR(50) NOT NULL
);

CREATE TABLE Department(
 Dept_no INT AUTO_INCREMENT PRIMARY KEY,
 Name VARCHAR(50),
 Location VARCHAR(50)
);

INSERT INTO Employee (Name, Job_title, Manager_id, Hire_date, Salary, Commision, Dept_no, Address_street, Address_city) VALUES
('John Doe', 'Software Engineer', NULL, '2022-06-15', 65000.00, 500.00, 10, '123 Elm St', 'New York'),
('jane smith', 'Project Manager', 1, '2020-04-22', 85000.00, 1000.00, 20, '456 Oak Ave', 'Los Angeles'),
('ALICE Johnson', 'Data Scientist', 2, '2021-03-12', 75000.00, 600.00, 30, '789 Pine Rd', 'Chicago'),
('BOb brown', 'Software Engineer', 1, '2022-07-01', 70000.00, 450.00, 10, '101 Maple Blvd', 'Boston'),
('Carla Martin', 'Product Manager', 3, '2019-09-18', 90000.00, 1500.00, 20, '202 Birch Lane', 'Houston'),
('david WILSON', 'HR Specialist', 5, '2018-05-30', 50000.00, 200.00, 40, '303 Cedar Way', 'Miami'),
('SUSAN taylor', 'Business Analyst', 6, '2021-01-10', 65000.00, 350.00, 50, '404 Cherry Dr', 'Dallas'),
('michael Clark', 'Data Analyst', NULL, '2020-11-07', 55000.00, 300.00, 30, '505 Walnut Ave', 'Phoenix'),
('LISA ADAMS', 'Product Designer', 7, '2021-02-23', 62000.00, 400.00, 10, '606 Fir Blvd', 'San Francisco'),
('THOMAS HARRIS', 'Marketing Director', 8, '2017-08-19', 95000.00, 1200.00, 20, '707 Pine St', 'Seattle'),
('emily EVANS', 'Web Developer', NULL, '2022-10-30', 57000.00, 250.00, 10, '808 Oak Rd', 'San Diego'),
('sophia scott', 'Quality Assurance Engineer', 9, '2020-04-15', 60000.00, 400.00, 40, '909 Maple Dr', 'Denver'),
('chris MURPHY', 'Database Administrator', 10, '2019-03-10', 80000.00, 700.00, 30, '1001 Elm Blvd', 'Washington'),
('josephine KIM', 'HR Manager', 11, '2018-07-23', 95000.00, 1100.00, 50, '1102 Oak Way', 'Austin'),
('lucas HALL', 'Cloud Architect', NULL, '2021-12-05', 105000.00, 1300.00, 10, '1203 Cedar Blvd', 'New York'),
('MARY LOPEZ', 'Sales Representative', 12, '2019-06-10', 54000.00, 600.00, 20, '1304 Pine Rd', 'San Francisco'),
('hannah WILKINS', 'Content Writer', 13, '2020-05-15', 45000.00, 150.00, 60, '1405 Birch Ln', 'Los Angeles'),
('william MARTINEZ', 'Technical Support', 14, '2021-09-21', 49000.00, 250.00, 30, '1506 Maple Blvd', 'Houston'),
('madeline PEREZ', 'UX/UI Designer', 15, '2022-01-25', 64000.00, 400.00, 40, '1607 Fir St', 'Chicago'),
('james JACKSON', 'Systems Engineer', NULL, '2019-11-04', 72000.00, 600.00, 10, '1708 Pine Ave', 'Phoenix'),
('paul MARTIN', 'Network Engineer', 16, '2018-02-18', 85000.00, 500.00, 20, '1809 Oak Dr', 'Dallas'),
('RACHEL GARCIA', 'Product Owner', 17, '2020-09-29', 88000.00, 1100.00, 20, '1901 Walnut St', 'Seattle'),
('katherine taylor', 'Marketing Specialist', 18, '2021-07-03', 59000.00, 300.00, 10, '2002 Birch Rd', 'San Diego'),
('JOSHUA MARTIN', 'Full Stack Developer', 19, '2022-11-12', 78000.00, 500.00, 30, '2103 Cedar St', 'Washington'),
('KEVIN YOUNG', 'Lead Designer', NULL, '2020-01-10', 85000.00, 600.00, 20, '2204 Pine Blvd', 'Boston'),
('maria GREEN', 'Operations Manager', 21, '2018-06-17', 95000.00, 1000.00, 40, '2305 Oak Way', 'New York'),
('JULIA EVANS', 'Security Analyst', 22, '2019-12-07', 65000.00, 500.00, 10, '2406 Maple St', 'Chicago'),
('charles ROSS', 'Finance Manager', 23, '2017-11-02', 95000.00, 1200.00, 20, '2507 Walnut Ave', 'Los Angeles'),
('olivia LOPEZ', 'IT Specialist', 24, '2021-04-12', 62000.00, 400.00, 10, '2608 Birch Ln', 'Houston'),
('brian MOORE', 'Research Scientist', 25, '2020-07-05', 72000.00, 500.00, 50, '2709 Fir Blvd', 'Phoenix'),
('nancy EVANS', 'Legal Advisor', 26, '2022-01-01', 80000.00, 700.00, 60, '2801 Pine Rd', 'San Francisco'),
('Ethan BAKER', 'Operations Director', 27, '2018-04-15', 105000.00, 1500.00, 20, '2902 Cedar Way', 'Dallas'),
('ava davis', 'Content Manager', 28, '2021-08-21', 75000.00, 400.00, 10, '3003 Maple Rd', 'Austin'),
('elizabeth GRAHAM', 'Cloud Engineer', 29, '2020-06-22', 70000.00, 600.00, 30, '3104 Walnut Blvd', 'Seattle'),
('nathan PETERSON', 'Network Administrator', 30, '2019-10-10', 83000.00, 700.00, 40, '3205 Birch Ave', 'San Diego'),
('TOMMY WASHINGTON', 'Project Coordinator', NULL, '2022-09-13', 57000.00, 200.00, 30, '3306 Oak Blvd', 'Washington'),
('briana RICHARDSON', 'Software Tester', 31, '2020-04-11', 54000.00, 350.00, 50, '3407 Pine Ave', 'Los Angeles'),
('HARRY WATSON', 'Research Analyst', 32, '2021-02-04', 63000.00, 300.00, 10, '3508 Maple Ln', 'Chicago'),
('DANIELLE BROWN', 'Web Designer', 33, '2022-03-19', 56000.00, 250.00, 40, '3609 Birch Rd', 'Boston'),
('thomas Lee', 'Legal Specialist', 34, '2018-01-08', 72000.00, 450.00, 50, '3701 Oak Dr', 'Denver'),
('VICTORIA KING', 'Product Specialist', 35, '2019-06-25', 78000.00, 550.00, 20, '3802 Pine Rd', 'Miami'),
('alexander THOMPSON', 'Technical Writer', 36, '2021-09-08', 60000.00, 300.00, 30, '3903 Cedar Blvd', 'Phoenix'),
('EVELYN SIMPSON', 'Executive Assistant', 37, '2020-12-13', 55000.00, 200.00, 40, '4004 Birch Way', 'San Francisco'),
('tanner HERRERA', 'DevOps Engineer', 38, '2019-08-15', 90000.00, 1000.00, 10, '4105 Maple Rd', 'Houston'),
('CLAIRE MOORE', 'HR Assistant', NULL, '2021-05-06', 48000.00, 250.00, 60, '4206 Oak Blvd', 'Chicago'),
('jacob FOSTER', 'Systems Architect', 39, '2018-10-20', 88000.00, 800.00, 20, '4307 Pine Ave', 'San Diego'),
('hannah RIVERA', 'Software Architect', 40, '2022-07-10', 100000.00, 1300.00, 50, '4408 Cedar Blvd', 'Seattle'),
('benjamin WRIGHT', 'Product Marketing Manager', NULL, '2020-11-01', 75000.00, 600.00, 20, '4509 Maple Dr', 'Washington'),
('zoe REED', 'Operations Analyst', 41, '2019-01-29', 65000.00, 500.00, 30, '4601 Birch Blvd', 'Miami'),
('sebastian COOPER', 'Security Consultant', NULL, '2022-08-02', 95000.00, 1200.00, 40, '4702 Pine Way', 'Dallas'),
('samuel HARRISON', 'salesmen', 42, '2021-10-17', 58000.00, 350.00, 20, '4803 Cedar Rd', 'San Francisco'),
('MIA TURNER', 'Graphic Designer', 43, '2020-12-29', 59000.00, 200.00, 60, '4904 Maple Blvd', 'Phoenix'),
('JACOB PEREZ', 'Database Developer', 44, '2019-05-22', 78000.00, 700.00, 30, '5005 Birch Dr', 'Austin'),
('kate CAMPBELL', 'Sales Analyst', 45, '2021-04-08', 67000.00, 500.00, 40, '5106 Cedar Ave', 'Seattle'),
('noah GONZALEZ', 'Marketing Analyst', NULL, '2020-02-14', 60000.00, 350.00, 10, '5207 Pine Rd', 'Boston'),
('olivia GARCIA', 'Cloud Consultant', 46, '2022-06-23', 80000.00, 900.00, 20, '5308 Oak Blvd', 'San Francisco'),
('JULIA WILLIAMS', 'Project Analyst', 47, '2021-03-05', 64000.00, 500.00, 30, '5409 Birch St', 'Los Angeles'),
('NATHANIEL KIM', 'Business Intelligence Developer', 48, '2020-07-18', 82000.00, 750.00, 40, '5510 Pine Blvd', 'Dallas'),
('PATRICIA HERNANDEZ', 'Business Operations Manager', 49, '2019-06-19', 94000.00, 1100.00, 50, '5611 Maple Rd', 'Chicago'),
('CYNTHIA YOUNG', 'Product Development Manager', 50, '2018-09-10', 95000.00, 1300.00, 20, '5712 Cedar Way', 'Seattle');

INSERT INTO Department (Dept_no,Name, Location) VALUES
(10,'Human Resources', 'New York'),
(20,'Sales', 'San Francisco'),
(30,'Engineering', 'Austin'),
(40,'Marketing', 'Chicago'),
(50,'Finance', 'Boston'),
(60,'First Bank Corporation', 'Seattle');


SELECT * FROM Employee;

SELECT * FROM Department;

#1.Find the names, street address, and cities of residence for all employees who work for'First Bank Corporation' and earn more than $10,000.
SELECT e.Name,e.Address_street,e.Address_city ,D.Dept_no
FROM Employee E
INNER JOIN Department D
ON D.Dept_no=E.Dept_no
WHERE D.Name='First Bank Corporation' AND E.Salary>10000 ;

#2.Select the employees in department 30
SELECT *
FROM Employee E
INNER JOIN Department D
ON D.Dept_no=E.Dept_no
WHERE D.Dept_no=30;

#3.List the names, numbers and departments of all clerks.

SELECT E.Emp_id,E.Name
FROM Employee E
INNER JOIN Department D
ON D.Dept_no=E.Dept_no
WHERE E.Job_title='Clerk';


#4.Find the department numbers and names of employees of all departments with deptno greater than 20.
SELECT D.Dept_no,D.Name,E.Name
FROM Employee E
INNER JOIN Department D
ON D.Dept_no=E.Dept_no
WHERE D.Dept_no > 20;

#5.Find employees whose commission is greater than their salaries.

UPDATE Employee SET Commision=60000 WHERE Salary=50000;

SELECT E1.Name
FROM Employee E1
JOIN Employee E2
ON E1.Emp_id=E2.Emp_id
WHERE E1.Commision > E2.Salary;

UPDATE Employee SET Commision=50000 WHERE Salary=60000;

#6.Find employees whose commission is greater than 60 % of their salaries.
SELECT E1.Name
FROM Employee E1
JOIN Employee E2
ON E1.Emp_id=E2.Emp_id
WHERE E1.Commision > E2.Salary*0.6; 
 
#7.List name, job and salary of all employees in department 20 who earn more than 2000/-.
SELECT E.Name,E.Job_title,E.Salary
FROM Employee E
JOIN Department D
ON E.Dept_no=D.Dept_no
WHERE E.Salary > 2000 AND D.Dept_no=20; 

#8.Find all salesmen in department 30 whose salary is greater than 1500/-.
-- UPDATE employee SET Job_title='Salesmen' WHERE Job_title='Systems Architect';
-- UPDATE employee SET Salary=2000,Dept_no=30 WHERE Job_title='Salesmen';

SELECT Name,Salary
FROM Employee 
WHERE Salary > 1500 AND Dept_no=30 AND Job_title='Salesmen'; 


#9.Find all employees whose designation is either manager or president.
SELECT Name,Salary,Job_title
FROM Employee 
WHERE Job_title REGEXP 'manager' OR Job_title REGEXP 'president'; 


#10.Find all managers who are not in department 30.
SELECT Name,Job_title
FROM Employee 
WHERE  Job_title REGEXP 'manager' AND Dept_no!=30; 


#11.Find all the details of managers and clerks in dept 10.
SELECT *
FROM Employee 
WHERE  (Job_title REGEXP 'manager' OR Job_title REGEXP 'Clerk') AND Dept_no=10; 

#12.Find the details of all the managers (in any dept) and clerks in dept 20.
SELECT *
FROM Employee 
WHERE  Job_title REGEXP 'manager' OR (Job_title REGEXP 'Clerk' AND Dept_no=20); 

#13.Find the details of all the managers in dept. 10 and all clerks in dept 20 and all employees who are neither managers nor clerks but whose salary is more than or equal to 2000/-.
SELECT *
FROM Employee 
WHERE  (Job_title REGEXP 'manager' AND Dept_no=10) 
 OR (Job_title NOT REGEXP 'Clerk' AND Dept_no=20) 
 OR (Job_title NOT REGEXP 'manager' AND Job_title regexp 'Clerk' AND Salary>2000) ; 

#14.Find the names of anyone in dept. 20 who is neither manager nor clerk.
SELECT * 
FROM employee 
WHERE Dept_no=20 AND (Job_title NOT REGEXP 'manager' OR Job_title NOT  REGEXP 'clerk'); 

#15.Find the names of employees who earn between 1200/- and 1400/-.
SELECT Name 
FROM employee 
WHERE Salary BETWEEN 1200 AND 1400;

#16.Find the employees who are clerks, analysts or salesmen.
SELECT Name,Job_title 
FROM employee 
WHERE Job_title REGEXP 'manager' OR Job_title REGEXP 'Clerk' OR Job_title REGEXP 'Salesmen';

#17.Find the employees who are not clerks, analysts or salesmen.
SELECT Name,Job_title 
FROM employee 
WHERE Job_title NOT REGEXP 'manager' AND Job_title NOT REGEXP 'Clerk' AND Job_title NOT REGEXP 'Salesmen';

#18.Find the employees who do not receive commission.
SELECT Name,Commision 
FROM employee 
WHERE Commision =0 OR Commision IS NULL;

#19.Find the different jobs of employees receiving commission.
SELECT DISTINCT Job_title,Commision 
FROM employee 
WHERE Commision is NOT NULL AND Commision!=0;

#20.Find the employees who do not receive commission or whose commission is less than 100/-.
SELECT * FROM employee 
WHERE Commision is NOT NULL 
AND Commision!=0 OR Commision < 100;

#21.If all the employees not receiving commission is entitles to a bonus of Rs. 250/- show the net earnings of all the employees.
INSERT INTO Employee 
(Name, Job_title, Manager_id, Hire_date, Salary, Commision, Dept_no, Address_street, Address_city) 
VALUES
('John Doe', 'Software Engineer', NULL, '2022-06-15', 65000.00, NULL, 10, '123 Elm St', 'New York');

SELECT 
    Emp_id,Name,Salary,Commision,
    CASE
        WHEN Commision = 0 OR Commision IS NULL THEN Salary + 250
        ELSE Salary + Commision
    END AS Net_earnings
FROM
    employee;

#22.Find all the employees whose total earning is greater than 2000/- .

SELECT 
    Emp_id,Name,Salary,Commision,
    CASE
        WHEN Commision = 0 OR Commision IS NULL THEN Salary + 250
        ELSE Salary + Commision
    END AS Net_earnings
FROM employee
WHERE  
CASE
        WHEN Commision = 0 OR Commision IS NULL THEN Salary + 250
        ELSE Salary + Commision
    END >2000;


#23.Find all the employees whose name begins or ends with ‘M’

SELECT * 
FROM employee 
WHERE Name like CONCAT(CHAR(77),'%') 
OR Name like CONCAT('%',CHAR(77));

#24.Find all the employees whose names contain the letter ‘M’ in any case.
SELECT * FROM employee WHERE Name like '%M%';

#25.Find all the employees whose names are up to 15 character long and have letter ‘R’ as 3rd character of their names.
SELECT * FROM employee WHERE LENGTH(Name) >=15 AND Name like '__R';

#26.Find all the employees who were hired in the month of February (of any year).
SELECT * FROM employee WHERE MONTH(Hire_date)=2;

#27.Find all the employees who were hired on last day of the month.
SELECT * FROM employee 
WHERE 
DAY(Hire_date)=LAST_DAY(Hire_date);


#28.Find all the employees who were hired more than 2 years ago.
SELECT * FROM employee WHERE timestampdiff(YEAR,Hire_date, curdate()) = 2;

#29.Find the managers hired in the year 2003.
SELECT * FROM employee WHERE year(Hire_date)=2003;

#30.Display the names and jobs of all the employees separated by a space.
SELECT concat(Name,' ',Job_title) as newFormat from employee;

#31.Display the names of all the employees right aligning them to 15 characters.
SELECT concat(LPAD(' ',15,' '),Name) as RihgtAlign FROM employee;

#32.Display the names of all the employees padding them to the right up to 15 characters with ‘*’.

SELECT LPAD(Name,15,'*') AS RihgtAlign FROM employee;

#33.Display the names of all the employees without any leading ‘A’.
SELECT Name FROM employee WHERE Name NOT LIKE 'A%';

#34.Display the names of all the employees without any trailing ‘R’.
SELECT Name FROM employee WHERE Name NOT LIKE '%R';

#35.Show the first 3 and last 3 characters of the names of all the employees.
SELECT LEFT(Name,3) AS FirstThree,
RIGHT(Name,3) AS LastThree
FROM employee;

#36.Display the names of all the employees replacing ‘A’ with ‘a’.
SELECT Name,
REPLACE(Name,'A','a') NewName
FROM employee;

#37.Display the names of all the employees and position where the string ‘AR’ occurs in the name.
SELECT Name,LOCATE('AR',Name) AS position
FROM employee
WHERE Name like '%AR%';

#38.Show the salary of all the employees , rounding it to the nearest Rs. 1000/-.
SELECT ROUND(Salary,-3) AS RoundedSalary FROM employee; 

#39.Display the names, jobs and salaries of employees, sorting on job and salary.
SELECT Name,Job_title,Salary FROM employee ORDER BY Job_title AND Salary;

#40.Display the names, jobs and salaries of employees, sorting on descending order of job and within job sorted on salary.
SELECT Name,Job_title,Salary FROM employee  ORDER BY Job_title DESC,Salary DESC;

#41.List the employee names, department names and salary for those employees who have completed 1 year of service.
SELECT E.Name,D.Name,E.Salary,E.Hire_Date
FROM Employee E
JOIN Department D
ON E.Dept_no=D.Dept_no
WHERE TIMESTAMPDIFF(YEAR,E.Hire_date,CURDATE()) >1; 

#42.List the employee names, department names and hiredate for those employees who have joined in 2003 . Sort your output in the order of joining date.
UPDATE employee SET Hire_Date='2003-01-04' WHERE Hire_date='2021-03-05';

INSERT INTO Employee 
(Name, Job_title, Manager_id, Hire_date, Salary, Commision, Dept_no, Address_street, Address_city) 
VALUES
('John Doe', 'Software Engineer', NULL, '2003-06-15', 650.00, NULL, 10, '123 Elm St', 'New York');

SELECT E.Name,D.Name,E.Salary,E.Hire_Date
FROM Employee E
JOIN Department D
ON E.Dept_no=D.Dept_no
WHERE YEAR(E.Hire_date)=2003
ORDER BY E.Hire_Date;
