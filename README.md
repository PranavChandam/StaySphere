# StaySphere 🏠
**A Full-Stack Property Rental & Hosting Platform**  
StaySphere is a web application that allows users to explore rental listings, host their properties, and manage bookings. Built with Node.js, Express, MongoDB, and EJS, it follows an MVC architecture and features a dynamic user experience.

---




## 🚀 Features

- 🔍 **Search & Explore Listings**
- 🧑‍💼 **Host Your Property**
- 📝 **Dynamic Listing Pages**
- 🔐 **Authentication & Authorization**
- 🖼️ **Image Upload with Cloudinary (or local storage)**
- 📂 **MVC Architecture with Modular Routing**

---

## 🧱 Tech Stack

| Layer       | Tech Used                  |
|-------------|----------------------------|
| Frontend    | HTML, CSS, EJS             |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB, Mongoose          |
| Authentication | (Optional: Passport.js / Custom) |
| Image Upload | Multer + Cloudinary (or local) |


---

## 🗂️ Project Structure
<pre> <code> StaySphere/ ├── controllers/ # Handles route logic (e.g., listings, auth, reviews) ├── init/ # Initial DB setup or seeding logic ├── models/ # Mongoose schemas for DB (e.g., User, Listing, Review) ├── public/ # Static assets (CSS, JS, client-side images) ├── routes/ # Express route definitions (listingRoutes, authRoutes) ├── utils/ # Utility functions (e.g., error handling, validation) ├── views/ # EJS templates (home.ejs, listings.ejs, partials/) ├── .gitignore # Ignored files (node_modules, .env, etc.) ├── README.md # Project documentation ├── app.js # Main Express app configuration ├── cloudConfig.js # Cloudinary integration for image uploads ├── middleware.js # Custom middlewares (e.g., auth, validation) ├── package.json # Project metadata and scripts ├── package-lock.json # Dependency lock file └── schema.js # Reusable schema validation or additional schema utils </code> </pre>

