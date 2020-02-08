const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'El nombre es requerido']
    },
    email:{
        type:String,
        required:[true, 'El email es requerido']
    },
    password:{
        type:String,
        required:[true, 'El password es requerido']
    },
    age:{
        type:Number,
        required:[true, 'La edad es requerida']
    },
    created_at:{
        type:Number,
        required:false
    },
    updated_at:{
        type:Number,
        required:false
    }
});

module.exports = mongoose.model('User', userSchema);