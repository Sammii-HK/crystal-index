import React from "react";
import test from "node:test";
import assert from "node:assert/strict";
import { render, fireEvent, cleanup } from "@testing-library/react";
import FilterableCrystalGallery from "../components/Organisms/FilterableCrystalGallery";
const entries = [
  {
    id: 1,
    name: "Amethyst",
    bio: "Purple quartz",
    hardness: 7,
    createdAt: "2026-01-01",
    image: [],
    crystalInfo: { colour: ["violet"], chakra: ["crown"] },
  },
  {
    id: 2,
    name: "Rose Quartz",
    bio: "Colour varies",
    createdAt: "2026-01-01",
    image: [],
    crystalInfo: { colour: ["pink"], chakra: ["heart"] },
  },
];
test("real gallery exposes accessible filters, honest metadata results and restorable detail links", () => {
  const view = render(
    <FilterableCrystalGallery
      crystals={entries}
      details={{ 1: { zodiacSigns: ["Aries"], elements: ["Air"] } }}
    />,
  );
  try {
    assert.match(view.getByRole("status").textContent!, /2 of 2/);
    assert.equal(view.getAllByRole("link").length, 2);
    fireEvent.click(view.getByRole("button", { name: "Show filters" }));
    const aries = view.getByRole("button", { name: "Aries", exact: true });
    fireEvent.click(aries);
    assert.equal(aries.getAttribute("aria-pressed"), "true");
    assert.match(view.getByRole("status").textContent!, /1 of 2/);
    assert.match(
      view.getByRole("link", { name: /Amethyst/ }).getAttribute("href")!,
      /directory=zodiac%3Daries/,
    );
    assert.equal(window.location.search, "?zodiac=aries");
    fireEvent.click(view.getByRole("button", { name: "Reset view" }));
    assert.equal(document.activeElement, view.getByRole("searchbox", { name: "Find a crystal" }));
    fireEvent.change(view.getByRole("searchbox", { name: "Find a crystal" }), {
      target: { value: "no-such-crystal" },
    });
    assert.ok(
      view.getByRole("heading", { name: "No crystals match this view." }),
    );
    fireEvent.click(view.getByRole("button", { name: "Clear all filters" }));
    assert.match(view.getByRole("status").textContent!, /2 of 2/);
  } finally {
    cleanup();
    window.history.replaceState({}, "", "/crystals");
  }
});

import Navbar from "../components/common/Navbar";
import BInput from "../components/Atoms/BInput";
import {Search} from "lucide-react";
test("navigation closes on Escape and returns focus to its native menu button",()=>{
 const view=render(<Navbar/>);
 try {const button=view.getByRole("button",{name:"Open navigation"});fireEvent.click(button);assert.equal(button.getAttribute("aria-expanded"),"true");const link=view.getByRole("link",{name:"Crystals",exact:true});link.focus();fireEvent.keyDown(link,{key:"Escape"});assert.equal(button.getAttribute("aria-expanded"),"false");assert.equal(document.activeElement,button);} finally {cleanup();}
});
test("shared search field calls Enter and exposes its icon action to keyboard users",()=>{
 let entered=0,clicked=0;
 const view=render(<><label htmlFor="search-proof">Find</label><BInput id="search-proof" placeholder="Name" value="" onChange={()=>{}} onEnterKey={()=>{entered++;}} icon={Search} iconOnClick={()=>{clicked++;}} iconLabel="Find matching crystals"/></>);
 try {fireEvent.keyDown(view.getByRole("textbox",{name:"Find"}),{code:"Enter"});assert.equal(entered,1);const action=view.getByRole("button",{name:"Find matching crystals"});fireEvent.click(action);assert.equal(clicked,1);assert.equal(action.getAttribute("type"),"button");} finally {cleanup();}
});

import BImage from "../components/Atoms/BImage";
test("failed crystal photos become an accessible fallback instead of a broken image",()=>{
 const view=render(<BImage imageId={123} alt="Example crystal"/>);
 try {fireEvent.error(view.getByRole("img",{name:"Example crystal"}));assert.ok(view.getByRole("img",{name:"Example crystal: image unavailable"}));} finally {cleanup();}
});
