import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

//import routers
import apiRouter from './routes/apiRouter';

//convert incoming requests to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/api/v1/endpoints', apiRouter);

//Static handling for FULL BUILD ONLY (dev uses vite proxy);
if (process.env.NODE_ENV !== 'dev') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Server index.html explicilty if grabbed (production mode)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Route error handler
app.use((req, res) => {
  console.log('Bad incoming request from ' + req.originalUrl);
  res.status(404).send('The page does not exist.');
});

// Global error handler
app.use((err, _req, res, _next) => {
  const defaultErr = {
    log: 'Error caught in global handler',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
