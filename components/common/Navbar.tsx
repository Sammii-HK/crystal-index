import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()
  if (session?.user) {
    return (
      <>
        <p>signed in as {session.user.email} <br /> </p>
        <button className="button is-primary" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="button is-primary" onClick={() => signIn()}>Sign in</button>
    </>
  )
}