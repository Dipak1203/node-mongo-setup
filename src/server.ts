import app from './config/app';
import connectDB from './config/db';
const PORT = process.env.SERVER_PORT;

if (PORT) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        connectDB();
    });
}

