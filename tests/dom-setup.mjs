import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://catalogue.test/crystals",
});
for (const [key, value] of Object.entries({
  window: dom.window,
  self: dom.window,
  document: dom.window.document,
  navigator: dom.window.navigator,
  HTMLElement: dom.window.HTMLElement,
  Node: dom.window.Node,
}))
  Object.defineProperty(globalThis, key, { configurable: true, value });

// Image networking/optimisation belongs to Next integration checks, not these isolated DOM tests.
import React from "react";
import {mock} from "node:test";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
mock.module(require.resolve("next/image"),{exports:{default:({src,alt,fill,priority,quality,...props})=>React.createElement("img",{src,alt,...props})}});
