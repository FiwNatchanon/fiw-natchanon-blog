const USERS_STORAGE_KEY = "blog_registered_users";
const SESSION_STORAGE_KEY = "blog_auth_session";

export function getRegisteredUsers() {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [];
}

export function saveRegisteredUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getAuthSession() {
  const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
  return storedSession ? JSON.parse(storedSession) : null;
}

export function saveAuthSession(session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function registerUser({ name, username, email, password }) {
  const users = getRegisteredUsers();

  if (users.some((user) => user.email === email)) {
    return { error: "email", message: "Email is already taken, Please try another email." };
  }

  if (users.some((user) => user.username === username)) {
    return { error: "username", message: "Username is already taken, Please try another username." };
  }

  users.push({ name, username, email, password });
  saveRegisteredUsers(users);

  return { success: true };
}

export function loginUser(email, password) {
  const users = getRegisteredUsers();
  const matchedUser = users.find((user) => user.email === email);

  if (!matchedUser) {
    return { error: "User not found. Please register first." };
  }

  if (matchedUser.password !== password) {
    return { error: "Your password is incorrect. Please try again." };
  }

  saveAuthSession({
    name: matchedUser.name,
    username: matchedUser.username,
    email: matchedUser.email,
    profilePicture: matchedUser.profilePicture || "",
  });

  return { success: true, user: matchedUser };
}

export function updateUserProfile(
  currentEmail,
  { name, username, email, profilePicture }
) {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex((user) => user.email === currentEmail);

  if (userIndex === -1) {
    return { error: "User not found." };
  }

  if (email !== currentEmail && users.some((user) => user.email === email)) {
    return {
      error: "email",
      message: "Email is already taken, Please try another email.",
    };
  }

  if (
    users.some(
      (user) => user.username === username && user.email !== currentEmail
    )
  ) {
    return {
      error: "username",
      message: "Username is already taken, Please try another username.",
    };
  }

  users[userIndex] = {
    ...users[userIndex],
    name,
    username,
    email,
    profilePicture: profilePicture || "",
  };
  saveRegisteredUsers(users);

  saveAuthSession({
    name,
    username,
    email,
    profilePicture: profilePicture || "",
  });

  return { success: true };
}

export function updateUserPassword(email, currentPassword, newPassword) {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return { error: "User not found." };
  }

  if (users[userIndex].password !== currentPassword) {
    return {
      error: "currentPassword",
      message: "Your current password is incorrect.",
    };
  }

  users[userIndex].password = newPassword;
  saveRegisteredUsers(users);

  return { success: true };
}
