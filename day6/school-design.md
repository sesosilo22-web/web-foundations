
# School Database Design

## Tables

### 1. Students
The students table stores each student's unique ID, name and email address. The ID is the primary key, and the email is required and must be unique so that two students cannot register with the same email address.

### 2. Courses
The courses table stores each course's unique ID and course name. The ID is the primary key, and the course name is required and unique.

### 3. Enrolments
The enrolments table records which student is enrolled on which course, together with their grade. It contains student_id and course_id as foreign keys referencing the students and courses tables. The combination of these two columns is the composite primary key, which prevents a student from enrolling on the same course more than once.

## Relationships

### One-to-many
The relationship between students and enrolments is one-to-many because one student can have multiple enrolment records, but each enrolment belongs to one student.

The relationship between courses and enrolments is also one-to-many because one course can have many students enrolled, but each enrolment refers to one course.

### Many-to-many
Students and courses have a many-to-many relationship. A student can take several courses, and each course can have several students. The enrolments table acts as a join table between them and stores additional information, such as the grade. Without this table, it would be difficult to represent the relationship correctly while maintaining data integrity.

## Index

I would add an index on enrolments(course_id) because queries often retrieve all students enrolled in a particular course. The index can help SQLite find matching enrolment records more efficiently.

## SQL or NoSQL?

I would choose a relational SQL database for this school system. Students, courses and enrolments have clear relationships, and foreign keys help maintain data integrity. SQL supports joins, grouping and counting, which are useful for finding course lists, calculating enrolment numbers and managing grades. SQLite is suitable for a small school database and is easy to run without setting up a separate database server.
