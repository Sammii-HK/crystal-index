import axios from 'axios';
import { User } from '@prisma/client';
import { useCallback } from 'react';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'

import type { RestrictedReactFC } from '../../../lib/hooks';

const UpdateUser: RestrictedReactFC<ViewUserProps> = (props) => {
  const router = useRouter()

  const setRole = useCallback(async (user) => {
    const res = await axios.put<{user?: User, error: string}>(
      `/api/admin/${router.query.id}/set-role`,
      user,
      {}
    );

    const result = await res.data;
    console.log("User update result", result);
  }, []);

  if (!props.user) return <p>No user found</p>
  setRole(props.user);

  return(
    <div>{props.user.role}</div>
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