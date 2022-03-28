import { useSession, signIn, signOut } from "next-auth/react"
import router from "next/router";
import { useCallback } from "react";

export default function Navbar() {
  const { data: session } = useSession()

  const viewCrystals = useCallback(async () => {
    router.push('/crystals')
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        Crystal Index
      </a>

      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item" onClick={viewCrystals}>
          Crystals
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {session?.user && 
              <div className="is-flex">
                <div className="navbar-item">
                  <p className="body is-text-weight-bold">Hi {session.user.name}! 💎</p>
                </div>
                <button className="button is-primary" onClick={() => signOut()}>Sign out</button>
              </div>
            }
            {!session?.user && 
              <div>
                <button className="button is-primary" onClick={() => signIn()}>Sign in</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}