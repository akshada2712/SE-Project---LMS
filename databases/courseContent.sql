CREATE TABLE modules (
    module_id SERIAL NOT NULL PRIMARY KEY,
    course_id VARCHAR(20) NOT NULL,
    module_title TEXT,
    module_text TEXT,
    module_file BYTEA
);

CREATE TABLE student_assignments(
    student_assignment_id SERIAL PRIMARY KEY,
    course_id VARCHAR(20) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    professor_assignment_id VARCHAR(20) NOT NULL,
    grade DECIMAL,
    student_submission_date DATE,
    student_file BYTEA
);

CREATE TABLE professor_assignments(
    professor_assignment_id SERIAL PRIMARY KEY,
    course_id VARCHAR(20) NOT NULL,
    professor_title TEXT,
    professor_text TEXT,
    professor_submission_date DATE,
    professor_total DECIMAL,
    professor_file BYTEA
);
