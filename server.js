const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
);

const userRoute = require('./routes/userRoute');
const cors = require("cors");

//CORS
app.use(
  cors({
    origin: ["https://productmanagers.netlify.app/"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

app.use('/user', userRoute);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));