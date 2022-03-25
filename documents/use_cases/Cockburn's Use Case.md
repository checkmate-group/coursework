![](../../.git_assets/logo.png "Logo")

#  Cockburn's Use Case


## Use case
- Display info

## Goal in Context
- User  requests a information from the dropdown list , expects to have his 
information listed on display.

## Success end condition
- WebApp displays desired information

## Failed End Condition
- WebApp does not display the information 

## Primary, Secondary Actors
-User
-WebApp
-Server
-Database

## Trigger
-Web App receives a query

## Description

| Step 	| Action 	|
|---	|---	|
| 1 	| User access our Webpage/WebApp Homepage 	|
| 2 	| User goes to Login page	|
| 3 	| User access the Database Viewer 	|
| 4 	| User chooses the desired element from dropdown list	|
| 5 	| WebApp send the query to Server 	|
| 6 	| Server receives query and sends to Database 	|
| 7 	| Database receive the query and filters the database according to the query 	|
| 8 	| Database send the filtered information back to server 	|
| 9 	| Server sends the information back to WebApp	|
| 10 	| WebApp displays the filtered information	|

## Extension
| Step 	| Action 	|
|---	|---	|
| 1 	| a. Can go to About Us section to see more information about the group, End-user 	|
| 2 	| a. User/password are incorrect then it stays on Homepage and asks to input the      correct credentials	|
| 3 	| a. User/password are correct, then goes to step 3 	|


## Issues 
-what happends if user doesn't have login credentials

## Due date
-Release 4.0

