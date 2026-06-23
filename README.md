# Smart Free Time Utilizer - Frontend

An AI-powered productivity platform that helps users make better use of their available time by generating personalized micro-learning and activity recommendations based on interests, available duration, and past activity history.

## Features

* User Registration and Authentication
* Personalized Activity Recommendations
* AI-Powered Task Generation
* Activity History Tracking
* Responsive User Interface
* Real-Time Recommendation Display
* REST API Integration with Flask Backend

## Tech Stack

### Frontend

* React
* React Router
* Axios
* HTML5
* CSS3

### Backend

* Flask
* MySQL
* OpenRouter LLM APIs

## How It Works

1. Users create an account and log in.
2. Users provide available time and interests.
3. The application sends contextual information to the backend.
4. AI generates personalized micro-learning activities and productive tasks.
5. User activity history is stored to reduce repetitive recommendations.

## Screenshots

### Login Page

![Login](screenshots/login.png)

### Recommendation Dashboard

![Dashboard](screenshots/dashboard.png)

### Generated Activities

![Activities](screenshots/activities.png)

### Activity History

![History](screenshots/history.png)

> Add screenshots inside the `screenshots` folder to display them automatically in GitHub.

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── assets/
└── App.jsx
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

## Backend Repository

Backend:
https://github.com/Kalyanim14/Flask_SmartFreeTimeUtilizer

## Future Enhancements

* Weekly Productivity Reports
* User Goal Tracking
* Calendar Integration
* Advanced AI Personalization
* Mobile Application Support
