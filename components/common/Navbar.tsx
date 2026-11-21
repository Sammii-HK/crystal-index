'use client'

import { CRYSTAL_INDEX_APP_STORE_URL } from '../../lib/app-links'

import classNames from "classnames";
import Link from "next/link";
import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const menuButton = useRef<HTMLButtonElement>(null);
  const [isBurgerActive, toggleBurgerMenu] = useState<boolean>(false);

  function handleBurgerClick() {
    toggleBurgerMenu(!isBurgerActive);
  }

  function closeBurger() {
    toggleBurgerMenu(false);
  }

  return (
    <nav
      className="navbar is-fixed-top ci-navbar"
      role="navigation"
      aria-label="main navigation"
      onKeyDown={event => { if (event.key === 'Escape' && isBurgerActive) { closeBurger(); menuButton.current?.focus() } }}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item ci-navbar__brand" href="/" onClick={closeBurger}>
            <img src="/app-icon.png" alt="Crystal Index" className="ci-navbar__icon" width={32} height={32} style={{ borderRadius: 8, verticalAlign: 'middle' }} />
            <span className="ci-navbar__title">Crystal Index</span>
          </Link>

          <button
            type="button"
            ref={menuButton}
            className={classNames({
              "navbar-burger": true,
              "is-active": isBurgerActive,
            })}
            aria-label={isBurgerActive ? "Close navigation" : "Open navigation"}
            aria-controls="crystal-site-navigation"
            aria-expanded={isBurgerActive}
            onClick={handleBurgerClick}
          >
            {isBurgerActive ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>

        <div
          id="crystal-site-navigation"
          className={classNames({
            "navbar-menu": true,
            "is-active": isBurgerActive,
          })}
        >
          <div className="navbar-start">
            <Link className="navbar-item ci-navbar__link" href="/crystals" aria-current={pathname === "/crystals" || pathname.startsWith("/crystals/") ? "page" : undefined} onClick={closeBurger}>
              Crystals
            </Link>
            <Link className="navbar-item ci-navbar__link" href="/identify" aria-current={pathname === "/identify" || pathname.startsWith("/identify/") ? "page" : undefined} onClick={closeBurger}>
              Identify
            </Link>
            <Link className="navbar-item ci-navbar__link" href="/blog" aria-current={pathname === "/blog" || pathname.startsWith("/blog/") ? "page" : undefined} onClick={closeBurger}>
              Blog
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a
                className="button ci-navbar__cta"
                href={CRYSTAL_INDEX_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the App
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
