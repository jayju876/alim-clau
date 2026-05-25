import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isVercel = process.env.VERCEL === "1";
export const dataDir = isVercel ? path.join("/tmp", "cms-data") : path.join(__dirname, "data");
export const uploadsDir = isVercel ? path.join("/tmp", "cms-uploads") : path.join(__dirname, "uploads");
const dbPath = path.join(dataDir, "cms.json");

const now = () => new Date().toISOString();

const emptyDb = () => ({
  users: [],
  blogs: [],
  pages: [],
  authors: [],
  seo: [],
  media: [],
  settings: {
    navigation: [
      { label: "Home", url: "/", visible: true },
      { label: "States", url: "/state-law-references", visible: true },
      { label: "Methodology", url: "/how-we-calculate-alimony", visible: true },
      { label: "Experts", url: "/meet-our-experts", visible: true },
      { label: "Contact", url: "/contact", visible: true }
    ],
    footer: "Free US alimony calculator platform with state-wise spousal support estimates.",
    homepageSections: [
      { id: uuid(), heading: "US Alimony Calculator", body: "Estimate monthly and yearly spousal support by state.", published: true }
    ]
  }
});

export async function syncAdminFromEnv() {
  const email = (process.env.CMS_ADMIN_EMAIL || "admin@example.com").trim();
  const password = process.env.CMS_ADMIN_PASSWORD || "ChangeMe123!";
  const shouldSync =
    process.env.CMS_SYNC_ADMIN === "true" ||
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL === "1";

  if (!shouldSync) return;

  const db = await readDb();
  const normalized = email.toLowerCase();
  let user = db.users.find((item) => item.email.toLowerCase() === normalized);
  const passwordHash = await bcrypt.hash(password, 12);

  if (!user) {
    db.users.push({
      id: uuid(),
      email,
      passwordHash,
      role: "admin",
      createdAt: now(),
      updatedAt: now()
    });
    await writeDb(db);
    console.log(`Created admin user from env: ${email}`);
    return;
  }

  user.email = email;
  user.passwordHash = passwordHash;
  user.role = "admin";
  user.updatedAt = now();
  await writeDb(db);
  console.log(`Synced admin credentials from env: ${email}`);
}

export async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });

  try {
    await fs.access(dbPath);
  } catch {
    const passwordHash = await bcrypt.hash(process.env.CMS_ADMIN_PASSWORD || "ChangeMe123!", 12);
    const db = emptyDb();
    db.users.push({
      id: uuid(),
      email: (process.env.CMS_ADMIN_EMAIL || "admin@example.com").trim(),
      passwordHash,
      role: "admin",
      createdAt: now(),
      updatedAt: now()
    });
    db.authors.push({
      id: uuid(),
      name: "Michael Anderson",
      bio: "US family law researcher with 8+ years of experience analyzing divorce laws, spousal support policies, and alimony calculation methods.",
      image: "/author-michael-anderson.svg",
      linkedin: "https://www.linkedin.com/in/michael-anderson-family-law-research",
      createdAt: now(),
      updatedAt: now()
    });
    await writeDb(db);
  }
}

export async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

export async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  return db;
}

export function publicUser(user) {
  const { passwordHash, resetToken, resetExpiresAt, ...safeUser } = user;
  return safeUser;
}

export const touch = (record, isNew = false) => ({
  ...record,
  id: record.id || uuid(),
  createdAt: record.createdAt || now(),
  updatedAt: isNew ? record.createdAt || now() : now()
});
