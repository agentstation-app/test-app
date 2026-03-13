# Test App

Simple Express API for testing AgentStation's PR analysis pipeline.

## Getting Started

```bash
npm install
npm start
```

The server starts on port 3001 by default. Override with `PORT` env var.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/users` | List all users |
| `POST` | `/api/users` | Create a user |

### Create a User

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

## Running Tests

```bash
npm test
```

## License

MIT
