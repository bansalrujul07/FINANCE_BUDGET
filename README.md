# 💰 Personal Finance & Expense Analytics App

A modern **React-based personal finance management system** that helps users track income, manage expenses, monitor budgets, and gain actionable financial insights through analytics.

---

# 📌 Problem Statement

Managing personal finances is difficult due to scattered spending across multiple platforms like UPI, cards, subscriptions, and cash.

This application solves that problem by providing:

* Centralized transaction tracking
* Categorized expense management
* Budget monitoring
* Real-time analytics and insights

---

# 🎯 Product Goals

### Primary Goals

* Record income & expense transactions
* Categorize financial activity
* Track budgets
* Analyze spending patterns
* Visualize financial data

### Secondary Goals

* Improve financial awareness
* Encourage better spending habits
* Demonstrate scalable React architecture

---

# 👥 Target Users

* Students managing expenses
* Early professionals
* Freelancers with irregular income

---

# ⚙️ Tech Stack

* React (Vite)
* React Router DOM
* Context API (State Management)
* React Hook Form + Yup (Form Handling & Validation)
* Recharts (Data Visualization)
* Axios (API Calls)
* Date-fns (Date Handling)
* UUID (Unique IDs)
* Framer Motion (Animations)
* React Toastify (Notifications)
* React Icons

---

# 🧱 Project Architecture

```
src/
│
├── components/
│   ├── TransactionCard.jsx
│   ├── Charts/
│   ├── SearchBar.jsx
│   ├── Filters.jsx
│   ├── BudgetCard.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── AddTransaction.jsx
│   ├── Budget.jsx
│   ├── Analytics.jsx
│
├── context/
│   ├── FinanceContext.jsx
│
├── hooks/
│   ├── useTransactions.js
│   ├── useBudget.js
│   ├── useDebounce.js
│   ├── useCurrency.js
│
├── services/
│   ├── api.js
│
├── utils/
│   ├── currencyFormatter.js
```

---

# ✨ Features Implemented

## 1️⃣ Add Transactions

* Add income and expense entries
* Fields: Title, Amount, Category, Date, Type, Notes
* Form built using **react-hook-form**
* Validation using **Yup**

---

## 2️⃣ Transaction List

* Displays all transactions
* Shows:

  * Title
  * Category
  * Amount
  * Date
  * Type
* Supports:

  * Edit
  * Delete

---

## 3️⃣ Search Functionality

* Search by:

  * Title
  * Notes
* Debounced input using custom hook

---

## 4️⃣ Filtering

* Filter by:

  * Category
  * Transaction Type
  * Date Range

---

## 5️⃣ Sorting

* Sort transactions by:

  * Date
  * Amount
  * Category

---

## 6️⃣ Budget Tracking

* Set monthly budget
* Displays:

  * Total spending
  * Remaining budget
  * Percentage used

---

## 7️⃣ Analytics Dashboard

* Total Income
* Total Expenses
* Net Balance
* Top Spending Category

### Charts:

* Pie Chart → Category-wise spending
* Line Chart → Monthly trend
* Bar Chart → Income vs Expense

---

## 8️⃣ Recurring Transactions

* Mark expenses as recurring
* Highlight recurring entries

---

# 🧠 State Management

Implemented using **Context API**

### Global State Includes:

* transactions
* addTransaction()
* deleteTransaction()
* updateTransaction()
* budget

Data is persisted using **localStorage**

---

# 🔄 Custom Hooks

* `useTransactions()` → Handles CRUD operations
* `useBudget()` → Budget calculations
* `useDebounce()` → Optimized search
* `useCurrency()` → Currency formatting

---

# 🌐 Routing

| Route             | Page            |
| ----------------- | --------------- |
| /dashboard        | Dashboard       |
| /transactions     | Transactions    |
| /transactions/new | Add Transaction |
| /budget           | Budget          |
| /analytics        | Analytics       |

---

# 📊 API Integration

* Currency Exchange API (via Axios)
* Enables currency conversion functionality

---

# 🧪 Evaluation Criteria Mapping

| Criteria                       | Implementation                                                      |
| ------------------------------ | ------------------------------------------------------------------- |
| **Feature Completeness (25%)** | All PRD features implemented including analytics, budget, filtering |
| **React Architecture (25%)**   | Modular structure, reusable components, clean folder organization   |
| **State Management (20%)**     | Context API + custom hooks                                          |
| **UI Design (15%)**            | Responsive dark UI with charts and dashboard                        |
| **Code Quality (15%)**         | Clean, reusable, maintainable code                                  |

---


# 📌 Future Enhancements

* Authentication system
* Cloud database integration
* Advanced analytics (AI insights)
* Export reports (PDF/CSV)
* Financial news integration

---

# 🙌 Conclusion

This project demonstrates:

* Strong React fundamentals
* Scalable architecture
* Real-world problem solving
* Production-level UI and features

It simulates a **real-world fintech application** with end-to-end functionality.

---
