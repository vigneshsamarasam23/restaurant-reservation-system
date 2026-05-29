# Restaurant Reservation System - FastAPI Backend

A lightweight FastAPI backend with in-memory data storage for the restaurant reservation system.

## Setup

1. Create a Python virtual environment (optional but recommended):

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the server:

```bash
python main.py
```

The server will start on `http://localhost:8000`

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Menu

- `GET /api/menu` - Get all menu items

### Tables

- `GET /api/tables` - Get all tables

### Reservations

- `GET /api/reservations?email=user@example.com` - Get user's reservations
- `POST /api/reservations` - Create a new reservation
- `DELETE /api/reservations/<id>` - Cancel a reservation

### Cart

- `GET /api/cart?email=user@example.com` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/<item_id>?email=user@example.com` - Remove item from cart
- `POST /api/cart/clear?email=user@example.com` - Clear cart

### Health

- `GET /api/health` - Health check endpoint

## Data Storage

All data is stored in-memory (Python dictionaries and lists). No database is used. Data will be reset when the server restarts.

## Interactive API Docs

FastAPI provides automatic interactive API documentation:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
