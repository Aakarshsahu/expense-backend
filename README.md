# Expense Tracker - Backend

# Expense Tracker — Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Expense Tracker web app.  
It provides RESTful endpoints for managing expenses (CRUD operations) and generating category-wise summaries.  
Built using **Node.js**, **Express**, and **MongoDB Atlas**, and hosted on **Render**.

> 🟢 **Live API Base URL:** https://expense-backend-5eyp.onrender.com
> 🌐 **Frontend (Live):** https://expense-frontend-bay.vercel.app/

---

## 📘 Features
- Add, edit, delete, and view expenses  
- Display total expenses and category-wise summary  
- MongoDB Atlas integration  
- CORS enabled for frontend access  
- Organized folder structure for scalability  

---

## ⚙️ Tech Stack
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas (Mongoose ODM)  
- **Hosting:** Render  
- **Environment:** dotenv for secure config  


## Setup
1. Clone repo
2. `npm install`
3. Create `.env` with:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
4. Start MongoDB locally
5. `npm run dev` (or `npm start`)

## APIs
- GET  /api/expenses
- POST /api/expenses    { title, amount, category, date }
- PUT  /api/expenses/:id
- DELETE /api/expenses/:id
- GET  /api/expenses/summary  (category totals)
