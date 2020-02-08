const app = require('express')();
app.use( require('./user.controller'));
app.use( require('./access.controller'));

module.exports = app;