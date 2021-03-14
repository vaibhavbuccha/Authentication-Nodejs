const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongooes = require('mongoose');
// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();

// connnect to db
mongooes.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true , useUnifiedTopology: true } ,
    ()=>{ console.log('connected to DB');
})

// middlewares
app.use(express.json());

// route middleware
app.use('/api/user/', authRoute);
app.use('/api/post/', postRoute);

app.listen(3000, () => console.log('Server Up and running') );