# Quiz App

The Quiz App is a full-stack application designed to create, manage, and take quizzes. It consists of a React frontend for the user interface and a Node.js backend to handle data storage, authentication, and business logic.

## Project Structure

### Frontend (React)

- `App.css`: Cascading Style Sheets (CSS) file containing styles specific to the React application.
- `App.tsx`: Main TypeScript file for the React application, containing the root component.
- `Routing.tsx`: TypeScript file defining the application's routing configuration.
- `Types.ts`: TypeScript file containing type definitions used across the frontend application.
- `apiService.ts`: TypeScript file defining the API service for making requests to the backend.
- `assets/`: Directory containing static assets such as images, icons, and fonts.
- `components/`: Directory containing reusable React components used throughout the application.
- `index.css`: CSS file containing global styles applied to the entire application.
- `main.tsx`: TypeScript file responsible for rendering the main React application.
- `pages/`: Directory containing individual page components for different sections of the application.
- `vite-env.d.ts`: TypeScript file defining types for Vite environment variables.

### Backend (Node.js)

- `config/`: Directory containing configuration files for the backend application.
- `controllers/`: Directory containing controller modules responsible for handling HTTP requests and responses.
- `database/`: Directory containing database configuration files and migrations.
- `model/`: Directory containing database models representing entities such as quizzes, questions, and answers.
- `routes/`: Directory containing route definitions for the backend API endpoints.

## Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd quiz-app
   cd client
   npm install
   npm run dev

   cd server
   npm install
   npm run start
