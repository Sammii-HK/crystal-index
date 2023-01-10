import axios from 'axios';
import { User } from '@prisma/client';
import { useCallback } from 'react';
import { useRouter } from 'next/router'

import useUser from '../../../lib/hooks';
import type { RestrictedReactFC } from '../../../lib/hooks';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';

const UpdateUser: RestrictedReactFC<ViewUserProps> = (props) => {
//   const { role } = useUser()
//   const router = useRouter()

//   // const setRole = useCallback(async (user) => {
//   //   const res = await axios.put<{user?: User, error: string}>(
//   //     `/api/admin/${router.query.id}/set-role`,
//   //     user,
//   //     {}
//   //   );

//     const result = await res.data;
//     console.log("User update result", result);
//   }, []);

  // if (!props.user) return <p>No user found</p>

  return(
    // <div>{props.user.role}</div>
    <p></p>
  )
}
  

export default UpdateUser

UpdateUser.requireAuth = true

type ViewUserProps = {
  user: null | User
}

export const getServerSideProps: GetServerSideProps<ViewUserProps> = async (context) => {
  const { id } = context.params!;
  const user = await prisma().user.findUnique({ where: { id: (id as string) } });

  console.log(`UPDATE User ${id} result: `, user)

  return {
    props: {
      user: user,
    }
  }
}