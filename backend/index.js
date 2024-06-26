const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/teams.route')(app);
require('./src/routes/jersey.route')(app);
require('./src/routes/stock.route')(app);
require('./src/routes/promo.route')(app);

app.use('/public/', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
