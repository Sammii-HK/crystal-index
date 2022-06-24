import classNames from "classnames";
import { signIn, signOut } from "next-auth/react"
import router from "next/router";
import { useState } from "react";
import useUser from "../../lib/hooks";


export default function Navbar() {
  const user = useUser()

  const [ isBurgerActive, toggleBurgerMenu] = useState(false);

  function handleBurgerClick() {
    toggleBurgerMenu(!isBurgerActive);
  }

  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" onClick={() => router.push('/')}>
        Crystal Index
      </a>

      <a 
      role="button" 
      className={
        classNames({
        "navbar-burger": true,
        "is-active": isBurgerActive,
        })
      } 
      aria-label="menu" 
      aria-expanded="false" 
      data-target="navbarBasicExample"
      onClick={handleBurgerClick}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div 
    id="navbarBasicExample" 
    className={
      classNames({
        "navbar-menu": true,
        "is-active": isBurgerActive,
      })
    }
    >
      <div className="navbar-start">
        {user.userId &&
          <div className="navbar-item">
            <p className="body is-text-weight-bold is-hidden-desktop">Hi {user.userName}! 💎</p>
          </div>
        }
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
                <div className="navbar-item is-hidden-touch">
                  <p className="body is-text-weight-bold">Hi {user.userName}! 💎</p>
                </div>
                <button className="button is-primary is-hidden-touch" onClick={() => signOut()}>Sign out</button>
                <p className="is-hidden-desktop has-text-pink is-clickable" onClick={() => signOut()}>Sign out</p>
              </div>
            }
            {!user.userId && 
              <div>
                <button className="button is-primary is-hidden-touch" onClick={() => signIn()}>Sign in</button>
                <p className="is-hidden-desktop has-text-green is-clickable" onClick={() => signIn()}>Sign in</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}