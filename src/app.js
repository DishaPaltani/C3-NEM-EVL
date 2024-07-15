const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const {logRequests, logErrors} = require('./middleware/logger');

app.use(logRequests);
app.use(logErrors);

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the online bookstore application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/order.routes')(app);
require('./routes/book.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Database connection
db.sequelize.sync().then(() => {
  console.log('Synced with MySQL database.');
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message);
});

db.mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database.');
}).on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
