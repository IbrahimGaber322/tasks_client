# Tasks Client Readme

This repository contains the frontend code for the Task Manager Application. It is built using React.js and TypeScript, with Material-UI for styling.

## Installation

To run the Task Client, follow these steps:

1. Ensure that you have Node.js installed on your machine.

1. Clone this repository to your local machine.

1. Navigate to the repository directory using the command line.

1. Run the following command to install the required dependencies:

   ```
   npm install
   ```

## Configuration

Before running the Task Client, make sure to configure the backend server URL. Open the `.env` file and set the `REACT_APP_SERVER_URL` variable to the URL where the Task Server is running.

```dotenv
REACT_APP_SERVER_URL=http://localhost:8000  # Replace with your backend server URL
```

## Usage

To start the Task Client, use the following command:

```
npm start
```

This will start the development server and open the application in your default web browser. The application will automatically reload if you make any changes to the source code.

## Features

The Task Client includes the following features:

1. **Get all tasks**: Fetch tasks from the backend API and display them in a list.

2. **Add a new task**: Use the form to add new tasks with fields for taskName, description, and dueDate.

3. **Mark a task as completed**: Click on the button to mark a task as completed.

4. **Delete a task**: Click on the button to delete a task.

5. **Update Task**: Allow users to edit and update existing tasks.

6. **Filter and Sorting**: Implement the ability to filter tasks based on completion status or due date. Allow users to sort tasks by due date or completion status.

7. **Task Categories/Tags**: Allow users to categorize tasks by adding tags or categories. Implement a feature to filter tasks by tags.

8. **Pagination**: If the number of tasks is large, implement pagination on the backend and frontend to display tasks in smaller, manageable chunks.

9. **User Authentication**: Add user authentication and allow users to have their task lists. Each user should only see and manage their tasks.

10. **Task Sharing**: Implement the ability for users to share individual tasks with others via a unique link.

11. **Task Comments**: Allow users to add comments to tasks and view a list of comments on each task.

12. **Data Validation**: Ensure that all input data is properly validated on both the frontend and backend to prevent any potential security vulnerabilities.

##Live Version

You can check out the live version on this link: [live](https://tasks-kabg.onrender.com)

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. Please make sure to follow the established coding style and guidelines.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

## Contact

If you have any questions or concerns, feel free to contact the author:

Author: Ibrahim Gaber
Email: ibrahimseda322@gmail.com

Thank you for using the Task Client!
