require('dotenv').config(); // 환경변수를 위해. dev환경: .env 파일 / production환경: docker run의 --env-file인자로 넘김.
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

const MySQLStore = require('express-mysql-session')(session);
const passport = require('./passportStrategy');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
// const MySQLStore = require('express-mysql-session')(session);
const requestRouter = require('./routes/request');
const memberRouter = require('./routes/member');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');

// const passport = require('./passportStrategy');
process.env.NODE_ENV = (process.env.NODE_ENV
  && (process.env.NODE_ENV).trim().toLowerCase() === 'production')
  ? 'production' : 'development';
let FRONT_HOST = process.env.DEV_REACT_HOSTNAME;
if (process.env.NODE_ENV === 'production') {
  FRONT_HOST = process.env.PRODUCTION_REACT_HOSTNAME;
}


const app = express();

const storeOptions = {
  host: process.env.SESSION_STORE_DB_HOST,
  port: process.env.SESSION_STORE_DB_PORT,
  user: process.env.SESSION_STORE_DB_USER,
  password: process.env.SESSION_STORE_DB_PASSWORD,
  database: process.env.SESSION_STORE_DB_DATABASE,
  expiration: 21600000
};

const sessionStore = new MySQLStore(storeOptions);


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false
  }
}));
// '@#@$MYSIGN#@$#$'
// passport 초기화를 통해 'local' 전략이 수립된다.
app.use(passport.initialize());
app.use(passport.session());

// use CORS
// 향후변경필요
const corsOptions = { origin: FRONT_HOST, credentials: true };
app.use(cors(corsOptions));

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});
app.use('/member', memberRouter);
app.use('/login', loginRouter);
app.use('/request', requestRouter);
app.use('/admin', adminRouter);


console.log('system start!');

module.exports = app;
