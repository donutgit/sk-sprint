const Model = require("../models/message");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("subscribeToTimer", interval => {
      console.log("client is subscribing to timer with interval ", interval);
      setInterval(() => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = {
          hours: hours >= 10 ? hours : "0" + hours,
          minutes: minutes >= 10 ? minutes : "0" + minutes,
          seconds: seconds >= 10 ? seconds : "0" + seconds
        };
        socket.emit("timer", time);
      }, interval);
    });
    socket.on("change color", color => {
      console.log("Color Changed to: ", color);
      io.sockets.emit("change color", color);
    });
    socket.on("get messages", () => {
      Model.find().exec((err, messages) => {
        if (err) {
          console.log(err);
        }
        io.sockets.emit("get messages", messages);
      });
    });
    socket.on("new message", message => {
      console.log("new message: ", message);
      const nModel = new Model({ content: message });
      const nMessage = nModel
        .save()
        .then(message => {
          io.sockets.emit("new message", message);
        })
        .catch(err => console.log(err));
    });
  });
};
