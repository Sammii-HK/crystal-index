import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { User } from '../../lib/types'

const UsersView: RestrictedReactFC<UsersViewProps> = (props) => {
  return (
    <div>
      {props.users.map((user, index) =>
        <div key={user.id} className="container is-flex">
          <p>
            {index}
          </p>
          |
          <p>
            {user.id}
          </p>
          |
          <p>
            {user.name}
          </p>
          |
          <p>
            {user.role}
          </p>
        </div> 
      )}
    </div>
  )
}

export default UsersView

type UsersViewProps = {
  users: User[]
}

export const getServerSideProps: GetServerSideProps<UsersViewProps> = async () => {
  const users = await prisma().user.findMany();
  return { props: { users: users }}
}