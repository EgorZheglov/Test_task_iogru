const express = require("express");
const { initialRead } = require("../src/data/db");
const router = require("./routes/user");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:8080"],
  "Access-Control-Allow-Origin": "*",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
  credentials: true,
};
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(3000, () => {
  initialRead();
  console.log("server is listnening on port 3000");
});
