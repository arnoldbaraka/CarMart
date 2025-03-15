// backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const carRoutes = require('./routes/carRoutes');
//
// dotenv.config();
//
// const app = express();
// app.use(cors());
// app.use(express.json());
//
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//         .catch(err => console.log(err));
//
//         app.use('/api/users', userRoutes);
//         app.use('/api/cars', carRoutes);
//
//         const PORT = process.env.PORT || 5000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//             });
