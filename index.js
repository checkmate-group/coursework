const path = require("path");
const express = require("express");
const routes = require("./src/routes/app");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: "Shh, its a secret!" }));
app.use(express.static("./src/public"));

app.set("view engine", "pug");
app.set("views", "./src/views");

// set base path for relative pug template extends
app.locals.basedir = path.join(__dirname, "src/views");

app.use("/", routes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
