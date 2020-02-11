const jwt = require('jsonwebtoken');

const checkToken = (req, res, next)=>{
    if(!req.header('Authorization')){
        return res.status(401).json({
            ok:false,
            err:'No token found'
        });
    }

    let token = req.header('Authorization').replace('Bearer ','');
    console.log('TOKEN: ',token);
    jwt.verify( token, process.env.TOKEN_SEED, (err, decoded)=>{
        
        if(err){
            return res.status(401).json({
                ok:false,
                err:err
            });
        
        }

        console.log('USER:', decoded);
        req.user = decoded.user;
    });
    next();
};

module.exports = {
    checkToken
};