# The ultimate to-do list app


## Table of contents

- [Overview](#overview)
  - [The Product](#frontend-behaviour)
  - [Run Commands](#frontend-behaviour)
  - [Links](#links)
  - [Built with](#built-with)
- [Author](#author)

## Overview

### The Assignment

## Users should be able to:

- Login, Signup, and Logout.
- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Create, read, update, and delete boards and tasks.
- Receive form validations when trying to create/edit boards and tasks.
- Mark subtasks as complete and move tasks between columns.
- Add, manage, and complete sub-subtasks within tasks.
- Hide/show the board sidebar.

## Frontend Behaviour:

### Boards
- Clicking different boards in the sidebar changes to the selected board.
- "Create New Board" in the sidebar opens the "Add New Board" modal.
- "Edit Board" from the dropdown menu opens the "Edit Board" modal for modifying details.
- Columns can be added or removed in the Add/Edit Board modals.
- Deleting a board, which requires confirmation, removes all associated columns and tasks.

 Columns
- At least one column is required before adding tasks; if none, the "Add New Task" button is disabled.
- "Add New Column" opens the "Edit Board" modal for column addition.

 Tasks
- New tasks are added to the bottom of the relevant column.
- Updating a task's status moves it to the appropriate column.
- Tasks include the functionality to add and manage sub-subtasks.

 Logging
- Options to log out and log in are available for user account management.

 User Experience
- Tasks can be dragged and dropped into different columns.

## Run Commands
  You could use the project on the live link to test out! However, if you wish to run it on your local PC, the run commands are as below:
  

## Links

- Project Demo: [link]()
- Live Site URL: [link](https://kanban-task-management-app.netlify.app/)
- Github Repo: [link]()

## Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- Drag and Drop API
- [React](https://reactjs.org/) - JS library
- [Redux](https://redux.js.org/) - State management tool

