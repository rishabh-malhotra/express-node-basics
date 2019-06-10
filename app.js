const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = process.env.PORT || 8888;
const sql=require('mssql')
const bodyParser=require('body-parser');

const cookieParser=require('cookie-parser');
const session=require('express-session');

const nav=[{link: "/books",title: "Books"},{link: "/authors",title: "Authors"}]

// var config = {
//   user: 'test',
//   password: 'password',
//   server: 'RISHABH3148907\\MSSQLSERVER2014', 
//   database: 'Library',
//   port:1444
// };

// sql.connect(config).catch(error=>debug(error))

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'supersecret'}))
app.use(cookieParser());
require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);
const authRouter = require("./src/routes/authRoutes")();
app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth",authRouter);
app.get("/", (req, res) => {
  res.status(200);
  // res.sendFile(path.join(__dirname, "views/index.html"));
  res.render("index", {
    nav: [
      {
        link: "/books",
        title: "Books"
      },
      {
        link: "/authors",
        title: "Authors"
      }
    ],
    title: "Library"
  });
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
