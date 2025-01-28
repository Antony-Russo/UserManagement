# User Management Dashboard

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

## Overview

The **User Management Dashboard** is a React-based application that provides a user-friendly interface for managing users. It includes features for creating, editing, deleting, and listing users with real-time updates and validations.

## Features

- Fetch and display a list of users.
- Add new users with form validation.
- Edit existing user details.
- Delete users with confirmation.
- Responsive UI with a dashboard-like appearance.
- Notifications for success and error events using `react-toastify`.

## Technologies Used

- **Frontend**: React, CSS, `react-icons`
- **Backend API**: JSONPlaceholder (Mock API)
- **Libraries**: `axios`, `react-toastify`, `react-spinners`
- **Icons**: `react-icons`

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/user-management-dashboard.git
   cd user-management-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Project Structure

```plaintext
src/
├── components/
├── styles/
├── App.js
├── Home.js
├── index.js
├── index.css
```

- `components/`: Reusable components like buttons, dialogs, etc.
- `styles/`: Centralized CSS styles for the application.

## Usage

1. **Add User**: Click on the "Add User" button to open the form. Fill in the details and save.
2. **Edit User**: Use the edit button (✏️) on a user card to modify details.
3. **Delete User**: Click the delete button (🗑️) on a user card to remove the user.
4. **View Users**: Users are listed in a card format, showing their details such as name, email, and department.

## Screenshots

![Dashboard View](https://res.cloudinary.com/dyftxeexv/image/upload/v1737964143/dashboard.png)

![Add User Dialog](https://res.cloudinary.com/dyftxeexv/image/upload/v1737964143/add-user-dialog.png)

![Loader View](https://res.cloudinary.com/dyftxeexv/image/upload/v1737964143/loader.png)

## Future Enhancements

- Implement server-side validations.
- Add search and filter functionality.
- Integrate with a real backend API.
- Add role-based access control.
