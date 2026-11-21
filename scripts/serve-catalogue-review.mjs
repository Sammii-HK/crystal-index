import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(".codex-artifacts/catalogue-review");
http
  .createServer(async (request, response) => {
    const pathname = new URL(request.url, "http://127.0.0.1").pathname;
    const file =
      pathname === "/review.js"
        ? "review.js"
        : pathname === "/review.css"
          ? "review.css"
          : "index.html";
    try {
      const data = await readFile(path.join(root, file));
      response.writeHead(200, {
        "Content-Type": file.endsWith(".js")
          ? "text/javascript"
          : file.endsWith(".css")
            ? "text/css"
            : "text/html",
        "Cache-Control": "no-store",
        "Content-Security-Policy":
          "default-src 'self'; connect-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'",
      });
      response.end(data);
    } catch {
      response.writeHead(404);
      response.end("Build the offline review first.");
    }
  })
  .listen(4817, "127.0.0.1", () =>
    console.log("Offline fixture review: http://127.0.0.1:4817/crystals"),
  );
