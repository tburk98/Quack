/*CREATE SCHEMA TestSchema

DELETE FROM TestSchema.Users where firstName IS NULL;

SELECT * FROM TestSchema.Users;

CREATE TABLE TestSchema.UsersCourses (
	s_id INT,
	c_id INT,
);*/

/*INSERT INTO TestSchema.UsersCourses (s_id, c_id) VALUES 
	(1, 3);*/

/*SELECT * FROM TestSchema.UsersCourses;*/

/*(SELECT 'User' as u, id, firstName, lastName FROM TestSchema.Users)

UNION

(SELECT 'Course' as c, id, name FROM TestSchema.Courses)*/

CREATE TABLE TestSchema.Roles (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	type NVARCHAR(50),
	courseID INT,
	userID INT
);

	
