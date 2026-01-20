import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL || "https://mern-todo-app-coral.vercel.app",
        /^https:\/\/mern-todo-.*\.vercel\.app$/
    ],
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

//Mongodb Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp')
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => console.error("MongoDB Connection: ", error));

app.get('/', (req, res) => {
    res.json({ message: 'TODO API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
