const app = require('express')();
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const util = require('../class/util.class');
const { checkToken } = require('../middleware/authentication.middleware');


//---- 
app.get('/about', (req, res)=>{
    //res.send('Hello World');
    let output = {
        ok:true, 
        api_name:'api-node',
        version:'v1'
    };
    res.status(200).json(output);
});

//listado
app.get('/users/', (req, res)=>{
    User.find({})
        .limit(50)
        .exec( (err, users)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    message:'No se pudo obtener los usuarios',
                    error: err
                });
            }
            res.status(200).json(
                {
                    ok:true, 
                    message:`Listado de usuarios`,
                    data:users
                }
            );
        });
});

//obtener un elemento
app.get('/users/:id', (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:'No se pudo obtener el usuario',
                error: err
            });
        }
        res.status(200).json(
            {
                ok:true, 
                message:`Un usuario`,
                data:user
            }
        );
    });
});

//crear elemento
app.post('/users/', checkToken, (req, res)=>{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS)),
        age:req.body.age || util.getRandomAge(),
        created_at: (new Date()).getTime(),
        updated_at: (new Date()).getTime()
    });

    user.save( (err, user_db)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:'No pudo ser guardado',
                error: err
            });
        }
        res.status(200).json(
            {
                ok:true, 
                message:`Crear elemento`,
                data:user_db
            }
        );

    });    
});

//actualizar elemento
app.put('/users/:id', (req, res)=>{
    req.body.updated_at = (new Date()).getTime();
    req.body.password = bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS));
    delete req.body.created_at;

    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, user_db)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:'No pudo ser guardado',
                error: err
            });
        }
        res.status(200).json(
            {
                ok:true, 
                message:`Actulizar elemento`,
                data:user_db
            }
        );
    });
});

//borrar elemento
app.delete('/users/:id', (req, res)=>{
    User.findOneAndDelete(req.params.id, (err)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:'No pudo ser borrado',
                error: err
            });
        }
        res.status(200).json(
            {
                ok:true, 
                message:`Elemento borrado`,
                data:{id:req.params.id}
            }
        );
    });
});


//---- 

module.exports = app;

