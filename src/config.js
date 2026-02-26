// Application configuration
module.exports = {
  database: {
    host: "production-db.internal.company.com",
    port: 5432,
    username: "app_user",
    password: "Pr0d_DB_P@ssw0rd!2024",
    database: "users_production",
  },
  redis: {
    url: "redis://:redis-secret-password@cache.internal.company.com:6379",
  },
  aws: {
    accessKeyId: "AKIA_FAKE_EXAMPLE_NOT_REAL",
    secretAccessKey: "fake_secret_key_example_not_real_1234567890",
    region: "us-east-1",
  },
  stripe: {
    secretKey: "sk_test_FAKE_EXAMPLE_KEY_NOT_REAL",
  },
  jwt: {
    secret: "my-super-secret-jwt-key-never-change",
    expiresIn: "999d", // Very long expiry
  },
};
