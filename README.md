# E-Learning API

This is part of a project called E-Learning. This API is made for an application
which is focused on online learning.

The users (whoever downloaded the app) can see the courses on the main screen
and navigate into the lessons of which course, and the process is saved as the
user goes on and on.

# Installation

To install this API you need to run `yarn` to install all the dependencies and
then run `yarn dev` to start de developement server.

# API informations

## Configuration

This project was made with Node.js + Typescript.

## Database

E-Learning database was made with **PostgreSQL**. All the management and
connection have been done with **Typeorm**. Exemple archive configuration for
Typeorm is included to help you with all this.

For more informations to deal with Typeorm read the [docs](https://typeorm.io/#/)

## Environment variables

There are some environment variables which need to be set up.

* APP_SECRET

This variable sets the secret to the project, and needs to be set up before you
run the development server, otherwise some functionalities will not work fine.
The value for this can be anything you want.

* API_URL

This variable sets up the URL of the server.

* WEB_URL

This variable sets up the URL of the frontend server.

## Routes

Here is a list of E-Learning's routes:

| Method | Route | Module | Objective |
| ------ | ----- | ------ | --------- |
| POST | /users  | User | Saves a new user into the database |
| POST | /sessions | Session | Does the application authentication |
| GET  | /lessons | Lesson | Gets all lessons from the database |
| GET  | /lessons/:id | Lesson | Finds a specific lesson from database |
| GET  | /course-lessons/:id | Lesson | Gets all lessons from a specific course |
| POST | /lessons | Lesson | Saves a new lesson into the database |
| PUT  | /lessons/:id | Lesson | Does the update of a specific lesson |
| GET  | /courses | Course | Gets all courses from the database |
| GET  | /courses/:id | Course | Finds a specific course from database |
| POST | /courses | Course | Saves a new course into the database |
| PUT  | /courses/:id | Course | Does the update of a specific course |

# Front-End

This API works together with the frontend mobile app which can be found in [here](https://github.com/gui10l1/elearningapp).
