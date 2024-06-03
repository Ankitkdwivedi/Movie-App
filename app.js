const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('Error connecting to DB:', err));

// Middleware
app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Routes
const authRoutes = require('./routes/auth.routes');
app.use(authRoutes);

// Serve static files from the frontend
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, "frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
