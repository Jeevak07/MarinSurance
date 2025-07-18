const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userLoginRoute = require('./routes/userLoginRoute');
const policyRoutes = require('./routes/policyRoutes');
const quoteRoutes = require('./routes/quoteRoutes.jsx')
const applicationRoutes = require('./routes/applyRoutes');
const adminApplicationRoutes = require('./routes/adminApplicationRoutes');

const connectDB = require('./db')
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/', userLoginRoute);
app.use('/policy', policyRoutes);
app.use('/quote', quoteRoutes);
app.use('/applications',applicationRoutes);
app.use('/admin', adminApplicationRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
