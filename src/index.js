const express = require("express");
const config = require("./config/app");
const { requestLogger } = require("./middleware/logger");
const { errorHandler, notFoundHandler } = require("./middleware/error-handler");
const healthRoutes = require("./routes/health");
const userRoutes = require("./routes/users");

const app = express();

// Global middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/health", healthRoutes);
app.use("/api/users", userRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[${config.env}] Server running on port ${config.port}`);
});

module.exports = app;
