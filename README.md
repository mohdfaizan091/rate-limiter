# Rate Limiter Middleware (Express)

A configurable, in-memory rate-limiting middleware for Express.js, built to demonstrate **backend infrastructure design**, **time-based logic**, and **defensive engineering practices**.


##  Features

- Fixed-window rate limiting
- Per-route configurable limits
- IP-based client identification
- Proper HTTP semantics (`429 Too Many Requests`)
- Retry hints via response headers


## Why This Project Exists

Rate limiting is core infrastructure in real-world systems:
- APIs
- Authentication endpoints
- Search services
- Payment flows

This project was built to explore:
- time-window enforcement
- fairness trade-offs
- in-memory vs distributed state
- middleware reusability


### Strategy Used

**Fixed Window Rate Limiting**

Each client is allowed **N requests per T milliseconds**.

## Project Structure

src/
├─ index.js
└─ middleware/
   └─ rateLimiter.js


## Behaviour

| Scenario       | Result                  |
| -------------- | ----------------------- |
| Under limit    | Request allowed         |
| Limit exceeded | `429 Too Many Requests` |
| Window expired | Counter resets          |
| Proxy traffic  | Correct IP detected     |

## Production Evaluation

In real system, this could evolve by:
- Using Redis for shared state
- Implementing sliding window
- Adding matric and monitoring
- Supporting user/API-key based limits

## Whats this demonstrate

- Middleware design
- Time-based logic
- Defensive programming
- Infrastructure thinking
- System design awareness