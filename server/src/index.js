const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();


//no limiter as it is global routes
app.get("/health", (req, res) => { 
    res.json({
        status:"ok",
        message: "Request Successful"
    });
});

// strict limiter 
app.get("/login", rateLimiter({ limit: 3, windowMs: 60000}), 
    (req, res) => {
        res.json({
            message: "login route hit"
        });
    }
);

// relaxed limiter 
app.get("/search", rateLimiter({ limit: 10, windowMs: 60000}), 
    (req, res) => {
        res.json({
            message: "search route hit"
        });
    }
);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Rate limit: 5 requests per minute`);
});