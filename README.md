# Expense Tracker - Backend

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
