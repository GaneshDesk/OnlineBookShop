const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true});

// connection on
mongoose.connection.on('connected',()=>{
    console.log("database conncted : "+config.database);
});

// on Error
mongoose.connection.on('error',(err)=>{
    console.log("database not conncted"+err);
});

const app = express();

const users = require('./routes/users');
const { connect } = require('http2');
const { connected } = require('process');

const port = 3000;

// cores middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index route 
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

// Start server
app.listen(port, () => {
    console.log("Server start on port  : ", port);
});