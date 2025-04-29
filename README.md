# NeatNest - Home Inventory Management System

## Overview

**NeatNest** is a smart and efficient home inventory management system that helps users organize, track, and optimize their household essentials. With features like smart suggestions, inventory categorization, expiry alerts, and seamless user experience, NeatNest ensures you never run out of important items again.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Recommendation Engine**: Gorse
- **ORM**: Sequelize

---

## Features

- User Authentication (Username & Password validation)
- CRUD operations for Inventory
- Inventory Categories management
- Smart Recommendations via Gorse (frequent buys, expiry alerts, seasonal needs)
- Activity Log (track recent actions)
- Filtering by category, expiry, and quantity
- Responsive UI built with Tailwind CSS

---

## Project Structure

NeatNest/ ├── client/ # React Frontend │ └── src/ │ ├── components/ │ ├── pages/ │ └── App.jsx ├── server/ # Node.js Backend │ ├── controllers/ │ ├── middlewares/ │ ├── models/ │ ├── routes/ │ ├── services/ │ ├── utils/ │ ├── config/ │ ├── app.js │ └── server.js ├── .env └── README.md

---

## Backend Setup

- cd server
- npm install
- npm start

---

## Frontend Setup

- cd client
- npm install
- npm run dev

