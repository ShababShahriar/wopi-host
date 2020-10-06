const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use('/', routes);

app.listen(4090, () => {
    console.log('Server is running on port 4090');
});
