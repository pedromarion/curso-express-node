require('./environment/development.env');
const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use( cors({origin:true, credentials:true}));
app.use( bodyParser.urlencoded({extended:false}) );
app.use( bodyParser.json());
app.use( require('./controller/index'));

mongoose.connect(process.env.MONGODB_URL, (err, res)=>{
    if(err){
        console.log('no se pudo contectar');
    }
    console.log('Conectado a la base de datos de mongodb');
});

server.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000');
});


