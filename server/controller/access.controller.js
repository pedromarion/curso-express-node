require('../environment/development.env');
const app = require('express')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

app.post('/access/', (req, res)=>{
    User.findOne({email:req.body.email}, (err, user_db)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                message:'Ocurrio un error',
                error: err
            });
        }

        if(!user_db){
            return res.status(401).json({
                ok:false,
                message:'El usuario o contraseña no coiciden',
            });
        }

        if(!bcrypt.compareSync(req.body.password, user_db.password) ){
            return res.status(401).json({
                ok:false,
                message:'El usuario o contraseña no coiciden',
            });
        }else{
            let token = jwt.sign({
                user:user_db
                },
                process.env.TOKEN_SEED,
                {expiresIn:Number(process.env.TOKEN_EXPIRES)}
            );

            return res.status(200).json({
                ok:true,
                message:'Usuario correcto',
                user:user_db,
                token: token
            });
        }

    })
});

module.exports = app;