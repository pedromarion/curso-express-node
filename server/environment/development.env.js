process.env.PORT = process.env.PORT || 3000;
process.env.MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://dbuser:bkw4sqKJ3NayKeLU@cluster0-v4i5m.gcp.mongodb.net/mis-usuarios?retryWrites=true&w=majority';
process.env.SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'QWERTY12345';
process.env.TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || 60*60;