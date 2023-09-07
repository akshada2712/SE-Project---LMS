/*Professor & Admin creation dummy data*/
INSERT INTO users (email, username, password, user_role, mobile, security_question, security_answer) 
                    VALUES ('amrsabry@iu.edu', 'amrsabry', crypt('amrsabry', gen_salt('bf')), 'Educator', 
                    '1231231231', 'What was your favorite food as a child?', 'food');
INSERT INTO users (email, username, password, user_role, mobile, security_question, security_answer) 
                    VALUES ('nazim@iu.edu', 'nazimashraf', crypt('nazimashraf', gen_salt('bf')), 'Educator', 
                    '2341324123', 'What is the name of your favorite pet?', 'koi');
INSERT INTO users (email, username, password, user_role, mobile, security_question, security_answer) 
                    VALUES ('apompa@iu.edu', 'anniepompa', crypt('apompa123', gen_salt('bf')), 'Admin', 
                    '2423141234', 'What is the name of your favorite pet?', 'Yumi');


/* Course dummy data */
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


/* Semester dummy data */
INSERT INTO semesters(semester_id,semester,semester_start_date,semester_end_date)
VALUES ('FA22','Fall 2022','2022-08-22','2022-12-16');
INSERT INTO semesters(semester_id,semester,semester_start_date,semester_end_date)
VALUES ('SP23','Spring 2023','2023-01-09','2023-05-05');

/* Courses_per_semester dummy data */
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('CSCI-B505','FA22','2022-08-22','2022-12-16');
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('CSCI-P556','FA22','2022-08-22','2022-12-16');
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('CSCI-P565','SP23','2023-01-09','2023-05-05');
INSERT INTO courses_per_semester(course_id,semester_id,course_start_date,course_end_date)
VALUES ('DSCI-D532','SP23','2023-01-09','2023-05-05');

/* Enrollments dummy data */
INSERT INTO enrollments(course_id,semester_id,user_id,enrollment_date)
VALUES('CSCI-P565','SP23',1,'2022-12-10');
INSERT INTO enrollments(course_id,semester_id,user_id,enrollment_date)
VALUES('CSCI-P565','SP23',4,'2022-12-10');
INSERT INTO enrollments(course_id,semester_id,user_id,enrollment_date)
VALUES('CSCI-P556','FA22',1,'2022-05-05');