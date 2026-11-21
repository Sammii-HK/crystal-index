// Offline UI compilation only. Does not import Next config, auth, Prisma or providers.
import { createRequire } from "node:module";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as sass from "sass";
const require = createRequire(import.meta.resolve("tsx"));
const { build } = require("esbuild");
const output = path.resolve(".codex-artifacts/catalogue-review");
await mkdir(output, { recursive: true });
await build({
  entryPoints: ["tests/fixtures/catalogue-review.tsx"],
  bundle: true,
  outfile: path.join(output, "review.js"),
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  define: { "process.env": JSON.stringify({ NODE_ENV: "production" }) },
  logLevel: "warning",
  plugins: [
    {
      name: "offline-image-adapter",
      setup(builder) {
        builder.onResolve({ filter: /^next\/image$/ }, () => ({
          path: "offline-image",
          namespace: "offline",
        }));
        builder.onLoad({ filter: /.*/, namespace: "offline" }, () => ({
          contents:
            'import React from "react"; export default function Image({src,alt,fill,priority,quality,sizes,loading,...props}) { return React.createElement("img",{src,alt,...props}); }',
          loader: "js",
          resolveDir: process.cwd(),
        }));
      },
    },
  ],
});
const bundledCss = await readFile(path.join(output, "review.css")).catch(() =>
  Buffer.from(""),
);
const css = sass.renderSync({
  file: "styles/globals.scss",
  includePaths: ["node_modules"],
  importer: (url) =>
    url === "~bulma"
      ? { file: path.resolve("node_modules/bulma/bulma.sass") }
      : url.startsWith("~")
        ? { file: path.resolve("node_modules", url.slice(1)) }
        : null,
  logger: { warn() {}, debug() {} },
}).css;
await writeFile(
  path.join(output, "review.css"),
  Buffer.concat([bundledCss, css]),
);
await writeFile(
  path.join(output, "index.html"),
  '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Crystal Index offline component review</title><link rel="stylesheet" href="/review.css"></head><body><div id="root"></div><script src="/review.js"></script></body></html>',
);
console.log(
  "Compiled offline gallery/detail/navigation review without production initialisation.",
);
