// Modules


const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001
const path = require('path')
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./src/strategies/discordstrategy')
const db = require('./src/database/database')



async function loadDB() {
  await db().then(() => {
    console.log('DATABASE STARTED')
  })
}


// Routes
const authRoute = require('./src/routes/auth')
const dashboardRoute = require('./src/routes/dashboard')

app.use(session({
  secret: 'some secret',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  name: 'discord.token',
  resave: true
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/public', express.static(path.join(__dirname, "src/public")));

// MiddleWere Routes
app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)
app.set('view engine', 'ejs')
app.set('views', path.join('./src', 'views'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
})

app.get('/tos', (req, res) => {
  res.render('tos');
})



app.listen(PORT, async () => {
  await loadDB()
  console.log(`Listening to requests on ${PORT}`)
});
