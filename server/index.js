import "dotenv/config";
import { createApp } from "./createApp.js";

const port = Number(process.env.CMS_PORT || process.env.PORT || 4000);
const app = await createApp({ serveStatic: true });

app.listen(port, () => {
  console.log(`CMS API running at http://localhost:${port}`);
});
