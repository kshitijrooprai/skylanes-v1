This is a Flight Reservation System application designed to help users book flights. It has a user-friendly interface built with HTML, CSS, and JavaScript for the frontend. 
The backend uses Node.js, Express and MongoDB as the Database.

Features:
- Flight booking system
- User authentication
- Flight search and booking
- User profile management
- Secure authentication using JWT

Technologies Used:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB

Steps to Run the Application:

1) Clone the repository
2) Install Dependencies:
Run the following command to install all the necessary dependencies:
"npm install"

3) Configure Environment Variables:
Create a '.env' file in the root directory of your project.
Set up the following variables in the .env file:
MONGO_URL="Provide a valid MongoDB URL"
JWT_SECRET="Your JWT Secret Key"
PORT="Provide a port number (e.g. 5000)

4) Start the Application: Run the following command to start the backend server:
"npm run start"

5) Access the Application: After starting the server, open your browser and visit http://localhost:PORT (the default port is typically 3000).

How to Use:
- Sign up and log in to the system using the authentication feature.
- Search and book flights by selecting the source, destination, and travel dates.
- Manage your flight reservations and profile.
