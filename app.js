const express = require('express');
const app = express();
const port = 3000;

// Configuring dynamic view files
app.set('view engine', 'pug');
app.set('views', 'views');

// I/want/title route
const addressRoute = require('./routes/address');

app.use(addressRoute);

// Error Handling: Invalid Requests will be handled by the following middleware 
const notFoundRoute = require('./routes/404');

app.use(notFoundRoute);


app.listen(port, () => console.log(`This app listening on port ${port}`));