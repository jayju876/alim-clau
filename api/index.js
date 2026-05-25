import "dotenv/config";
import { createApp } from "../server/createApp.js";

const app = await createApp({ serveStatic: false });

export default app;
