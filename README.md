# challenge

This repository constitutes a solution to a programming challenge.

## the challenge

The structure of a database is given by a JSON file, which contains
an array of table objects. Each table has an array of columns which 
may or may not be a foreign key, matching a column in another table. 

A table which holds a column with a foreign key must not be created
before that referenced table has been created. 

The challenge is to write a program that reads the JSON file `database.json` and outputs a legal order of for creating the tables. 

## the solution

The challenge is solved by recognizing that the problem is equivalent 
to a traversal of a directed acyclic graph, possibly disconnected. The
database is first converted to an adjacency list in the form of a 
hash map, and then fed to a topological-sort solver. The main function, sortTables(), takes in a path to the JSON file and returns a list of 
table names in the order they should be implemented. 

## run tests

Install jest from package by running `npm install` and then run the tests
trough `npm test`.
