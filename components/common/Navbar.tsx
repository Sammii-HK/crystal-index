import { useSession, signIn, signOut } from "next-auth/react"
import router from "next/router";
import useUser from "../../lib/hooks";

export default function Navbar() {
  const user = useUser()

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" onClick={() => router.push('/')}>
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
        <a className="navbar-item" onClick={() => router.push('/crystals')}>
          Crystals
        </a>
        <a className="navbar-item" onClick={() => router.push('/locations')}>
          Locations
        </a>
        {user.role === 'unicorn' && 
          <>
            <a className="navbar-item" onClick={() => router.push('/crystals/add')}>
              Add Crystal
            </a>
            <a className="navbar-item" onClick={() => router.push('/locations/add')}>
              Add Location
            </a>
          </>
        }
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user.userId && 
              <div className="is-flex">
                <div className="navbar-item">
                  <p className="body is-text-weight-bold">Hi {user.userName}! 💎</p>
                </div>
                <button className="button is-primary" onClick={() => signOut()}>Sign out</button>
              </div>
            }
            {!user.userId && 
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