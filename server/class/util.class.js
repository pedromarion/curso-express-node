class Util {
    constructor(){}

    getRandomAge = ()=>{
        return Math.floor(Math.random()*99);
    }
}

module.exports = new Util();