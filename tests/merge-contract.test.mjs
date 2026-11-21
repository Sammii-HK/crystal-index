import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const baseline = JSON.parse(fs.readFileSync(new URL('./current-main-baseline.json', import.meta.url)));
test('the current identification, image and account routes remain byte-identical to the merge base', () => {
  for (const [file, hash] of Object.entries(baseline)) assert.equal(createHash('sha256').update(fs.readFileSync(file)).digest('hex'), hash, file);
});
test('the current app artwork and central store link are retained in navigation and footer', () => {
  for (const file of ['components/common/Navbar.tsx', 'components/common/Footer.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.match(source, /src="\/app-icon\.png"/);
    assert.match(source, /href=\{CRYSTAL_INDEX_APP_STORE_URL\}/);
  }
});
