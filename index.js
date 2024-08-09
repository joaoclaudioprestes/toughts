import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import flash from "express-flash";
import { sequelize } from "./db/conn.js";
import { config } from "dotenv";
import { FileStore } from "session-file-store";
import path from "path";

config();
const app = express();

// Template Engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Request Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(process.cwd(), "tmp/sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

// Flash message
app.use(flash());

// Config path for public folder
app.use(path.join(process.cwd(), "public"), express.static("public"));

// Save session to respose
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

// Connect to database
const conn = sequelize;

conn
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
