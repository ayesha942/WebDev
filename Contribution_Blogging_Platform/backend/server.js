const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./router/routes');
const port = 8080;
const connect = require('./database/conn');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
}));

app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
});

app.use('/api', apiRouter);

connect().then(() => {
  try {
      app.listen(port, () => {
          console.log(`Server connected to http://localhost:${port}`);
      })
  } catch (error) {
      console.log('Cannot connect to the server')
  }
}).catch(error => {
  console.log("Invalid database connection...!");
})


// app.listen(port, () => {
//   console.log(`Server connected to http://localhost:${port}`);
// });