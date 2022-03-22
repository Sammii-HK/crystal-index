import { User } from '@prisma/client';
import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next'
import { FormEventHandler, useCallback } from 'react'

export default function Form() {
  const registerUser: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name?: {value: string},
      email?: {value: string},
      password?: {value: string},
    };

    const userData = {
      name: target.name?.value,
      email: target.email?.value,
      password: target.password?.value,
    };


    const res = await axios.put<{user?: User, error: string}>('/api/user/update', 
    userData,
    {  
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    const result = await res.data;
    console.log("Update API result", result);
  }, []);

  return (
    <div>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
        <input id="email" name="email" type="text" autoComplete="email" required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
   
// }
