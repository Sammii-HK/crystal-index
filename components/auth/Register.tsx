import { User } from '@prisma/client';
import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next'
import { FormEventHandler, useCallback } from 'react'

export default function Form() {
  const registerUser: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: {value: string},
      password: {value: string},
    };

    const userData = {
      username: target.username.value,
      password: target.password.value,
    };


    const res = await axios.post<{user?: User, error: string}>('/api/user/register', 
    userData,
    {  
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    const result = await res.data;
    console.log("Register API result", result);
  }, []);

  return (
    <div>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input id="username" name="username" type="text" autoComplete="username" required />
        <input id="password" name="name" type="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
   
// }
