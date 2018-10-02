const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const uri = require('./config/config').mLabURI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => console.log(err));

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static("../client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

require("./socket/message")(io);


