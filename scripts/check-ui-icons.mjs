import { main } from "../site-quality/lint-icons.mjs";
let failed = 0;
for (const root of ["app", "components", "lib", "pages", "styles"])
  failed = Math.max(failed, main(["--root", root]));
process.exitCode = failed;
