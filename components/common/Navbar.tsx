import classNames from "classnames";
import { signIn, signOut } from "next-auth/react"
import router from "next/router";
import { useState } from "react";
import { checkUser } from "../../lib/helpers/checkUser";
import useUser from "../../lib/hooks";


export default function Navbar() {
  const user = useUser()

  const [ isBurgerActive, toggleBurgerMenu] = useState<boolean>(false);

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
        {user?.userId &&
          <div className="navbar-item">
            <p className="body is-text-weight-bold is-hidden-desktop">Hi {user.username}! 💎</p>
          </div>
        }
        <a className="navbar-item" onClick={() => router.push('/crystals')}>
          Crystals
        </a>
        {/* <a className="navbar-item" onClick={() => router.push('/locations')}>
          Locations
        </a> */}
      </div>

      <div className="navbar-end is-align-content-center">
        {user?.userId && 
          <div className=" is-flex">
            <div className="navbar-item is-hidden-touch">
              <p className="body is-text-weight-bold mb-1 mr-3">Hi {user.username}!
                <span>
                  {user.role === 'unicorn' ? ' 🦄' : ' 💎'}
                </span>
              </p>
            </div>
            <a className="navbar-item" onClick={() => router.push(`/profile/${user.userId}` )}>
              Profile
            </a>
          </div>
        }
        {user && checkUser(user) && 
          <>
            <a className="navbar-item is-secondary" onClick={() => router.push('/crystals/add')}>
              Add Crystal
            </a>
            <a className="navbar-item is-secondary" onClick={() => router.push('/users')}>
              Admin
            </a>
          </>
        }
        {user?.userId && 
          <>
            <button className="navbar-item button is-primary is-hidden-touch mt-1 ml-3" onClick={() => signOut()}>Sign out</button>
            <p className="navbar-item is-hidden-desktop has-text-pink is-clickable" onClick={() => signOut()}>Sign out</p>
          </>
        }
        {!user?.userId && 
          <div>
            <button className="navbar-item button is-primary is-hidden-touch mb-0" onClick={() => signIn(undefined, { callbackUrl: '/' })}>Sign in</button>
            <p className="navbar-item is-hidden-desktop has-text-green is-clickable" onClick={() => signIn(undefined, { callbackUrl: '/' })}>Sign in</p>
          </div>
        }
        <div className="buttons">
        </div>
      </div>
    </div>
  </nav>
  )
}