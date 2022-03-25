import { useRouter } from 'next/router';
import useUserId from '../../lib/hooks'

const AuthGuard: React.FC<any> = (props) => {
  const router = useRouter()
  const { status } = useUserId();

  if (status === 'unauthenticated') router.push('/api/auth/signin')
  if (status === 'authenticated') return (
    <div className="container">
      {props.children}
    </div>
  )

  return (
    <div className="hero is-fullheight-with-navbar">
      <div className="hero-body has-text-centered">
        <h1 className='title'>Loading...</h1>
      </div>
    </div>
  )
}

export default AuthGuard;

