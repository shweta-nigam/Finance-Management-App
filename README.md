# 📊 FinEase – Personal Finance Tracker

**FinEase** is a full-stack personal finance tracker that helps users manage their budgets, expenses, and categories.  
It comes with a **Node.js + Express + MongoDB backend** and a **React + TypeScript frontend**.

---

## ✨ Features

- 🔐 **User Authentication** – Signup, Login, JWT-based sessions, Google OAuth
- 💸 **Budget Management** – Add, update, and track budgets
- 🧾 **Expense Tracking** – Record expenses with categories & dates
- 📊 **Dashboard** – Visualize spending with charts & summaries
- 📬 **Email Verification** – Secure signup with token-based email verification
- 🎨 **Modern UI** – Built with React, TailwindCSS, and ShadCN components

---

## 🛠 Tech Stack

### ⚛️ Frontend
- React + TypeScript  
- TailwindCSS + ShadCN UI  
- Context API for state management  
- React Router for navigation  

### 🔧 Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- bcrypt for password hashing  
- Nodemailer for email verification  
- Zod for schema validation  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/FinEase.git
cd FinEase


2️⃣ Backend Setup
cd backend
npm install


Create a .env file in /backend with:

PORT=8080
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password


Run backend server:

npm run dev

👉 Server runs on http://localhost:8080

3️⃣ Frontend Setup
cd frontend
npm install


Create a .env file in /frontend with:

VITE_API_URL=http://localhost:8080/api/v1


Run frontend:
npm run dev


👉 App runs on http://localhost:5173

## Usage

Signup with your email → verify via email.
Login → access the dashboard.
Add a Budget (monthly, weekly, etc.).
Record Expenses → track spending.
See your total balance and category-wise charts.

## 🤝 Contributing

Fork the repo
Create a feature branch (git checkout -b feature-name)
Commit changes (git commit -m "Added new feature")
Push branch (git push origin feature-name)
Open a PR 

## 📜 License

MIT License © 2025 Shweta Nigam