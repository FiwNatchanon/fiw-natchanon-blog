import { jwtDecode as decodeToken } from "jwt-decode";

export function jwtDecode(token) {
  if (!token) return null;
  try {
    return decodeToken(token);
  } catch (error) {
    try {
      // Fallback manual base64 decode if jwt-decode package encounters issue
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
}

export function isTokenExpired(token) {
  const decoded = jwtDecode(token);
  if (!decoded || !decoded.exp) return false;
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}
