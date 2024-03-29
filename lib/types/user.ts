import { User } from '@prisma/client';
import { BInput, BSelect } from '../../components/Atoms';
import { basicField } from './field';
import { SerialisableCrystalWithUser } from '../types/crystal'

export type UserRole = 'admin' | 'unicorn' | 'user' | 'sub1'
export const userRoles: UserRole[] = [ 'admin', 'unicorn', 'user', 'sub1' ]

export type UserState = {
  name: string | undefined | null,
  email: string | undefined | null,
  image: string | undefined | null,
  role: UserRole | undefined | null,
}

export type UserWithRelations = User & {
  createdCrystals: SerialisableCrystalWithUser[],
  favouriteCrystals: SerialisableCrystalWithUser[],
}

export type UserSession = {
  userId: string,
  role: UserRole,
  username: string | undefined,
  email: string,
  status?: "authenticated" | "loading" | "unauthenticated"
}

export const userFields: ({
  key: keyof UserState,
} & basicField)[] = [
  {
    key: 'name',
    component: BInput,
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