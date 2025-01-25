USE company;

CREATE TABLE worker (
    WORKER_ID INT PRIMARY KEY,
    FIRST_NAME VARCHAR(50),
    LAST_NAME VARCHAR(50),
    SALARY DECIMAL(10, 2),
    JOINING_DATE DATETIME,
    DEPARTMENT VARCHAR(50)
);

INSERT INTO worker (WORKER_ID, FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT)
VALUES
(1, 'Monika', 'Patel', 100000, '2014-02-20 09:00:00', 'HR'),
(2, 'Niharika', 'Verma', 80000, '2014-06-11 09:00:00', 'Admin'),
(3, 'Vishal', 'Singhal', 300000, '2014-02-20 09:00:00', 'HR'),
(4, 'Amitabh', 'Singh', 500000, '2014-02-20 09:00:00', 'Admin'),
(5, 'Vivek', 'Bhatti', 500000, '2014-06-11 09:00:00', 'Admin'),
(6, 'Vipul', 'Diwan', 200000, '2014-06-11 09:00:00', 'Account'),
(7, 'Satish', 'Kumar', 75000, '2014-01-20 09:00:00', 'Account'),
(8, 'Geetika', 'Chauhan', 90000, '2014-04-11 09:00:00', 'Admin');

SELECT * FROM worker;

CREATE TABLE title (
    WORKER_REF_ID INT,
    WORKER_TITLE VARCHAR(50),
    AFFECTED_FROM DATETIME
);


INSERT INTO title (WORKER_REF_ID, WORKER_TITLE, AFFECTED_FROM)
VALUES
(1, 'Manager', '2016-02-20 00:00:00'),
(2, 'Executive', '2016-06-11 00:00:00'),
(8, 'Executive', '2016-06-11 00:00:00'),
(5, 'Manager', '2016-06-11 00:00:00'),
(4, 'Asst. Manager', '2016-06-11 00:00:00'),
(7, 'Executive', '2016-06-11 00:00:00'),
(6, 'Lead', '2016-06-11 00:00:00'),
(3, 'Lead', '2016-06-11 00:00:00');

SELECT * FROM title;

CREATE TABLE bonus (
    WORKER_REF_ID INT,
    BONUS_DATE DATETIME,
    BONUS_AMOUNT DECIMAL(10, 2)
);

INSERT INTO bonus (WORKER_REF_ID, BONUS_DATE, BONUS_AMOUNT)
VALUES
(1, '2016-02-20 00:00:00', 5000),
(2, '2016-06-11 00:00:00', 3000),
(3, '2016-02-20 00:00:00', 4000),
(1, '2016-02-20 00:00:00', 4500),
(2, '2016-06-11 00:00:00', 3500);

									
									
#Q-1. Write an SQL query to print the first three characters of  FIRST_NAME from Worker table.									
SELECT LEFT(FIRST_NAME,3) FROM worker;
									  
#Q-2. Write an SQL query to show only odd rows from a table.									
WITH working_row AS (
	SELECT *,ROW_NUMBER() OVER() AS row_num FROM worker
) SELECT * FROM working_row WHERE row_num%2 <> 0;
									
#Q-3. Write an SQL query to print details of the Workers whose FIRST_NAME ends with ‘h’ and contains six alphabets.									
SELECT FIRST_NAME FROM worker WHERE FIRST_NAME LIKE '_____h';
								
#Q-4. Write an SQL query to fetch the count of employees working in the department ‘Admin’.									
SELECT COUNT(*) FROM WORKER WHERE DEPARTMENT='Admin';	
							
#Q-5. Write an SQL query to print details of the Workers whose SALARY lies between 100000 and 500000.									
SELECT * FROM WORKER WHERE SALARY BETWEEN 100000 AND 500000;	
									
#Q-6. Write an SQL query to print details of the Workers who have joined in Feb’2014.									
SELECT * FROM WORKER WHERE MONTH(JOINING_DATE)=2 AND YEAR(JOINING_DATE)=2014;
	
#Q-7. Write an SQL query to fetch “FIRST_NAME” from Worker table in upper case.									
SELECT UCASE(FIRST_NAME) AS UpperCaseName FROM worker;
									
#Q-8. Write an SQL query to fetch worker names with salaries >= 50000 and <= 100000.									
SELECT name FROM WORKER WHERE SALARY >=50000 AND SALARY<= 100000;									

#Q-9. Write an SQL query to print details of the Workers who are also Managers.									
SELECT * FROM worker W join title T ON W.WORKER_ID=T.WORKER_REF_ID WHERE T.WORKER_TITLE='Manager';
									
#Q-10. Write an SQL query to fetch unique values of DEPARTMENT from Worker table.									
SELECT DISTINCT  DEPARTMENT FROM worker;
									
#Q-11. Write an SQL query to fetch the first 50% records from a table.	
WITH working AS (
	SELECT  * , ROW_NUMBER() OVER () AS row_num FROM worker
) SELECT * FROM working WHERE row_num <= (SELECT count(*) FROM worker) / 2;		
							
#Q-12. Write an SQL query to print the FIRST_NAME from Worker table after removing white spaces from the right side.									
SELECT RTRIM(FIRST_NAME) FROM worker ;	
									
#Q-13. Write an SQL query to print the FIRST_NAME from Worker table after replacing ‘a’ with ‘A’.									
SELECT FIRST_NAME,REPLACE(FIRST_NAME,'a','A') FROM worker;

#14. Write an SQL query to print the FIRST_NAME and LAST_NAME from Worker table into a single column COMPLETE_NAME. A space char should separate them.									
SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) as COMPLETE_NAME FROM worker;	
								
#Q-15. Write an SQL query to print all Worker details from the Worker table order by FIRST_NAME Ascending and DEPARTMENT Descending.									
SELECT * FROM worker ORDER BY FIRST_NAME,LAST_NAME DESC;
								
#Q-16. Write an SQL query to print details of workers excluding first names, “Vipul” and “Satish” from Worker table.									
SELECT * FROM worker WHERE FIRST_NAME<>'Vipul' AND FIRST_NAME<>'Satish';
									
#Q-17. Write an SQL query to show the current date and time.									
SELECT CURRENT_TIMESTAMP();	
SELECT CURDATE();
SELECT CURTIME();
								
#Q-18. Write an SQL query to show the second highest salary from a table.									
SELECT * FROM worker ORDER BY SALARY DESC LIMIT 1 OFFSET 1;	

#Q-19. Write an SQL query to show one row twice in results from a table.									
SELECT * FROM worker 
UNION ALL
SELECT * FROM worker 
ORDER BY WORKER_ID;

#Q-20. Write an SQL query to fetch intersecting records of two tables.								
SELECT * FROM worker W1 
join  title W2
ON W1.WORKER_ID=W2.WORKER_REF_ID;
