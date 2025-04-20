import dotenv from 'dotenv'
import app from './app';
import connectDB from './config/db';
dotenv.config()
const PORT = process.env.PORT || 5000;
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
        console.log(`🚀 Server is running on port ${PORT}`);
    });
};



(async () => {
    await connectDB();
    startServer();
})();