//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task')

const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/task', taskRouter);

app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
});