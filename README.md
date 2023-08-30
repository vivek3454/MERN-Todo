# Todoblocks - A MERN Stack Todo App

The Todoblocks Todo App is a full-stack web application that allows users to efficiently manage their todos. It provides various features such as user authentication, signup, login, logout, profile management, and CRUD operations for todos. The app consists of three sections: All Todos, Completed Todos, and Pending Todos, enabling users to organize their tasks effectively.

![Demo]()

## Features

- **User Authentication:** Users can signup, signin, and logout from the application.
- **Profile Management:** Users can update their profile information, including name.
- **Todo Management:** Users can add, remove, and update their todos.
- **Todo Status:** Users can mark todos as completed or pending.
- **Todo Sections:** The app categorizes todos into All Todos, Completed Todos, and Pending Todos sections.
- **Page Not Found:** A custom 404 page is displayed when users try to access non-existent pages.

## Technologies Used

The MERN Todo App is built using the following technologies:

- **Frontend:** React.js, HTML, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Password Encryption:** bcrypt
- **Other Dependencies:** cookie-parser, password-validator, cors

## API Endpoints

The app exposes the following API endpoints:

- `POST /signup`: Handles user signup.
- `POST /signin`: Handles user signin.
- `GET /logout`: Handles user logout.
- `POST /user`: Retrieves user information.
- `PUT /updatUserProfile`: Updates user profile.
- `PUT /updatUserPassword`: Updates user password.
- `POST /deleteUser`: Deletes user account.
- `POST /create`: Creates a new todo.
- `POST /allTodos`: Retrieves all todos.
- `POST /completed`: Retrieves completed todos.
- `POST /pending`: Retrieves pending todos.
- `PUT /status`: Updates todo status (completed or pending).
- `PUT /update`: Updates todo.
- `POST /delete`: Deletes todo.

## Usage

Follow these steps to run the MERN Todo App on your local machine:


1. Start the backend server:

   ```bash
   cd server 
   npm install
   # Add .env file (PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-app
   CLIENT_URL=http://localhost:5173
   SECRET=SECRET)
   npm start
   ```

2. Start the frontend server:

   ```bash
   cd client
   npm install
   npm run dev/start
   ```

3. Access the app in your web browser:

   ```bash
   http://localhost:5173
   ```

**Note:** Make sure to update the port number (`3000`) according to your client server configuration.
