const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

app.use(rateLimiter({ limit: 5, windowMs: 60000 }));

app.get("/", (req, res) => {
    res.json({
        message: "Request Successful"
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Rate limit: 5 requests per minute`);
});