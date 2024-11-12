# Mini Bank Project

Welcome to the **Mini Bank Project**! This is a full-stack application built using the **MERN stack** (MongoDB, Express, React, Node.js). This project allows users to securely sign up, log in, upload profile photos, view and edit their details, and manage bank transactions such as deposits and withdrawals. Admins can manage user profiles and view transaction histories.

## Features

### User Features:
- **Sign Up and Login**: Users can sign up, log in securely, and authenticate using JWT (JSON Web Tokens).
- **Profile Management**: Users can upload a profile photo, view their details, and edit their profile.
- **Bank Transactions**: Users can deposit and withdraw money, as well as see their transaction history.

### Admin Features:
- **User Management**: Admins can view user profiles and transaction histories.
- **Activity Monitoring**: Admins can track how many users are logged in.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building dynamic user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating responsive designs quickly.
- **React Router DOM**: For handling routing within the app.
- **Axios**: For making HTTP requests to the backend.
- **React Icons**: For adding icons to the user interface.
- **React Toastify**: For displaying toast notifications to users.

### Backend
- **Express**: A web framework for Node.js to handle server-side logic.
- **MongoDB**: A NoSQL database used for storing user and transaction data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: For secure user authentication.
- **bcryptjs**: For hashing and securing user passwords.
- **Multer**: Middleware for handling file uploads (used for profile photos).
- **CORS**: For handling cross-origin requests.
- **dotenv**: For managing environment variables.

## Getting Started

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-mini-bank-repo.git
cd your-mini-bank-repo
```
### 2. Install Dependencies
Backend
```
cd backend
npm install
```
Frontend
```
cd frontend
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the backend directory and add the following environment variables:
```
DB_CONNECTION=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
```
### 4. Run the Application
To start the backend server:
```
cd backend
npm start
```
To start the frontend client:
```
cd frontend
npm start
```
### 5. Access the Application
Open your browser and go to http://localhost:3000 to view the Mini Bank app.
### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to fork the repository, open an issue, or submit a pull request.
### Feedback
Thank you for checking out the project! Feel free to share any feedback or ideas to improve the Mini Bank Project
```

### Notes:
- Replace `yourusername` and `your-mini-bank-repo` with your actual GitHub username and repository name.
- Ensure your backend environment variables are securely set, particularly for sensitive data like MongoDB connection strings and JWT secrets.

This README provides a clear overview of your project, features, and how others can get it up and running locally. Let me know if you need any more changes!
