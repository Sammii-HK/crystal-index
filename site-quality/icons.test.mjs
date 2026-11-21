import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scanSource } from './lint-icons.mjs';
test('catches typed arrows, encoded arrows, escaped icons and dynamic icon strings',()=>{
 for(const s of ['<a>The reading shelf ↗</a>','<a>&#x2197;</a>','<a>&rarr;</a>','const icon="\\u2197";','<button>{busy ? "✓" : "+"}</button>'])assert.ok(scanSource(s).length,s);
});
test('catches ASCII icon controls and icon libraries',()=>{
 for(const s of ['<button aria-label="Close">x</button>','<span aria-hidden="true">{"+"}</span>','import {FiArrowUp} from "react-icons/fi";'])assert.ok(scanSource(s).length,s);
});
test('accepts Lucide, prose punctuation, code comments and mathematical notation',()=>{
 for(const s of ['import {ArrowUpRight} from "lucide-react"; const A=()=> <a>Read <ArrowUpRight aria-hidden="true" /></a>;','// flow → output\nconst A=()=> <p>2 + 2 = 4. It’s a thought.</p>;','const A=()=> <code>a → b</code>;'])assert.equal(scanSource(s).length,0,s);
});
test('checks CSS content and standalone HTML',()=>{
 assert.ok(scanSource('.next::after {content:"\\2192"}', 'style.css').length);
 assert.ok(scanSource('<a>Read &nearr;</a>', 'index.html').length);
 assert.equal(scanSource('/* → */ p { color: red }','style.css').length,0);
});

test("data symbols are review candidates, not automatically UI violations",()=>{ const findings=scanSource('const scientificNotation="→";');assert.equal(findings[0].rule,"symbol-review"); });

test("React keys and CSS template fragments are not ASCII icons",()=>{assert.equal(scanSource('const A=()=> <button key={`${id}-${value}`} style={{left:`-${offset}%`}}>Go</button>').filter(f=>f.rule!=="symbol-review").length,0);});

test("hand-drawn UI icons fail while data visualisations remain allowed",()=>{assert.ok(scanSource('<svg viewBox="0 0 24 24"><path d="M0 0"/></svg>').some(f=>f.rule==="lucide-only"));assert.equal(scanSource('<svg viewBox="0 0 400 300"><path d="M0 0"/></svg>').length,0);});

test("an explicitly identified product brand mark is not a UI icon",()=>{assert.equal(scanSource('<svg data-brand-mark="prism" viewBox="0 0 14 14"><path d="M0 0"/></svg>').length,0);});


test('catches icon font classes and font families without treating ordinary labels as icons',()=>{
 for (const [source,file] of [
  ['<span className="material-symbols-outlined">arrow_forward</span>','icon.tsx'],
  ['<span className="fa-solid fa-arrow-right" />','icon.tsx'],
  ['<i class="bi bi-arrow-right"></i>','index.html'],
  ['.icon {font-family:"Material Icons"}','style.css'],
  ['.icon {font-family:"Font Awesome 6 Free"}','style.css'],
 ]) assert.ok(scanSource(source,file).some(f=>f.rule==='lucide-only'),source);
 for (const source of ['<p>Material symbols are discussed here.</p>','<span className="bi-modal-count">Bimodal data</span>','<span className="font-sans">Material</span>']) {
  assert.equal(scanSource(source).length,0,source);
 }
});
test('catches other component icon families while retaining Lucide imports',()=>{
 for (const source of ['import {ArrowRight} from "react-feather";','import {ArrowRightOutlined} from "@ant-design/icons";','import {ArrowRight} from "@remixicon/react";'])assert.ok(scanSource(source).some(f=>f.rule==='lucide-only'),source);
 assert.equal(scanSource('import {ArrowRight} from "lucide-react";').length,0);
});


test('HTML scripts and styles keep comments and source comparisons separate from visible icons',()=>{
 const source='<html><script>\n// Config → source, not a control\nconst less = count < 3;\nconst more = count > 1;\n</script><style>/* → not rendered */ p {color:red}</style><button>Continue</button></html>';
 assert.equal(scanSource(source,'page.html').length,0);
 const findings=scanSource('<script>\nconst icon="→";\n</script><button>&rarr;</button>','page.html');
 assert.ok(findings.some(f=>f.line===2&&f.rule==='use-lucide-icon'));
 assert.ok(findings.some(f=>f.line===3&&f.rule==='use-lucide-icon'));
 assert.ok(scanSource('<style>.next:after{content:"→"}</style>','page.html').some(f=>f.rule==='use-lucide-icon'));
 assert.equal(scanSource('<script type="application/ld+json">{"name":"Arrows → notation"}</script>','page.html').length,0);
});
