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
| Deployment  | (Pending: Render / Railway) |

---

## 🗂️ Project Structure
StaySphere/
│
├── controllers/ # Route logic
├── models/ # Mongoose models
├── routes/ # App routing
├── views/ # EJS templates
├── public/ # Static assets (CSS, images)
├── uploads/ # Uploaded images (if not using Cloudinary)
├── .env # Environment variables
├── app.js # Main Express app
├── package.json
└── README.md
