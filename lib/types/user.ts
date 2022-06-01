import { BSelect } from '../../components/Atoms';
import { basicField } from './field';

export type UserRole = 'admin' | 'unicorn' | 'user'
export const userRoles: UserRole[] = [ 'admin', 'unicorn', 'user' ]

export type UserState = {
  name: string | undefined | null,
  email: string | undefined | null,
  image: string | undefined | null,
  role: UserRole | undefined | null,
}

export const userFields: ({
  key: keyof UserState,
} & basicField)[] = [
  {
    key: 'name',
    label: 'Username',
    placeHolder: 'Username100',
    required: true,
  },
  {
    key: 'role',
    component: BSelect,
    label: 'Role',
    placeHolder: 'Select Role',
    required: false,
  },
]