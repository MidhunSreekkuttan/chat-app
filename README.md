# 💬 MERN Chat Application

A modern, responsive, and feature-rich chat application built with the MERN stack (MongoDB, Express, React, Node.js). It features secure user authentication, OTP-based password recovery, profile management, and seamless text/image messaging.

## ✨ Features

- **User Authentication:** Secure signup and login using JWT (JSON Web Tokens) stored in HTTP-only cookies.
- **Password Recovery:** OTP-based password reset functionality via email (Nodemailer).
- **Profile Management:** Users can upload and update their profile pictures (stored securely on Cloudinary).
- **Real-Time Data Fetching:** Optimized API state management and caching using TanStack Query (React Query).
- **Media Sharing:** Support for sending both text messages and images in chats.
- **Beautiful UI:** Responsive, modern, and dark-themed UI built with Tailwind CSS v4 and Lucide icons.
- **Interactive Feedback:** Toast notifications and skeleton loading screens for a polished user experience.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** Fast and modern frontend framework.
- **Tailwind CSS v4:** Utility-first styling.
- **TanStack React Query:** Server state management and API caching.
- **React Router DOM:** Client-side routing.
- **React Hot Toast:** Toast notifications.
- **Lucide React:** Beautiful SVG icons.

### Backend
- **Node.js & Express.js:** Robust backend server and API routing.
- **MongoDB & Mongoose:** NoSQL database and object modeling.
- **JWT & Bcrypt:** Authentication and password hashing.
- **Cloudinary & Multer:** Image upload and memory storage handling.
- **Nodemailer:** Email service for welcome emails and OTP verification.

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5100
MOGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Setup
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Setup (For OTP and Welcome Emails)
NO_REPLAY_EMAIL=your_email@gmail.com
NO_REPLAY_PASSWORD=your_app_specific_password
```

### Frontend (frontend/.env)
Create a .env file in the frontend directory:

NODE_ENV=development

VITE_BACKEND_URL=http://localhost:5000

### 🚀 Installation & Setup
1. Prerequisites
Make sure you have Node.js (v18+) and Git installed on your machine. You will also need accounts for MongoDB (Atlas) and Cloudinary.

2. Clone the repository

git clone https://github.com/MidhunSreekkuttan/chat-app.git
cd your-repo-name

### 3. Setup the Backend
cd backend
pnpm install
# or if you use pnpm: pnpm install

# Start the development server
pnpm start

### 4. Setup the Frontend
Open a new terminal window/tab:

cd frontend
pnpm install
# or if you use pnpm: pnpm install

# Start the Vite development server
pnpm run dev

# 📂 Project Structure

├── backend/
│   ├── src/
│   │   ├── controller/      # Route controllers (user, messages)
│   │   ├── lib/             # Configurations (DB, Cloudinary, Mailer, JWT)
│   │   ├── middleware/      # Auth & Multer middlewares
│   │   ├── model/           # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   └── index.js         # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components & loading screens
    │   ├── lib/             # Context API providers (User, Chat) & Axios config
    │   ├── pages/           # Page layouts (Login, Chat, ForgetPassword)
    │   ├── App.jsx          # Main application routing
    │   └── main.jsx         # React root
    ├── index.css            # Global styles and Tailwind imports
    └── package.json


### 🔮 Future Improvements
[ ] Migrate messaging to Socket.io for pure WebSockets real-time communication (currently utilizing React Query invalidation).

[ ] Add read receipts and typing indicators.

[ ] Implement group chats.

[ ] Add audio/video call functionality.

### 📄 License
This project is licensed under the ISC License.

Designed and developed by [Midhun M]