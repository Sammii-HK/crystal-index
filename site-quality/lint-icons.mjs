#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
let ts;
try { ts = require('typescript'); } catch { throw new Error('Icon lint requires the project’s TypeScript dev dependency.'); }
const GLYPH = /[\u2190-\u21ff\u25a0-\u27bf\u2b00-\u2bff\u{1f300}-\u{1faff}›‹»«]/u;
const ENTITIES = { rarr:'→',larr:'←',uarr:'↑',darr:'↓',harr:'↔',nearr:'↗',searr:'↘',raquo:'»',laquo:'«',rsaquo:'›',lsaquo:'‹',check:'✓',times:'×',plus:'+',minus:'−' };
const decode = (s) => s.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (all, name) => {
  if (name[0] === '#') { const n=name[1].toLowerCase()==='x'?parseInt(name.slice(2),16):parseInt(name.slice(1),10);return n<=0x10ffff?String.fromCodePoint(n):all; }
  return ENTITIES[name] ?? all;
});
const OTHER_LIBRARY = /^(react-icons(?:\/|$)|@heroicons\/|@phosphor-icons\/|phosphor-react$|@fortawesome\/|@tabler\/icons|@radix-ui\/react-icons$|@iconify\/|@mui\/icons-material|react-feather$|react-bootstrap-icons$|@ant-design\/icons|@primer\/octicons-react$|@carbon\/icons-react$|@fluentui\/react-icons|@remixicon\/react$|@icon-park\/|ionicons(?:\/|$))/;
const ICON_FONT_CLASS = /(?:^|\s)(?:material-icons(?:-outlined|-round|-sharp|-two-tone)?|material-symbols-(?:outlined|rounded|sharp)|fa-(?:solid|regular|brands|light|duotone|thin)|glyphicon(?:-[a-z-]+)?)(?:\s|$)/i;
const hasIconFontClass = value => ICON_FONT_CLASS.test(value) || /(?:^|\s)bi(?:\s|$)/.test(value) && /(?:^|\s)bi-[a-z-]+(?:\s|$)/.test(value);
const ICON_FONT_FAMILY = /(?:Material\s+(?:Icons|Symbols)|Font[-\s]*Awesome|bootstrap-icons|Glyphicons\s+Halflings)/i;
const ASCII_ICON = /^(?:\+|-|−|×|x|X|\.{3}|>|<|\^|v)$/;
export function scanSource(source, filename='component.tsx') {
  const findings=[];const seen=new Set();
  const report=(offset,rule,message)=>{const line=source.slice(0,offset).split('\n').length;const key=`${line}:${rule}:${message}`;if(!seen.has(key)){seen.add(key);findings.push({line,rule,message});}};
  const inspect=(value,offset,ascii=false,review=false)=>{value=decode(value);if(GLYPH.test(value)|| (ascii&&ASCII_ICON.test(value.trim())))report(offset,review?'symbol-review':'use-lucide-icon',review?'Review this data symbol in its rendered context; it may be content rather than a UI icon.':'Replace the typed icon with a Lucide icon.');};
  if (/\.(?:css|scss)$/.test(filename)) {
    const clean=source.replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' '));
    for(const m of clean.matchAll(/\bfont-family\s*:\s*([^;}]+)/gi))if(ICON_FONT_FAMILY.test(m[1]))report(m.index,'lucide-only','Use Lucide instead of an icon font.');
    for(const m of clean.matchAll(/\bcontent\s*:\s*(["'])(.*?)\1/g)){const value=m[2].replace(/\\([\da-f]{1,6})\s?/gi,(_,hex)=>String.fromCodePoint(parseInt(hex,16)));inspect(value,m.index,true);}
    return findings;
  }
  if (/\.(?:html|vue|svelte)$/.test(filename)) {
    let clean=source.replace(/<!--[\s\S]*?-->/g,m=>m.replace(/[^\n]/g,' '));
    // Script/style text is source, not rendered HTML. Preserve offsets while scanning it in its own language.
    clean=clean.replace(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi,(whole,tag,attributes,body,offset)=>{
      if(!/\btype\s*=\s*["'](?:application\/(?:ld\+)?json|importmap)["']/i.test(attributes)) {
        const bodyOffset=offset+whole.indexOf('>')+1;
        for(const finding of scanSource(body,tag.toLowerCase()==='style'?'inline.css':'inline.js')) {
          const lineOffset=body.split('\n').slice(0,finding.line-1).reduce((total,line)=>total+line.length+1,0);
          report(bodyOffset+lineOffset,finding.rule,finding.message);
        }
      }
      return whole.replace(/[^\n]/g,' ');
    });
    for(const m of clean.matchAll(/\bclass\s*=\s*([\"'])(.*?)\1/gi))if(hasIconFontClass(m[2]))report(m.index,'lucide-only','Use Lucide instead of an icon font.');
    for(const m of clean.matchAll(/>([^<]+)</g))inspect(m[1],m.index+1,/(?:button|aria-hidden)/.test(clean.slice(Math.max(0,m.index-150),m.index)));
    for(const m of clean.matchAll(/\b(?:icon|glyph)\s*[:=]\s*(["'])(.*?)\1/g))inspect(m[2],m.index,true);
    return findings;
  }
  const kind=/\.tsx$/.test(filename)?ts.ScriptKind.TSX:/\.[cm]?jsx?$/.test(filename)?ts.ScriptKind.JSX:ts.ScriptKind.TS;
  const tree=ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true,kind);
  const ancestorTag=(node,names)=>{for(let p=node.parent;p;p=p.parent){if(ts.isJsxElement(p)&&names.includes(p.openingElement.tagName.getText(tree)))return true;}return false;};
  const visit=(node)=>{
    const svg = ts.isJsxElement(node) ? node.openingElement : ts.isJsxSelfClosingElement(node) ? node : null;
    if(svg && svg.tagName.getText(tree)==='svg') {
      const attr=svg.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='viewBox');
      const box=attr?.initializer&&ts.isStringLiteral(attr.initializer)?attr.initializer.text.split(/\s+/).map(Number):[];
      const brand=svg.attributes.properties.some(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='data-brand-mark');
      if(!brand&&box.length===4&&box[2]>0&&box[3]>0&&Math.max(box[2],box[3])<=32)report(svg.getStart(tree),'lucide-only','Replace the hand-drawn UI icon with Lucide; larger data visualisations are allowed.');
    }

    if(ts.isImportDeclaration(node)&&ts.isStringLiteral(node.moduleSpecifier)&&OTHER_LIBRARY.test(node.moduleSpecifier.text))report(node.getStart(tree),'lucide-only','Use lucide-react, lucide-vue-next, lucide-svelte or lucide instead of another icon library.');
    if(ts.isJsxText(node)) {
      if(!ancestorTag(node,['code','pre','kbd','math']))inspect(node.text,node.getStart(tree),ancestorTag(node,['button','Button','IconButton']));
    } else if(ts.isStringLiteralLike(node)||ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node)) {
      const parent=node.parent;
      const attribute=ts.isJsxAttribute(parent)?parent.name.getText(tree):'';
      if(['className','class'].includes(attribute)&&hasIconFontClass(node.text))report(node.getStart(tree),'lucide-only','Use Lucide instead of an icon font.');
      if(ts.isImportDeclaration(parent)&&ICON_FONT_FAMILY.test(node.text))report(node.getStart(tree),'lucide-only','Use Lucide instead of an icon font.');
      const key=ts.isPropertyAssignment(parent)?parent.name.getText(tree):'';
      if(!['href','src','aria-label','aria-description','title','alt'].includes(attribute)&&!ancestorTag(node,['code','pre','kbd','math'])) {
        const decorative=ts.isJsxExpression(parent)&&parent.parent && ts.isJsxElement(parent.parent)&&parent.parent.openingElement.attributes.properties.some(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='aria-hidden');
        const variable=ts.isVariableDeclaration(parent)?parent.name.getText(tree):'';
        const iconField=/(?:^|_)(?:icon|glyph)$|Icon$|Glyph$/i.test(key||variable);
        const rendered=ts.isJsxExpression(parent)||ts.isJsxAttribute(parent)||ancestorTag(node,['button','Button','IconButton','span','p','div','a','Text']);
        const chunk=ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node);
        inspect(node.text,node.getStart(tree),!chunk&&(decorative||iconField||ancestorTag(node,['button','Button','IconButton'])),!rendered&&!iconField);
      }
    }
    ts.forEachChild(node,visit);
  };
  visit(tree);return findings;
}
const IGNORE=new Set(['node_modules','.git','.next','.expo','.vercel','.turbo','dist','build','out','coverage','test-results','playwright-report','vendor','vendorized','__tests__','tests','e2e','docs','scripts','pipeline','server','backend','android','ios','content','recordings','_archive','archive','experiments','fixtures','cloudflare-worker','supabase','medusa']);
export function scanProject(root) {
  const files=[];
  function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name.startsWith('.')||IGNORE.has(e.name)||e.isSymbolicLink())continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.(?:[cm]?[jt]sx?|html|vue|svelte|css|scss)$/.test(e.name)&&!/(?:\.test\.|\.spec\.|\.d\.ts$|min\.js$|\.config\.)/.test(e.name))files.push(p);}}
  walk(root);const findings=[];
  for(const file of files) {const rel=path.relative(root,file);if(/(?:^|\/)api\//.test(rel))continue;for(const f of scanSource(fs.readFileSync(file,'utf8'),file))findings.push({file:rel,...f});}
  return {root,files:files.length,findings};
}
const FRAMEWORKS=['next','vite','astro','nuxt','@sveltejs/kit','react-scripts','expo','react-native-web','vue','svelte'];
function commonRepo(dir) {for(let p=dir;p!==path.dirname(p);p=path.dirname(p)){const git=path.join(p,'.git');if(fs.existsSync(git)){if(fs.statSync(git).isDirectory())return {common:fs.realpathSync(git),root:p};const text=fs.readFileSync(git,'utf8');const gd=path.resolve(p,text.replace(/^gitdir:\s*/,'').trim());const c=path.join(gd,'commondir');return {common:fs.realpathSync(c?path.resolve(gd,fs.readFileSync(c,'utf8').trim()):gd),root:p};}}return {common:dir,root:dir};}
export function discoverSites(workspace) {
  const selected=new Map();
  function candidates(dir,depth=0){if(depth>4)return;for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(!e.isDirectory()||e.name.startsWith('.')||IGNORE.has(e.name)||['reference','examples'].includes(e.name))continue;const p=path.join(dir,e.name);const pkg=path.join(p,'package.json');if(fs.existsSync(pkg)){try{const j=JSON.parse(fs.readFileSync(pkg,'utf8'));const deps={...j.dependencies,...j.devDependencies};if(FRAMEWORKS.some(k=>deps[k])){const repo=commonRepo(p);const key=`${repo.common}:${path.relative(repo.root,p)}`;if(!selected.has(key))selected.set(key,p);}}catch{}}if(!fs.existsSync(pkg)&&fs.existsSync(path.join(p,'index.html'))){const repo=commonRepo(p);const key=`${repo.common}:${path.relative(repo.root,p)}`;if(!selected.has(key))selected.set(key,p);}if(depth<3)candidates(p,depth+1);}}
  candidates(workspace);
  const orbit=path.join(workspace,'orbit/showcase');if(fs.existsSync(orbit))selected.set('orbit-showcase',orbit);
  return [...selected.values()].sort();
}
export function main(args) {
  const arg=(name)=>{const i=args.indexOf(name);return i<0?null:args[i+1];};
  const workspace=arg('--workspace');const roots=workspace?discoverSites(path.resolve(workspace)):[path.resolve(arg('--root')??process.cwd())];
  const extras=arg('--extra-roots');if(extras)roots.push(...JSON.parse(fs.readFileSync(extras,'utf8')));
  const projects=roots.map(scanProject);const total=projects.reduce((n,p)=>n+p.findings.filter(f=>f.rule!=='symbol-review').length,0);const review=projects.reduce((n,p)=>n+p.findings.filter(f=>f.rule==='symbol-review').length,0);
  const report={generatedAt:new Date().toISOString(),projects:projects.length,files:projects.reduce((n,p)=>n+p.files,0),violations:total,reviewCandidates:review,sites:projects};
  if(arg('--report'))fs.writeFileSync(path.resolve(arg('--report')),JSON.stringify(report,null,2)+'\n');
  for(const p of projects){if(args.includes('--summary'))console.log(`${p.findings.filter(f=>f.rule!=='symbol-review').length} violations, ${p.findings.filter(f=>f.rule==='symbol-review').length} review\t${p.root}`);else for(const f of p.findings)console.error(`${path.join(p.root,f.file)}:${f.line} ${f.rule}: ${f.message}`);}
  console.log(`Icon lint: ${projects.length} sites, ${report.files} files, ${total} violations, ${review} data symbols for review.`);
  return total?1:0;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))process.exitCode=main(process.argv.slice(2));
