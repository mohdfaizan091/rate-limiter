const rateLimiter = ({ limit, windowMs }) => {
    const clients = new Map();

    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();

        const clientData = clients.get(ip);

        // first request from this IP
        if (!clientData) {
            clients.set(ip, {
                count: 1,
                windowStart: now,
            });
            return next();
        }

        const elapsed = now - clientData.windowStart;

        // window expired -> reset
        if (elapsed > windowMs) {
            clients.set(ip, {
                count: 1,
                windowStart: now,
            });
            return next();
        }

        // within window
        if (clientData.count < limit) {
            clientData.count += 1;
            return next();
        }

        // limit exceeded
        return res.status(429).json({
            message: "Too many requests. Try again later",
        });
    };
};

module.exports = rateLimiter;