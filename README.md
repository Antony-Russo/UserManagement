User Management Dashboard

Overview

The User Management Dashboard is a React-based web application designed to manage a list of users. It includes features such as fetching, adding, editing, and deleting users. The app uses axios for API requests, react-toastify for notifications, and react-icons for UI enhancements.

Project Setup

Prerequisites

Before setting up the project, ensure the following are installed on your system:

Node.js (v14 or later)

npm or yarn

Installation

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd <project-folder>

Install dependencies:

npm install
# or
yarn install

Start the development server:

npm start
# or
yarn start

Directory Structure

project-folder/
├── src/
│   ├── components/
│   │   ├── Home.jsx      # Main component for the dashboard
│   │   └── index.css     # CSS for styling the components
│   ├── App.js           # Entry point for rendering components
│   ├── index.js         # ReactDOM rendering
│   └── assets/          # Contains images for the application
├── package.json         # Project dependencies
└── README.md            # Documentation

Components

Home.jsx

The Home component is the primary interface for user management. It includes the following features:

Fetch Users:

Retrieves users from the JSONPlaceholder API.

Displays users in a dashboard format.

Add/Edit User:

Opens a dialog form to add or edit user details.

Validates fields like name, email, and department.

Uses axios.post and axios.put for respective API calls.

Delete User:

Deletes a user via axios.delete.

Updates the state to remove the user from the list.

Loader and Error Handling:

Displays a loader while fetching data.

Shows an error message if the API call fails.

Dialog Management:

Handles opening and closing of dialogs for user management.

Styling

All styles are defined in index.css.

Challenges Faced

API Limitations:

The application relies on the JSONPlaceholder API, which is a mock API. It doesn't persist changes.

Form Validation:

Ensuring proper validation for required fields and email formats was crucial.

Dialog Behavior:

Handling click events to close the dialog without interfering with form interactions.

Potential Improvements

API Integration:

Replace JSONPlaceholder with a backend API to persist data.

Styling Enhancements:

Use a CSS-in-JS library like styled-components or a utility-first CSS framework like TailwindCSS.

State Management:

Integrate a global state management library like Redux or React Context for scalability.
