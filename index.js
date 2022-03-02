const express   = require("express");
const routes    = require("./src/routes/app");

const app   = express();
const port  = process.env.PORT || 3000;

app.use(express.static("./src/public"));

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use("/", routes);

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(port, () => {
    console.log("server runing at http://localhost:" + port);
})