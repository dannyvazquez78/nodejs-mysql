const express =require('express');
const morgan =require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//initializations
const app = express();

//settings
app.set('port', 4000);
app.set('views', path.join(__dirname,  'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Global Variables
app.use((req, res, next) => {
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//Public

//Starting the server
app.listen(app.get('port'),() =>{
    console.log('server on port', app.get('port'));
});
