from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

from data import menu_data, tables_data

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============= MODELS =============

class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image: str

class Table(BaseModel):
    id: int
    tableNumber: int
    seats: int

class User(BaseModel):
    id: int
    name: str
    email: str

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class ReservationRequest(BaseModel):
    tableId: int
    tableNumber: int
    seats: int
    date: str
    time: str
    userEmail: str

class Reservation(BaseModel):
    id: int
    tableId: int
    tableNumber: int
    seats: int
    date: str
    time: str
    userEmail: str

class CartItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image: str
    quantity: int

class CartUpdateRequest(BaseModel):
    email: str
    itemId: int
    quantity: int

# In-memory storage
users_db = {}
reservations_db = []
carts_db = {}


# ============= AUTH ENDPOINTS =============

@app.post("/api/auth/signup")
async def signup(request: SignupRequest):
    if request.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user = {
        "id": len(users_db) + 1,
        "name": request.name,
        "email": request.email,
        "password": request.password,
    }
    users_db[request.email] = user
    
    return {
        "success": True,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
        },
    }


@app.post("/api/auth/login")
async def login(request: LoginRequest):
    user = users_db.get(request.email)
    
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "success": True,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
        },
    }


# ============= MENU ENDPOINTS =============

@app.get("/api/menu")
async def get_menu():
    return menu_data


# ============= TABLES ENDPOINTS =============

@app.get("/api/tables")
async def get_tables():
    return tables_data


# ============= RESERVATIONS ENDPOINTS =============

@app.get("/api/reservations")
async def get_reservations(email: str = Query(None)):
    if email:
        user_reservations = [r for r in reservations_db if r.get("userEmail") == email]
        return user_reservations
    return reservations_db


@app.post("/api/reservations")
async def create_reservation(request: ReservationRequest):
    # Check if table is already booked
    for res in reservations_db:
        if (res["tableId"] == request.tableId and 
            res["date"] == request.date and 
            res["time"] == request.time):
            raise HTTPException(
                status_code=409,
                detail="Table already booked for this time."
            )
    
    reservation = {
        "id": int(datetime.now().timestamp() * 1000),
        "tableId": request.tableId,
        "tableNumber": request.tableNumber,
        "seats": request.seats,
        "date": request.date,
        "time": request.time,
        "userEmail": request.userEmail,
    }
    
    reservations_db.append(reservation)
    
    return {
        "success": True,
        "reservation": reservation,
    }


@app.delete("/api/reservations/{reservation_id}")
async def cancel_reservation(reservation_id: int):
    global reservations_db
    reservations_db = [r for r in reservations_db if r["id"] != reservation_id]
    return {"success": True}


# ============= CART ENDPOINTS =============

@app.get("/api/cart")
async def get_cart(email: str = Query(None)):
    if not email:
        raise HTTPException(status_code=400, detail="Missing email")
    
    cart = carts_db.get(email, [])
    return cart


@app.post("/api/cart")
async def add_to_cart(item_data: dict):
    email = item_data.get("email")
    item = item_data.get("item")
    
    if not email or not item:
        raise HTTPException(status_code=400, detail="Missing fields")
    
    if email not in carts_db:
        carts_db[email] = []
    
    cart = carts_db[email]
    
    # Check if item already in cart
    existing_item = next((i for i in cart if i["id"] == item["id"]), None)
    
    if existing_item:
        existing_item["quantity"] += 1
    else:
        item["quantity"] = 1
        cart.append(item)
    
    return cart


@app.delete("/api/cart/{item_id}")
async def remove_from_cart(item_id: int, email: str = Query(None)):
    if not email or email not in carts_db:
        raise HTTPException(status_code=404, detail="User cart not found")
    
    carts_db[email] = [item for item in carts_db[email] if item["id"] != item_id]
    return carts_db[email]


@app.put("/api/cart")
async def update_cart_item(request: CartUpdateRequest):
    if not request.email or request.email not in carts_db:
        raise HTTPException(status_code=404, detail="User cart not found")

    item_found = False
    updated_cart = []

    for item in carts_db[request.email]:
        if item["id"] == request.itemId:
            item_found = True
            if request.quantity > 0:
                updated_cart.append({**item, "quantity": request.quantity})
            # If quantity is zero or less, drop the item.
        else:
            updated_cart.append(item)

    if not item_found:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    carts_db[request.email] = updated_cart
    return updated_cart


@app.post("/api/cart/clear")
async def clear_cart(email: str = Query(None)):
    if not email:
        raise HTTPException(status_code=400, detail="Missing email")
    
    carts_db[email] = []
    return {"success": True}


# ============= HEALTH CHECK =============

@app.get("/api/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
