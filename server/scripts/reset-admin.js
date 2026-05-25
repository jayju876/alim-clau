import "dotenv/config";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { ensureDb, readDb, writeDb } from "../db.js";

const email = (process.env.CMS_ADMIN_EMAIL || "admin@example.com").trim();
const password = process.env.CMS_ADMIN_PASSWORD || "ChangeMe123!";

await ensureDb();
const db = await readDb();
const normalized = email.toLowerCase();
let user = db.users.find((item) => item.email.toLowerCase() === normalized);
const passwordHash = await bcrypt.hash(password, 12);
const now = new Date().toISOString();

if (!user) {
  user = {
    id: uuid(),
    email,
    passwordHash,
    role: "admin",
    createdAt: now,
    updatedAt: now
  };
  db.users.push(user);
  console.log(`Created admin user: ${email}`);
} else {
  user.email = email;
  user.passwordHash = passwordHash;
  user.role = "admin";
  user.updatedAt = now;
  console.log(`Reset password for admin: ${email}`);
}

await writeDb(db);
