# Authentication Page Project

A complete authentication system with Angular frontend and .NET backend using SQLite database.

## Features

- **User Registration**: Sign up with username and password
- **User Login**: Authenticate with stored credentials
- **Password Security**: Passwords are hashed using BCrypt
- **Input Validation**: Client and server-side validation
- **Modern UI**: Beautiful, responsive design
- **Error Handling**: Proper error messages and feedback
- **Database**: SQLite for easy setup and deployment

## Prerequisites

- **Node.js** (v18 or higher)
- **Angular CLI** (`npm install -g @angular/cli`)
- **.NET 8 SDK**
- **Git** (optional)

## Setup Instructions

### 1. Backend Setup (.NET)

```bash
# Navigate to backend directory
cd backend

# Restore packages
dotnet restore

# Run the backend server
dotnet run
```

The backend will start at `https://localhost:7000`

### 2. Frontend Setup (Angular)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start at `http://localhost:4200`

## Usage

1. **Open your browser** and go to `http://localhost:4200`

2. **Sign Up**: 
   - Click "Sign Up" if you don't have an account
   - Enter a username and password
   - Click "Sign Up" button
   - You'll see a success message if registration is successful

3. **Login**:
   - Enter your username and password
   - Click "Login" button
   - If successful, you'll be redirected to a success page

## API Endpoints

### POST `/api/auth/register`
Register a new user
```json
{
  "username": "string",
  "password": "string"
}
```

### POST `/api/auth/login`
Login with existing credentials
```json
{
  "username": "string",
  "password": "string"
}
```

## Database

- Uses **SQLite** database (`auth.db`)
- Database is created automatically on first run
- User passwords are hashed with BCrypt
- Username uniqueness is enforced

## Error Messages

- **Login**: "Incorrect username/password"
- **Registration**: "Username has been used, try another."
- **Success**: "Account created successfully! You can now login."
- **Login Success**: Redirects to success page

## Development

### Backend Development
- Built with .NET 8 Web API
- Entity Framework Core for database operations
- BCrypt.Net for password hashing
- CORS enabled for Angular frontend

### Frontend Development
- Built with Angular 17
- Standalone components
- Reactive forms for validation
- HttpClient for API communication
- Modern CSS with gradients and animations

## Troubleshooting

1. **CORS Issues**: Make sure both frontend and backend are running on their specified ports
2. **Database Issues**: Delete `auth.db` file and restart backend to recreate
3. **Port Conflicts**: Check if ports 4200 and 7000 are available
4. **Package Issues**: Run `npm install` in frontend and `dotnet restore` in backend

## Security Features

- Password hashing with BCrypt
- Input validation on both client and server
- HTTPS support
- SQL injection prevention with Entity Framework
- XSS protection with Angular's built-in sanitization 