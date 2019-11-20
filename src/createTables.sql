CREATE DATABASE projectConnect;
USE projectConnect;
CREATE TABLE profile (
	profileID INT,
	first VARCHAR(20),
	last VARCHAR(20),
	username VARCHAR(20),
	password VARCHAR(32), # use MD5 for encryption?
	description VARCHAR(200),
	skills VARCHAR(200),
	PRIMARY KEY (profileID)
);
CREATE TABLE project (
	projectID INT,
	title VARCHAR(20),
	owner INT,
	description VARCHAR(200),
	dateCreated DATE,
	lastUpdated DATE,
	skillsNeeded VARCHAR(200),
	PRIMARY KEY (projectID),
	FOREIGN KEY (owner) REFERENCES profile(profileID)
);
CREATE TABLE connect (
	id INT,
	projectID INT,
	profileID INT,
	connectInfo VARCHAR(200),
	PRIMARY KEY (id),
	FOREIGN KEY (projectID) REFERENCES project(projectID),
	FOREIGN KEY (profileID) REFERENCES profile(profileID)
);