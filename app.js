const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

//fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to the database
mongoose.connect('mongodb+srv://Nenad:stalker1243@cluster0-yp9st.gcp.mongodb.net/kss?retryWrites=true&w=majority')
    .then(console.log('Connected to database'));
mongoose.Promise = global.Promise; //mongodb promise is deprecated

app.listen(3000, function(){
    console.log('Listening to port 3000');
});