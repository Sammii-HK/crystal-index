import { User } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { useCallback } from 'react';
import { BField, BSelect } from '../../components/Atoms';
import { checkUser } from '../../lib/helpers/checkUser';
import useUser, { RestrictedReactFC } from '../../lib/hooks';
import prisma from '../../lib/prisma';
import { userRoles, UserRole } from '../../lib/types/user';

const UsersView: RestrictedReactFC<UsersViewProps> = (props) => {
  const user = useUser()
  const updateUserRole = useCallback(async (userId, newValue: UserRole) => {
    return await axios.put<{user?: User, error: string}>(
      `api/admin/${userId}/set-role`,
      { role: newValue },
      { headers: { 'Content-Type': 'application/json' } }
    )
  }, [])

  if (user && !checkUser(user)) router.push('/')

  return (
    <div className="section is-flex is-justify-content-center">
      <table className='table is-dark'>
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
            <td>
              <BField>
                <BSelect
                  placeholder='Select Role'
                  options={userRoles}
                  selected={user.role}
                  onChange={(newValue: any) => {
                    updateUserRole(user.id, newValue)
                  }}
                  disabled={!checkUser(useUser())}
                />
              </BField>
            </td>
            <td>
              <button className='button' onClick={() => router.push(`/profile/${user.id}`)}>
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