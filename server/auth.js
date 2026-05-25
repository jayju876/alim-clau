import jwt from "jsonwebtoken";
import { readDb, publicUser } from "./db.js";

const jwtSecret = () => process.env.JWT_SECRET || "replace-this-secret-before-production";

export function signUser(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret(), { expiresIn: "8h" });
}

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret());
    const db = await readDb();
    const user = db.users.find((item) => item.id === payload.id);
    if (!user) return res.status(401).json({ error: "Invalid session" });
    req.user = publicUser(user);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

export function requireEditor(req, res, next) {
  if (!["admin", "editor"].includes(req.user?.role)) {
    return res.status(403).json({ error: "Editor access required" });
  }
  next();
}
