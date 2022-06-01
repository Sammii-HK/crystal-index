import { User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { RestrictedReactFC } from '../../lib/hooks';
import prisma from '../../lib/prisma';

const UsersView: RestrictedReactFC<UsersViewProps> = (props) => {
  return (
    <div className="section is-flex is-justify-content-center">
      <table className='table'>
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
        {props.users.map((user: User, index: number) =>
          <tr key={user.id}> 
            <th>{index}</th>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>
              <button className='button is-small' onClick={() => router.push(`/users/${user.id}`)}>
                View
              </button>
            </td>
          </tr> 
        )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView

UsersView.requireAuth = true

type UsersViewProps = {
  users: User[]
}

export const getServerSideProps: GetServerSideProps<UsersViewProps> = async () => {
  const users = await prisma().user.findMany();
  return { props: { users: users }}
}