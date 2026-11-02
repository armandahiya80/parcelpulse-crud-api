# ParcelPulse — Campus Courier & Package Gate Tracker 📦

A full-stack, beginner-friendly CRUD web application built specifically for university viva and practical evaluations. **ParcelPulse** digitalizes the campus gate inward register, allowing security guards and hostel wardens to log student packages, organize them into shelf codes, track pickup statuses in real time, and notify students upon collection.

---

## 🛠 Tech Stack

- **Backend**: Node.js & Express.js (MVC Pattern)
- **Database**: MongoDB Atlas with Mongoose ODM
- **Frontend**: Pure HTML5 & Vanilla CSS3 (Served statically via Express `public` folder; minimal inline `fetch` calls — **Zero frontend frameworks, NO React, NO TypeScript, NO Bootstrap, NO Tailwind**)
- **Development**: Nodemon, Dotenv

---

## 📁 Project Architecture (MVC Pattern)

```text
parcelpulse-crud-api/
├── models/
│   └── parcel.model.js          # Mongoose Schema & Data Model
├── controllers/
│   └── parcel.controller.js     # Business Logic for all 5 CRUD operations
├── routes/
│   └── parcel.route.js          # Express Router mapping HTTP verbs to controllers
├── public/
│   ├── index.html               # Pure HTML interface with inline fetch()
│   └── style.css                # Modern Logistics & Shipping-Tag CSS theme
├── .env                         # Environment variables (MONGO_URI, PORT)
├── .gitignore                   # Excludes node_modules and .env
├── index.js                     # Express entry point, middleware & DB connection
├── package.json                 # Project metadata & npm dependencies
└── README.md                    # Setup, Postman test guide & Viva Q&A
```

### Why MVC? (Viva Explanation)
- **Model (`models/parcel.model.js`)**: Defines the data blueprint, validation rules, types, and schema for courier packages in MongoDB.
- **View (`public/index.html` & `style.css`)**: Pure presentation layer presenting the user interface (dispatch counters, shipping tags, and inward form).
- **Controller (`controllers/parcel.controller.js`)**: Acts as the coordinator—receives requests from routes, interacts with the Model, handles database operations, and returns JSON responses with HTTP status codes.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.x or v20.x recommended)
- **npm** (bundled with Node.js)
- **MongoDB Atlas** account (free tier)

### 2. Installation
Open your terminal inside the project directory:

```bash
# Clone the repository
git clone https://github.com/armandahiya80/parcelpulse-crud-api.git
cd parcelpulse-crud-api

# Install dependencies
npm install
```

### 3. Environment Configuration (`.env`)
Create a `.env` file in the root directory (already pre-configured):

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.6sswetn.mongodb.net/parcelpulse?retryWrites=true&w=majority&appName=Cluster0
```

> **⚠️ Critical MongoDB Atlas Whitelist Step (Avoid SSL Alert 80):**
> 1. Log in to [MongoDB Atlas Console](https://cloud.mongodb.com/).
> 2. In the left navigation, click **Network Access** under Security.
> 3. Click **Add IP Address**.
> 4. Select **Allow Access From Anywhere (`0.0.0.0/0`)** and click **Confirm**.
> 5. Wait ~30 seconds for the rule to become Active.

### 4. Running the Application

```bash
# Production mode
npm start

# Development mode (auto-reload with nodemon)
npm run dev
```

Visit the web interface: **[http://localhost:3000](http://localhost:3000)**

---

## 📮 Postman Desktop API Testing Guide

Use Postman Desktop to demonstrate all 5 REST API endpoints during your viva evaluation.

### Endpoint Overview Table

| Operation | HTTP Verb | Endpoint URL | Status Code | Description |
| :--- | :---: | :--- | :---: | :--- |
| **CREATE** | `POST` | `http://localhost:3000/api/parcels` | `201 Created` | Inward log a newly arrived package |
| **READ ALL** | `GET` | `http://localhost:3000/api/parcels` | `200 OK` | Fetch all packages (newest first) |
| **READ ONE** | `GET` | `http://localhost:3000/api/parcels/:id` | `200 OK` | Fetch details of a single package |
| **UPDATE** | `PUT` | `http://localhost:3000/api/parcels/:id` | `200 OK` | Toggle status or update shelf rack |
| **DELETE** | `DELETE`| `http://localhost:3000/api/parcels/:id` | `200 OK` | Delete package log from database |

