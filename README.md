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
# 📸 Screenshots

| | |
| :---: | :---: |
| <img width="1916" height="863" alt="Screenshot 2026-10-22 115816" src="https://github.com/user-attachments/assets/d743dab0-6ad0-4a74-8668-9eedf6d5eac6" /> | <img width="1917" height="865" alt="Screenshot 2026-10-22 115828" src="https://github.com/user-attachments/assets/39e12fce-05cf-4955-87bb-bf9a3362737d" /> | 
| <img width="1917" height="862" alt="Screenshot 2026-10-22 115932" src="https://github.com/user-attachments/assets/e770cd56-affb-4959-a282-be29e2957bf8" /> | <img width="1917" height="875" alt="Screenshot 2026-10-22 115952" src="https://github.com/user-attachments/assets/d5af00c8-8c10-497b-ab49-37332f767a75" /> |
| <img width="420" height="398" alt="Screenshot 2026-10-22 115912" src="https://github.com/user-attachments/assets/b0dbc59b-807f-4ec5-b1a3-41361e34636a" /> | <img width="1917" height="875" alt="Screenshot 2026-10-22 115858" src="https://github.com/user-attachments/assets/3fafb347-2be8-413d-9b8a-8d25d121c9bd" /> |
| <img width="1917" height="862" alt="Screenshot 2026-10-22 115848" src="https://github.com/user-attachments/assets/36d1d1f4-3464-4b00-82e2-fb3937fd5b0d" /> |  |

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
VITE_API_BASE_URL=http://localhost:5000
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
