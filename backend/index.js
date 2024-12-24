import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import sequelize from './config/database.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(cors());
app.use(express.json());
app.use('/patients', patientRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    // Sinkronisasi semua model
    await sequelize.sync({ alter: true }); // `alter` untuk menyesuaikan perubahan
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

syncDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost ${PORT}`);
});