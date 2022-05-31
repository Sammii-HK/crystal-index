import prisma from '../../../lib/prisma';
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback } from "react";
import { RestrictedReactFC } from "../../../lib/hooks";

const ViewUser: RestrictedReactFC<ViewUserProps> = (props) => {
  const user = props.user;
  const router = useRouter();

  const editUser: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/users/${user?.id}/update`)
  }, [])

  if (!user) return <p>User not found</p>;

  return (
    <div>{user.role}
      {/* {(userId === crystal.createdById) && 
        <div className="column">
          <button type="button" className="button mb-4 is-pulled-right" onClick={editCrystal}>Edit</button>
        </div>
      } */}
    </div>
  )
}

export default ViewUser;

ViewUser.requireAuth = true

type ViewUserProps = {
  user: null | User
}

export const getServerSideProps: GetServerSideProps<ViewUserProps> = async (context) => {
  const { id } = context.params!;
  const user = await prisma().user.findUnique({ where: { id: (id as string) } })

  console.log(`GET User ${id} result: `, user)
  return { props: { user: user }}
}