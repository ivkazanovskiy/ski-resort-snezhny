const express = require('express');
const path = require('path');

const sets = require('./config/sets');
const uses = require('./config/uses');
const routes = require('./config/routes');

const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const app = express();

const PORT = process.env.PORT ?? 4000;

sets(app);
uses(app);
routes(app);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`The server is connected on port ${PORT}`);
  dbConnectionChecker();
});
