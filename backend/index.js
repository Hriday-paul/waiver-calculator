const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
require("./config/connectDb");
dotenv.config();
const PORT = process.env.PORT || 4000;
const colors = require("colors");

// midleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

//user routes
app.use("/api", require("./routs/rout"));

// no api error handling
app.use((req, res) => {
  res.json({ status: 'connection ok', message: 'api not found' })
})

// error handling
app.use((err, req, res) => {
  console.log(err);
  res.send({
    status: false,
    message: "Got server error",
    error: err.message
  })
})


//listen server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
