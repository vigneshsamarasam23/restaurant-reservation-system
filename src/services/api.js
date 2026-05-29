const API_BASE_URL = "http://localhost:8000/api";

// ============= AUTH ENDPOINTS =============

export async function authLogin(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }

  return response.json();
}

export async function authSignup(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Signup failed");
  }

  return response.json();
}

// ============= MENU ENDPOINTS =============

export async function fetchMenu() {
  const response = await fetch(`${API_BASE_URL}/menu`);

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  return response.json();
}

// ============= TABLES ENDPOINTS =============

export async function fetchTables() {
  const response = await fetch(`${API_BASE_URL}/tables`);

  if (!response.ok) {
    throw new Error("Failed to fetch tables");
  }

  return response.json();
}

// ============= RESERVATIONS ENDPOINTS =============

export async function fetchReservations(email) {
  const response = await fetch(
    `${API_BASE_URL}/reservations?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reservations");
  }

  return response.json();
}

export async function createReservation(reservationData) {
  const response = await fetch(`${API_BASE_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Reservation failed");
  }

  return response.json();
}

export async function cancelReservation(reservationId) {
  const response = await fetch(
    `${API_BASE_URL}/reservations/${reservationId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to cancel reservation");
  }

  return response.json();
}

// ============= CART ENDPOINTS =============

export async function fetchCart(email) {
  const response = await fetch(
    `${API_BASE_URL}/cart?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

export async function addToCart(email, item) {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, item }),
  });

  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }

  return response.json();
}

export async function removeFromCart(email, itemId) {
  const response = await fetch(
    `${API_BASE_URL}/cart/${itemId}?email=${encodeURIComponent(email)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to remove from cart");
  }

  return response.json();
}

export async function updateCartItem(email, itemId, quantity) {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, itemId, quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }

  return response.json();
}

export async function clearCart(email) {
  const response = await fetch(
    `${API_BASE_URL}/cart/clear?email=${encodeURIComponent(email)}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }

  return response.json();
}

// ============= HEALTH CHECK =============

export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.ok;
}
