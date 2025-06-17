# QR Pass Management System

A full-stack application for managing event passes using QR codes. This system allows for secure generation, validation, and management of event passes with QR code functionality.

## Project Structure

The project is divided into two main components:

### Backend (`/backend`)
- Built with Node.js and Express
- MongoDB database integration
- RESTful API architecture
- JWT authentication
- QR code generation and validation

### Frontend (`/frontend`)
- React-based user interface
- QR code scanning and display
- User authentication and management
- Event pass management interface

## Features

- User authentication and authorization
- QR code generation for event passes
- Real-time pass validation
- Event management
- User management
- Secure pass distribution
- Email notifications
- Session management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd qr-pass-system
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend/qr-pass-frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend/qr-pass-frontend
npm start
```

## API Endpoints

The backend provides the following main API endpoints:

- Authentication:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/logout

- Pass Management:
  - GET /api/passes
  - POST /api/passes
  - GET /api/passes/:id
  - PUT /api/passes/:id
  - DELETE /api/passes/:id

- Event Management:
  - GET /api/events
  - POST /api/events
  - GET /api/events/:id
  - PUT /api/events/:id
  - DELETE /api/events/:id

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- nodemailer for email notifications
- qrcode for QR code generation
- cors for cross-origin resource sharing
- dotenv for environment variables

### Frontend
- React
- Material-UI (or your chosen UI framework)
- Axios for API calls
- React Router for navigation
- QR code scanning library

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Secure session management
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, please open an issue in the repository or contact the development team. 
