# 🏡 StaySphere – Smart Rental & Hosting Web App

StaySphere is a full-stack web application that allows users to explore rental properties, view property details, and share their own listings. It provides a platform for hosts to manage their properties and for users to discover places to stay.

🌐 **Live Demo:** [StaySphere](https://stay-sphere-three.vercel.app/)

## 📌 Project Overview

StaySphere is developed using Node.js, Express.js, MongoDB, and EJS. The application follows the MVC (Model-View-Controller) architecture and includes user authentication, property management, and review functionality.

## ✨ Features

- **User Authentication:** Secure user registration and login using Passport.js.
- **Property Listings:** Browse and explore available rental properties.
- **Property Management:** Create, edit, and delete property listings.
- **Property Details:** View property information, descriptions, and images.
- **Review System:** Users can add reviews and ratings to properties.
- **Image Upload:** Upload and manage property images using Cloudinary.
- **Session Management:** Manage user sessions using Express Session and MongoDB.
- **Database Integration:** Store users, listings, and reviews in MongoDB.
- **Responsive Interface:** User-friendly interface for browsing properties.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| MongoDB | NoSQL Database |
| Mongoose | MongoDB Object Modeling |
| EJS | Server-Side Templating |
| Bootstrap | UI Styling |
| Passport.js | Authentication |
| Cloudinary | Image Storage |
| Git & GitHub | Version Control |
| Vercel | Deployment |

## 📂 Project Structure

```text
StaySphere/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── Errors.ejs
│
├── init/
│   └── index.js
│
├── public/
├── utils/
├── middlewares.js
├── cloudConfig.js
├── app.js
├── package.json
├── vercel.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PranavChandam/StaySphere.git
```

### 2. Navigate to the Project Directory

```bash
cd StaySphere
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Replace the placeholder values with your actual credentials.

### 5. Run the Application

```bash
npm start
```

Open your browser and navigate to:

```text
http://localhost:3000
```

## 🗄️ Database

StaySphere uses MongoDB Atlas to store application data.

The database includes collections for:

- Users
- Listings
- Reviews

Mongoose is used to define schemas and interact with the database.

## 🚀 Deployment

The application is deployed using Vercel.

- Backend: Node.js and Express.js
- Database: MongoDB Atlas
- Image Storage: Cloudinary
- Hosting: Vercel

## 👨‍💻 Developer

**Pranav Chandam**

- GitHub: [PranavChandam](https://github.com/PranavChandam)
- LinkedIn: [Pranav Chandam](https://www.linkedin.com/in/pranav-chandam-225096264/)

## 📄 License

This project is developed for educational and portfolio purposes.

---

⭐ If you like this project, consider giving it a star on GitHub!
