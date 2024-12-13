import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import sequelize from './config/database.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use('/patients', patientRoutes);

// Sync database
sequelize.sync({ force: false }) // force: false akan mencegah penghapusan tabel yang sudah ada
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.log('Error syncing database: ', err);
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost ${PORT}`);
});