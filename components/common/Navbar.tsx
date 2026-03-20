'use client'

import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
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
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item ci-navbar__brand" href="/" onClick={closeBurger}>
            <span className="ci-navbar__icon">&#9670;</span>
            <span className="ci-navbar__title">Crystal Index</span>
          </Link>

          <a
            role="button"
            className={classNames({
              "navbar-burger": true,
              "is-active": isBurgerActive,
            })}
            aria-label="menu"
            aria-expanded={isBurgerActive}
            onClick={handleBurgerClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          className={classNames({
            "navbar-menu": true,
            "is-active": isBurgerActive,
          })}
        >
          <div className="navbar-start">
            <Link className="navbar-item ci-navbar__link" href="/crystals" onClick={closeBurger}>
              Crystals
            </Link>
            <Link className="navbar-item ci-navbar__link" href="/identify" onClick={closeBurger}>
              Identify
            </Link>
            <Link className="navbar-item ci-navbar__link" href="/blog" onClick={closeBurger}>
              Blog
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a
                className="button ci-navbar__cta"
                href="https://apps.apple.com/app/crystal-index/id6741419625"
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
