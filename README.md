# Test App

Simple Express API for testing AgentStation's PR analysis pipeline.

## API Endpoints

- `GET /health` — Health check
- `GET /api/users` — List all users
- `POST /api/users` — Create a user (body: `{ name, email }`)

## Utilities

- `formatUser(user)` — Format a user object for API response
- `validateUserInput(data)` — Validate user creation input

## CI/CD

This repository uses AgentStation's risk-check GitHub Action to analyze pull requests.
