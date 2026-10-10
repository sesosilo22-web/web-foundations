PRAGMA foreign_keys = ON;

CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL UNIQUE
);

CREATE TABLE enrolments (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id)
        REFERENCES students(id),
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
);

INSERT INTO students (id, name, email) VALUES
(1, 'Thando Mokoena', 'thando@example.com'),
(2, 'Lerato Nkosi', 'lerato@example.com'),
(3, 'Sipho Dlamini', 'sipho@example.com'),
(4, 'Ayanda Khumalo', 'ayanda@example.com');

INSERT INTO courses (id, course_name) VALUES
(1, 'Chemistry'),
(2, 'Mathematics'),
(3, 'Biology');

INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B'),
(2, 1, 'B'),
(2, 3, 'A'),
(3, 2, 'C');

SELECT students.name, courses.course_name, enrolments.grade
FROM students
JOIN enrolments ON students.id = enrolments.student_id
JOIN courses ON courses.id = enrolments.course_id
WHERE students.name = 'Thando Mokoena';

SELECT students.name, courses.course_name
FROM students
JOIN enrolments ON students.id = enrolments.student_id
JOIN courses ON courses.id = enrolments.course_id
WHERE courses.course_name = 'Chemistry';

SELECT
    courses.course_name,
    COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments ON courses.id = enrolments.course_id
GROUP BY courses.id, courses.course_name;

SELECT students.id, students.name
FROM students
LEFT JOIN enrolments ON students.id = enrolments.student_id
WHERE enrolments.student_id IS NULL;

UPDATE enrolments
SET grade = 'A'
WHERE student_id = 3
  AND course_id = 2;

SELECT students.name, courses.course_name, enrolments.grade
FROM enrolments
JOIN students ON students.id = enrolments.student_id
JOIN courses ON courses.id = enrolments.course_id
WHERE student_id = 3 AND course_id = 2;