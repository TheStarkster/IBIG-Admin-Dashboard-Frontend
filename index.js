const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path')

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
console.log(path.join(__dirname, 'assets'))
// Routes
app.use('/', require('./routes/paths'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));