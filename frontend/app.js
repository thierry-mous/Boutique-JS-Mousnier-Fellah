const express = require('express');
const {join, dirname} = require('path');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'templates'));


const { fileURLToPath } = require('url');


app.use('/public/', express.static(join(__dirname, 'public')));

//routes

app.get('/', async (req, res) => {
    await axios.get('http://localhost:3000/api/teams').then(response => {
       res.render('index', {teams: response.data});
    }).catch(error => {
        res.render('erreur', {message : error.message, code : error.response.status});
    });
});



app.get('/erreur', (req, res) => {
    res.render('erreur');
});

app.get('/nocart', (req, res) => {
    res.render('nocart');
});

app.get('/cart', (req, res) => {
    res.render('cart');
});


app.get('/article/:jerseyId', async (req, res) => {
    const jerseyId = req.params.jerseyId;
    await axios.get(`http://localhost:3000/api/jerseys/${jerseyId}`).then(response => {
        console.log(response.data.data);
        res.render('article', { jersey: response.data.data.product, recommendations: response.data.data.recommendations});
    }).catch(error => {
        res.render('erreur', { message: error.message, code: error.response.status });
    });
});

app.get('/article',  async (req, res) => {
    await axios.get('http://localhost:3000/api/jerseys').then(response => {
        res.render('article', {jerseys: response.data});
    }).catch(error => {
        res.render('erreur', {message : error.message, code : error.response.status});
    });
});


app.get ('/category', async (req, res) => {
    await axios.get('http://localhost:3000/api/jerseys').then(response => {
        res.render('category', {jerseys: response.data});
    }).catch(error => {
        res.render('erreur', {message : error.message, code : error.response.status});
    });
});

app.get('/category/:teamId', async (req, res) => {
    const teamId = req.params.teamId;
    await axios.get(`http://localhost:3000/api/teams/${teamId}`).then(response => {
        console.log(response.data.data.jerseys);
       res.render('category', {jerseys: response.data.data.jerseys, team: response.data.data.team});
    }).catch(error => {
        res.render('erreur', {message : error.message, code : error.response.status});
    });
});

app.get ('/favorite', (req, res) => {
    res.render('fav');
});

app.get ('/payment', (req, res) => {
    res.render('payment');
});

app.get ('/test', (req, res) => {
    res.sendFile(join(__dirname, '/templates/test.ejs'));
});

app.get ('/command', (req, res) => {
    res.render('command');
});

app.get ('/legal', (req, res) => {
    res.render('legal');
});

app.get ('/about', (req, res) => {
    res.render('about');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    
