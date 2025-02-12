IRCTC-like Railway Management System
This project is a railway management system similar to IRCTC, where users can:

Check train availability between two stations.

View seat availability.

Book seats in real-time.

Handle high traffic and concurrent bookings.


Features
User Registration and Login: Users can register and log in to book tickets.

Admin Functionality: Admins can add trains and update seat availability.

Train Search: Users can search for trains between two stations.

Seat Booking: Users can book seats if availability > 0.

Concurrency Handling: The system handles multiple users booking seats simultaneously.

Real-Time Updates: Seat availability is updated in real-time.


Tech Stack
Backend: Node.js, Express.js

Database: MySQL

Authentication: JSON Web Tokens (JWT)

Real-Time Updates: WebSockets (optional)

Testing: Thunder Client (VS Code Extension)



Set Up the Database:

Create a MySQL database named irctc.

Run the following SQL queries to create the tables:


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    train_name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    train_id INT NOT NULL,
    seats_booked INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);


Set Up Environment Variables:

Create a .env file in the root directory:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc
JWT_SECRET=your_random_secret_key



API Endpoints
1. Auth Routes
Register User: POST /api/auth/register

Login User: POST /api/auth/login

2. Train Routes
Add Train (Admin Only): POST /api/trains/add

Search Trains: GET /api/trains/search?source=StationA&destination=StationB

3. Booking Routes
Book a Seat: POST /api/bookings/book

Get Booking Details: GET /api/bookings/:bookingId


Start the server:
node app.js