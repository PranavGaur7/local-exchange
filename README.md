---

# Local Exchange

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://barter-drab-phi.vercel.app/)

**Local Exchange** is a full-stack web application designed to connect people within a community to **buy, sell, or trade goods and services**. With features like real-time chat, secure authentication, and location-based listings, it simplifies local exchanges and encourages sustainable reuse.

---

## 🧭 Table of Contents
- [✨ Features](#-features)
- [🚀 Installation](#-installation)
- [💡 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)

---

## ✨ Features
- 🛍️ Intuitive interface for browsing and listing items
- 💬 Real-time messaging system using Socket.IO
- 📍 Location-based search using Google Maps integration
- 🔐 Secure user authentication with JWT
- 📸 Image upload support for item listings
- 🗃️ Categorized listings for easy discovery

---

## 🚀 Installation

To run **Local Exchange** locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PranavGaur7/local-exchange.git
   cd local-exchange
   ```

2. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```
   
   ```bash
   cd client
   npm install
   ```

3. **Configure environment variables**:  
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. **Start the application**:
   ```bash
   cd backend
   npm run both
   ```

---

## 💡 Usage

Once running:

- Open your browser and visit: `http://localhost:5173/`
- Sign up or log in to your account
- Create a listing or explore available items nearby
- Use the integrated chat system to connect with other users
- Finalize the exchange and leave feedback!

---

## 🤝 Contributing

Contributions are highly appreciated!  
Here’s how you can help:

1. Fork this repo
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Add new feature"`
4. Push to your branch: `git push origin feature-name`
5. Submit a Pull Request

---

## 📬 Contact

For questions, feedback, or collaborations:

- **Pranav Gaur**  
- 📧 Email: raghavgau7@example.com  
- 🐙 GitHub: [@PranavGaur7](https://github.com/PranavGaur7)

---

**Happy Exchanging!** 🎉

---
