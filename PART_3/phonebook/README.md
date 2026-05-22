# Phonebook Application - Backend

A full-stack phonebook application built with React, Express, and Node.js.

## Backend Deployment

**Live Backend URL:** `https://phonebook-backend-wwpx.onrender.com`

### API Endpoints

- `GET /api/persons` - Get all phonebook entries
- `GET /api/persons/:id` - Get a specific person by ID
- `POST /api/persons` - Add a new person (requires name and number)
- `DELETE /api/persons/:id` - Delete a person by ID
- `GET /info` - Get phonebook statistics

### Example Requests

```bash
# Get all persons
curl https://phonebook-backend-wwpx.onrender.com/api/persons

# Add a new person
curl -X POST https://phonebook-backend-wwpx.onrender.com/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","number":"555-1234"}'

# Delete a person
curl -X DELETE https://phonebook-backend-wwpx.onrender.com/api/persons/1
```

## Local Development

```bash
npm install
npm run start
```

Server runs on `http://localhost:3001`
