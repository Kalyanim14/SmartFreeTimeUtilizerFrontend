# Smart Free Time Utilizer

An AI-powered productivity platform that helps users make better use of their available time by generating personalized micro-learning and activity recommendations — based on interests, available duration, and past activity history.

![Tech](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Tech](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) ![Tech](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white) ![Tech](https://img.shields.io/badge/LLM-OpenRouter-blueviolet)

<!-- 📸 Add a screenshot or GIF here — e.g. recommendation generation flow -->
<!-- ![Demo](./screenshots/demo.gif) -->

## Overview

Built to tackle decision fatigue during downtime — instead of scrolling aimlessly, users get one concrete, personalized task matched to the exact minutes they have available. The system uses an LLM to generate suggestions and tracks history to avoid repeating past recommendations.

## Features

- User registration and authentication
- Personalized activity recommendations based on time and interests
- AI-powered task generation via LLM
- Activity history tracking to reduce repetitive suggestions
- Real-time recommendation display
- Fully responsive UI

## How It Works

1. User logs in and provides available time and interests.
2. Frontend sends this context to the Flask backend.
3. Backend retrieves the user's recent activity history.
4. Combined context is sent to the LLM.
5. AI generates a personalized micro-learning or activity task.
6. Recommendation is displayed and logged for future personalization.

## Architecture

```
┌─────────────┐   REST    ┌─────────────┐   Context + History    ┌──────────────┐
│   React UI  │ ───────▶ │    Flask     │ ─────────────────────▶│  OpenRouter  │
│ (this repo) │ ◀─────── │   Backend    │ ◀─────────────────────│   LLM API    │
└─────────────┘  JSON     └─────────────┘      AI Response       └──────────────┘
                                │
                                ▼
                          ┌───────────┐
                          │   MySQL    │
                          └───────────┘
```

## Tech Stack

**Frontend:** React, React Router, Axios, HTML5, CSS3
**Backend:** Flask, MySQL, OpenRouter LLM API *(see [backend repo](https://github.com/Kalyanim14/Flask_SmartFreeTimeUtilizer))*

## Project Structure

```
src/
├── components/
├── pages/
├── services/
├── assets/
└── App.jsx
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- The [backend service](https://github.com/Kalyanim14/Flask_SmartFreeTimeUtilizer) running locally (see that repo for setup, including the OpenRouter API key)

### Installation

```bash
git clone https://github.com/Kalyanim14/SmartFreeTimeUtilizerFrontend.git
cd SmartFreeTimeUtilizerFrontend
npm install
```

### Configuration

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** Not hosted live, since production-grade backend hosting isn't free. Follow the steps above to run the full stack locally, including the backend, in a couple of minutes.

## Related Repository

- **Backend:** [Flask_SmartFreeTimeUtilizer](https://github.com/Kalyanim14/Flask_SmartFreeTimeUtilizer) — Flask API, LLM integration, and database

## Future Enhancements

- Weekly productivity reports
- User goal tracking
- Calendar integration
- Advanced AI personalization
- Mobile application support

## Author

**Kalyani Mantramurthi**
[LinkedIn](https://www.linkedin.com/in/kalyani-mantramurthi-562720258/) · [GitHub](https://github.com/Kalyanim14/)
