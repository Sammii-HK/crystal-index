import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ci-footer">
      <div className="container">
        <div className="columns is-multiline">
          {/* Brand column */}
          <div className="column is-4">
            <div className="ci-footer__brand">
              <span className="ci-footer__icon">&#9670;</span>
              <span className="ci-footer__title">Crystal Index</span>
            </div>
            <p className="ci-footer__tagline">
              Your personal crystal encyclopaedia and companion. Explore, identify, and learn about the world of crystals.
            </p>
          </div>

          {/* Explore column */}
          <div className="column is-2 is-offset-2">
            <h4 className="ci-footer__heading">Explore</h4>
            <ul className="ci-footer__links">
              <li><Link href="/crystals">Crystals</Link></li>
              <li><Link href="/identify">Identify</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="column is-2">
            <h4 className="ci-footer__heading">Legal</h4>
            <ul className="ci-footer__links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
            </ul>
          </div>

          {/* App column */}
          <div className="column is-2">
            <h4 className="ci-footer__heading">Get the App</h4>
            <a
              className="ci-footer__app-badge"
              href="https://apps.apple.com/app/crystal-index/id6741419625"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
                <rect width="120" height="40" rx="6" fill="#000" />
                <text x="60" y="14" fill="#fff" fontSize="7" fontFamily="system-ui, sans-serif" textAnchor="middle">Download on the</text>
                <text x="60" y="28" fill="#fff" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" textAnchor="middle">App Store</text>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="ci-footer__divider"></div>

        {/* Bottom bar */}
        <div className="columns is-mobile is-vcentered ci-footer__bottom">
          <div className="column">
            <p className="ci-footer__copyright">
              &copy; {currentYear} Crystal Index. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
