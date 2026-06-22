# ✈️ AI Travel Planner

An AI-powered travel planning web application that generates personalized travel itineraries based on destination, duration, budget, and interests using Google's Gemini API.

---

## 🚀 Live Demo

### Frontend

https://ai-travel-planner-three-dun.vercel.app

### Backend

https://ai-travel-planner-backend-vwpo.onrender.com

---

## ✨ Features

* User Registration and Login
* JWT Authentication
* Protected Routes
* AI-powered Trip Generation
* Day-wise Itinerary
* Budget Breakdown
* Hotel Recommendations
* View Trip Details
* Delete Trips
* Responsive User Interface

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs

### AI Integration

* Google Gemini API

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```text
ai-travel-planner
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   └── pages
│   └── public
│
├── screenshots
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/pranav-ukey/ai-travel-planner.git

cd ai-travel-planner
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Start Frontend

```bash
npm run dev
```

---

## 🔐 Authentication

JWT-based authentication is used to secure the application.

Protected Routes:

* Dashboard
* Create Trip
* Trip Details

Only authenticated users can access these pages.

---

## 🤖 AI Trip Generation

Users provide:

* Destination
* Duration
* Budget
* Interests

Google Gemini AI generates:

* Day-wise itinerary
* Activity descriptions
* Estimated budget
* Hotel recommendations

---

## 📸 Screenshots

### Login Page

![Login Page](./screenshots/login-page.png)

---

### Register Page

![Register Page](./screenshots/register-page.png)

---

### Dashboard

![Dashboard](./screenshots/dashboard.png)

---

### Create Trip

![Create Trip](./screenshots/create-trip.png)

---

### Trip Details

![Trip Details](./screenshots/trip-details.png)

---

## 🌐 Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## 🔮 Future Improvements

* Weather Information
* Flight Recommendations
* Maps Integration
* Expense Tracking
* PDF Export
* Share Trips with Others

---

## 👨‍💻 Author

### Pranav Ukey

GitHub:
https://github.com/pranav-ukey

LinkedIn:
https://www.linkedin.com/in/pranav-ukey

---

Built with ❤️ using React, Node.js, MongoDB Atlas, and Gemini AI.
