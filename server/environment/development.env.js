process.env.PORT = process.env.PORT || 3000;
process.env.MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mis-usuarios';
process.env.SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'QWERTY12345';
process.env.TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || 60*60;