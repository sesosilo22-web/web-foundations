# Library Books REST API

## API Usage Introduction

This REST API allows users to manage library books by listing, viewing, creating, updating, and deleting books. Users can also search for books by author using a query parameter. Requests use standard HTTP methods and return appropriate status codes.

## Endpoints

1. **GET /api/books** — List all books. Success: 200 OK.

2. **GET /api/books/:id** — Get one book by ID. Success: 200 OK.

3. **POST /api/books** — Create a book. Body: {"title":"Things Fall Apart","author":"Chinua Achebe","publishedYear":1958}. Success: 201 Created.

4. **PUT /api/books/:id** — Update a book. Body: {"title":"Things Fall Apart","author":"Chinua Achebe","publishedYear":1959}. Success: 200 OK.

5. **DELETE /api/books/:id** — Delete a book. Success: 204 No Content.

6. **GET /api/books?author=Chinua%20Achebe** — List books by author. Success: 200 OK.

## Error Codes

- **400 Bad Request:** Required book details are missing or invalid.
- **404 Not Found:** The requested book ID does not exist.