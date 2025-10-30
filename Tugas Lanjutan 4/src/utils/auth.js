const CURRENT_KEY = "currentUser";

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_KEY);
}

export function isAuthenticated() {
  return !!getCurrentUser();
}
