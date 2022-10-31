const express = require('express');
const app = express();
const router_users = require('./routes/users');
const router_postits = require('./routes/postits');

app.use(express.json());
app.use('/users', router_users);
app.use('/postits', router_postits);

app.get("/", (req, res) => {
    res.send("Yes");
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});