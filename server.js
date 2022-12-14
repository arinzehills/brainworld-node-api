require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const httpProxy = require("http-proxy");
const socketIO = require("socket.io")(server);
const db = process.env.DB_URL;
// const db = "mongodb://localhost:27016/radiant_db";
require("./config/mongo.js")(db);
app.use(cors());
app.use(express.json()); //making sure the server can use json, this is use to make the app able to use json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Brain world</h1>");
});
app.use("/", require("./routes/user.route"));
app.use("/admin", require("./routes/adminroutes/addcategory.route"));
app.use("/post", require("./routes/posts.route"));
app.use("/course", require("./routes/courses.route"));
app.use("/upload", require("./routes/upload.route"));
app.use("/payment", require("./routes/payment.route"));
app.use("/polls", require("./routes/polls.route"));
// app.use("/upload", require("./routes/upload.route"));

// console.log(server);
socketIO.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
require("./sockets/socket")(app, socketIO, db);
require("./sockets/pollssockets")(app, socketIO, db);
require("./sockets/postssocket")(app, socketIO, db);

server.listen(port, () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
// httpProxy
//   .createProxyServer({
//     target: "https://brainworld-api.cyclic.app",
//     ws: true,
//   })
//   .listen(port);
