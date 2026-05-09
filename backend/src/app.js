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

// ✅ Updated CORS Configuration
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Handle Preflight Requests
app.options('*', cors());

app.use(helmet());

app.use(
  morgan(env.nodeEnv === 'production' ? 'combined' : 'dev')
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// ✅ Health Route
app.get('/health', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'TaskFlow backend is healthy',
    timestamp: new Date().toISOString(),
  });
});

// ✅ API Routes
app.use('/api', routes);

// ✅ Not Found Middleware
app.use(notFoundMiddleware);

// ✅ Error Middleware
app.use(errorMiddleware);

module.exports = app;