---

### Step-by-Step Postman Testing

#### 1. CREATE (`POST /api/parcels`)
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/parcels`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: Select `raw` -> `JSON`:
```json
{
  "studentName": "Aarav Verma",
  "roomOrHostel": "Block B - 304",
  "courierService": "Amazon",
  "shelfCode": "Rack-A2",
  "pickupStatus": "At Gate"
}
```
- **Expected Response**: `201 Created`
```json
{
  "_id": "67268800abcdef12345678",
  "studentName": "Aarav Verma",
  "roomOrHostel": "Block B - 304",
  "courierService": "Amazon",
  "shelfCode": "Rack-A2",
  "pickupStatus": "At Gate",
  "createdAt": "2026-11-02T17:40:00.000Z",
  "updatedAt": "2026-11-02T17:40:00.000Z",
  "__v": 0
}
```
*(Copy the generated `_id` to use in steps 3, 4, and 5!)*

---

#### 2. READ ALL (`GET /api/parcels`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/parcels`
- **Body**: `none`
- **Expected Response**: `200 OK` with JSON array containing all parcels sorted with latest on top.

---

#### 3. READ ONE (`GET /api/parcels/:id`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/parcels/67268800abcdef12345678` *(replace with actual `_id`)*
- **Body**: `none`
- **Expected Response**: `200 OK` returning single package document (or `404 Not Found` if invalid ID).

---

#### 4. UPDATE (`PUT /api/parcels/:id`)
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/parcels/67268800abcdef12345678` *(replace with actual `_id`)*
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: Select `raw` -> `JSON`:
```json
{
  "pickupStatus": "Collected",
  "shelfCode": "Collected-Desk"
}
```
- **Expected Response**: `200 OK` with updated document reflected immediately.

---

#### 5. DELETE (`DELETE /api/parcels/:id`)
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/parcels/67268800abcdef12345678` *(replace with actual `_id`)*
- **Body**: `none`
- **Expected Response**: `200 OK`
```json
{
  "message": "Parcel record deleted successfully",
  "id": "67268800abcdef12345678",
  "studentName": "Aarav Verma"
}
```

---

## 🎓 University Viva & Evaluation Cheat-Sheet

Be prepared to answer these common practical questions from university external examiners:

### Q1: What is Mongoose and why do we use it with MongoDB?
> **Answer**: MongoDB is a NoSQL, schema-less document database. Mongoose is an Object Data Modeling (ODM) library for Node.js. It adds structure by enforcing schemas, data types, required fields, and default values while providing helper methods for querying and updating MongoDB.

### Q2: In `findByIdAndUpdate`, why do we pass `{ new: true, runValidators: true }`?
> **Answer**:
> - By default, Mongoose returns the original document *before* the update took place. Passing `{ new: true }` instructs Mongoose to return the freshly modified document.
> - By default, Mongoose only runs schema validations on `save()`. Passing `{ runValidators: true }` ensures that any `enum` or type checks (such as allowed courier services) are strictly enforced during `update` operations as well.

### Q3: What is the difference between HTTP `200` and `201`?
> **Answer**: `200 OK` indicates standard successful request processing (used for `GET`, `PUT`, `DELETE`). `201 Created` indicates that the request was successful and a new resource was created on the server (used for `POST`).

### Q4: Why serve frontend files statically using `express.static('public')`?
> **Answer**: `express.static` is a built-in middleware that serves static files like HTML, CSS, client-side JavaScript, and images directly to the browser without requiring custom route handlers for each asset file.

### Q5: How does the frontend communicate with the backend?
> **Answer**: The frontend uses the browser's native `fetch()` API to make asynchronous HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) to `/api/parcels`. When the Promise resolves, it parses the returned JSON payload and dynamically updates the DOM.

---

## 🐙 Git & GitHub Commands Cheat-Sheet

To push this repository to GitHub from your terminal:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "feat: complete ParcelPulse CRUD application with MVC and pure HTML/CSS"

# 4. Set main branch
git branch -M main

# 5. Add remote origin
git remote add origin https://github.com/armandahiya80/parcelpulse-crud-api.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License
This project is open-source and free to use for academic and evaluation purposes.
