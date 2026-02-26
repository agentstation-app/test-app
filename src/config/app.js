// Application configuration
module.exports = {
  port: parseInt(process.env.PORT || "3001", 10),
  env: process.env.NODE_ENV || "development",
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  logging: {
    enabled: process.env.LOG_ENABLED !== "false",
    level: process.env.LOG_LEVEL || "info",
  },
};
