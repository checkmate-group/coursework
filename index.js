const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('src/public'));

app.set('view engine','pug');
app.set('views','./src/views');

const routes = require('./src/routes/app');

app.use('/',routes);

app.listen(port,()=>{
    console.log("server runing at http://localhost:"+port);
})