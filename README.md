# VisaEase - Visa Application & Consultation Platform

VisaEase is a modern web application for visa applications, consultations, and immigration services.

## 📋 Project Setup

Follow these steps to get the project up and running on your machine:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier is sufficient)

### Installation

1. **Clone or extract the project files** to your desired location

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Rename `.env.example` to `.env`
   - Edit the `.env` file and add your MongoDB connection string and JWT secret:

   ```
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/visaease
   JWT_SECRET=your_secure_random_string
   PORT=5000
   ```

4. **Get a MongoDB connection string**
   - Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Click "Connect" and select "Connect your application"
   - Copy the connection string and replace `<username>`, `<password>`, and `<dbname>` with your details

### Running the Application

1. **Start the backend server**

   ```bash
   npm run server
   ```

2. **In a new terminal, start the frontend development server**

   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

### Running Both Frontend and Backend Together

```bash
npm run dev:all
```

## 🌐 Deployment

The project is configured for easy deployment to Vercel:

1. Create a Vercel account and link your GitHub repository
2. Add environment variables in the Vercel dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret for token encryption

## 📊 Analytics

The project is set up with Vercel Web Analytics:

1. Deploy to Vercel to enable analytics automatically
2. View analytics in the Vercel dashboard under the "Analytics" tab

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Deployment**: Vercel

## 🧩 Project Structure

- `src/` - Frontend React code
  - `components/` - React components
  - `context/` - Context providers (e.g., Auth context)
  - `assets/` - Images and other static assets
- `server/` - Backend Express API
  - `routes/` - API route definitions
  - `controllers/` - Route controllers
  - `models/` - MongoDB models
  - `middleware/` - Express middleware

## ⚠️ Important Notes

- Never commit your `.env` file or any file containing sensitive information
- For production, use stronger security measures like HTTPS and secure headers

## 📬 Need Help?

If you have any questions or issues setting up the project, please reach out!

---

Happy coding! 🚀
