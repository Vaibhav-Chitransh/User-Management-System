// k4pnLlOzFRSPMsLh
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db.js')

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

const userRoutes = require('./routes/userRoutes.js');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})