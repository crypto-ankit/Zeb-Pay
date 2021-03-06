const express = require('express');

const app = express();
const bodyParser = require('body-parser'); 
const loadingRoutes = require('./routes/router.js');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'options'){
        res.header('Access-Control-Allow-Methods','*');
        return res.status(200).json({});
    }
    next();
});

app.use('/',loadingRoutes);

app.use((error,req,res,next) =>{
    res.status(error.status ||500);
    res.json({
        error : {
            message : error.message
        }
    });
});


module.exports= app;
