const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');

const routes = require('./routes');
const { env } = require('./config/env');
const configurePassport = require('./config/passport');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

configurePassport(passport);

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-management-rho-ivory.vercel.app",
  "https://task-management-135plwsca-abhimos-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/health', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'TaskFlow backend is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
