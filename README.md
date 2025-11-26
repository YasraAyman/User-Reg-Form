**User Management System (UMS)**
This is a simple full-stack User Management System where you can *add, **view, **update, and **delete* users.
It uses a *Node.js + Express backend, **Firebase Firestore database, and a simple **HTML, CSS, JavaScript* frontend.

**📌 Features
✔ Add Users**
- Uses User Registration.html and Reg Form.js to collect data.

- Saves new user records to the Firebase Firestore users collection.

**✔ View Users**
- Displays all registered users in a table on the list.html page.

- Fetches data from the backend via a GET request.

**✔ Update Users**
- Edits user details using a pop-up form on the list.html page.

- Sends a PUT request to update the corresponding Firestore document.

**✔ Delete Users**
- Instantly removes a user record from Firestore using a DELETE request.

**✔ REST API**
Backend provides complete CRUD API at: 
http://localhost:5000/api/users

  ----
  
**🛠 Technologies Used
Backend**
- Node.js (Runtime Environment)

- Express.js (Web Framework for API)

- Firebase Admin SDK (firebase-admin)

- Firestore Database (NoSQL Data Store)

- CORS Middleware (Cross-Origin Requests)

**Frontend**
- HTML5 (User Registration.html, list.html)

- CSS3 (Style.css)

- JavaScript (Vanilla, uses Fetch API in Reg Form.js)

📂 Project Structure

| File Name                 | Role / Description                                                                                 |
|---------------------------|----------------------------------------------------------------------------------------------------|
| server.js                 | Core Backend: Express server defining and handling all /api/users CRUD endpoints.                  |
| firebase-config.js        | Configuration: Initializes the Firebase Admin SDK connection.                                      |
| serviceAccountKey.json    | [SENSITIVE] Firebase credentials needed by firebase-config.js. Must be in .gitignore.              |
| package.json              | Dependencies: Lists required Node packages (express, cors, firebase-admin) and the start script.   |
| User Registration.html    | Frontend: The form page for creating new users.                                                    |
| list.html                 | Frontend: The user list/dashboard page with Read, Update, and Delete functionality.                |
| Reg Form.js               | Client Script: Contains all JavaScript logic for form submission and making CRUD API calls.        |
| Style.css                 | Styling: Provides custom styles for the registration and list pages.                               |

**Backend DB Screenshot**
<img width="1810" height="892" alt="Backend DB  png" src="https://github.com/user-attachments/assets/fea468ca-7779-4c6e-9f74-c9f1da55a3c9" />

