/*This table stores the information that will not change every year about a course*/
CREATE TABLE courses (
    course_id VARCHAR(20) PRIMARY KEY,
    course_title VARCHAR(255),
    course_description TEXT,
);

/* This table is created as one course can be taught multiple times over years*/
CREATE TABLE courses_per_semester (
    course_id VARCHAR(20),
    semester_id VARCHAR(20),
    course_start_date DATE,
    course_end_date DATE,
    PRIMARY KEY(course_id,semester_id)
);

/*This table keeps track of all semesters like fall 2022,spring 2023 etc....*/
CREATE TABLE semesters(
    semester_id VARCHAR(20) PRIMARY KEY,
    semester VARCHAR(50),
    semester_start_date DATE,
    semester_end_date DATE
);

/* So when we assign a student or professor to a course through admin panel this table 
should be updated */
CREATE TABLE enrollments (
    course_id VARCHAR(20) NOT NULL,
    semester_id VARCHAR(20) NOT NULL,
    user_id INTEGER NOT NULL,
    enrollment_date DATE,
    PRIMARY KEY (course_id,semester_id,user_id)
);


INSERT INTO courses(course_id,course_title,course_description)
VALUES ('CSCI-P565','Software Engineering 1','Learn Software Engineering, Agile Methodologies and develop a full stack application!');

INSERT INTO courses(course_id,course_title,course_description)
VALUES ('CSCI-B505','Applied Algorithms','Learn everything about algorithms!');

INSERT INTO courses(course_id,course_title,course_description)
VALUES ('CSCI-P556','Applied Machine Learning','Let us teach machines how to do our task so we can chill!');

INSERT INTO courses(course_id,course_title,course_description)
VALUES ('CSCI-B565','Data Mining','Learn to infer data and observe interesting patterns!');

INSERT INTO courses(course_id,course_title,course_description)
VALUES ('DSCI-D532','Applied Database technologies','Learn everything about Databases!');


INSERT INTO semesters(semester_id,semester,semester_start_date,semester_end_date)
VALUES ('FA22','Fall 2022','2022-08-22','2022-12-16');
INSERT INTO semesters(semester_id,semester,semester_start_date,semester_end_date)
VALUES ('SP23','Spring 2023','2023-01-09','2023-05-05');


INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('CSCI-B505','FA22','2022-08-22','2022-12-16');
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('CSCI-P556','FA22','2022-08-22','2022-12-16');
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('CSCI-P565','SP23','2023-01-09','2023-05-05');
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('DSCI-D532','SP23','2023-01-09','2023-05-05');


INSERT INTO enrollments(course_id,semester_id,user_id,enrollment_date)
VALUES('CSCI-P565','SP23',1,'2022-12-10');
INSERT INTO enrollments(course_id,semester_id,user_id,enrollment_date)
VALUES('CSCI-P565','SP23',4,'2022-12-10');
INSERT INTO enrollments(course_id,semester_id,user_id,enrollment_date)
VALUES('CSCI-P556','FA22',1,'2022-05-05');


/*INSERT INTO courseAssignment_professor(course_id,semester_id,user_id)
VALUES('CSCI-P565','SP23',5);
INSERT INTO courseAssignment_professor(course_id,semester_id,user_id)
VALUES('CSCI-P556','FA22',6)*/
