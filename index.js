const express = require('express');
const exphbrs = require('express-handlebars');

const path = require('path');
const members = require('./members');
const app = express();



//Handlebars
app.engine('handlebars', exphbrs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

//Body Pharser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Homepage router
app.get('/', (req, res) => res.render('index', {
    title: 'Member Apps',
    members
    
}));

//route members
app.use('/api/members/', require('./route/members'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));