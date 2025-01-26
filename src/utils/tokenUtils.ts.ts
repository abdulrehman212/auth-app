import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
}
