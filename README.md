# Village Chef - Full Stack Food Ordering Application

Village Chef is a premium, modern food ordering web application styled in a beautiful dark theme with vibrant yellow accents (inspired by the Village Chef Figma UI). It features a Spring Boot REST API backend, a MySQL database, and a responsive Vite + React.js frontend.

---

## Repository Structure

```text
village-chef/
├── database/
│   ├── schema.sql           # Database tables creation
│   └── data.sql             # Mock dataset seed script
├── backend/
│   ├── src/main/java/...   # Spring Boot Controller, Service, Repository, Entity layers
│   ├── src/main/resources/  # application.properties configuration
│   ├── pom.xml              # Maven dependencies configuration
│   └── mvnw.cmd             # Maven Wrapper script
└── frontend/
    ├── src/                 # React components, pages, context, and routing
    ├── tailwind.config.js   # Tailwind style customization
    ├── postcss.config.js    # PostCSS compiler configuration
    ├── .env                 # Environment variables config
    └── package.json         # Node.js dependencies config
```

---

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router DOM, Axios, React Icons.
- **Backend**: Java Spring Boot 3.3, Spring Data JPA, Spring Web, Lombok, Maven.
- **Database**: MySQL.

---

## Step-by-Step Setup Guide

### 1. Database Setup (MySQL)
1. Ensure your local MySQL server is installed and running.
2. Open your MySQL client (CLI, Workbench, or phpMyAdmin) and run the following commands to create the database:
   ```sql
   CREATE DATABASE village_chef;
   ```
3. Import the tables structure by running the script:
   `database/schema.sql`
4. Seed the tables with sample food items by running the script:
   `database/data.sql`

### 2. Backend Setup (Spring Boot)
1. Open `backend/src/main/resources/application.properties`.
2. Update the `spring.datasource.password` value to match your local MySQL root password:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
3. Run the Spring Boot application. If you have Java 21 and Maven installed globally:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *Note: If executing on a environment where Java/Maven paths are not set globally, run using the absolute path of your JDK 21 installation pointing to the local Maven Wrapper.*

### 3. Frontend Setup (Vite / React)
1. Open the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` to explore the application!

---

## Page Navigation & Features

1. **Home Page (`/`)**: Features the Figma-inspired dark hero section, happy customer counters, Why Choose Us testimonials, and featured cuisines.
2. **Menu Page (`/menu`)**: Dynamic menu listing from the database with live searches, Veg/Non-Veg filter toggles, price limits sliders, sorting (Price, Ratings), and pagination.
3. **Food Details Page (`/food/{id}`)**: High-quality product details displaying ratings, custom ingredient chips, quantity controls, and related products suggestions.
4. **Shopping Cart Page (`/cart`)**: Real-time quantity selectors, totals checkout preview including mock deliveries cost, coupon code validation (try code: `VILLAGE20` for a 20% discount!), and a mock order completion screen.
5. **About Us Page (`/about`)**: Brand story preservation, mission/vision guidelines, and team grids.
6. **Contact Page (`/contact`)**: Form inquiries with full validation, responsive error alerts, and a mock interactive headquarters Google Map.
7. **Admin Dashboard (`/admin`)**: Special dashboard displaying menu analytics (total items, categories, veg items, and user messages). Admins can perform full CRUD: add new foods, edit details, delete entries, toggle "In Stock / Out of Stock" statuses, and review contact messages.

---

## REST API Endpoints

The Spring Boot backend exposes the following REST APIs (CORS is enabled for port `5173`):

### Food Endpoints
- `GET /api/foods`: Fetch all food items. Supports query parameters for filtering:
  - `category` (String, e.g. `Pizzas`)
  - `isVeg` (Boolean, e.g. `true`)
  - `maxPrice` (Double, e.g. `300.00`)
  - `search` (String, e.g. `Cheese`)
- `GET /api/foods/{id}`: Fetch details for a specific food item.
- `POST /api/foods`: Create a new food item (Request body matches Food JSON structure).
- `PUT /api/foods/{id}`: Update an existing food item.
- `DELETE /api/foods/{id}`: Delete a food item by ID.

### Contact Endpoints
- `POST /api/contact`: Submit a customer inquiry message.
- `GET /api/contact`: Fetch all submitted contact messages (Admin Dashboard).
