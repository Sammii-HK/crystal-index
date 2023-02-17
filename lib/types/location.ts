import { basicField } from './field';
import { Location } from '@prisma/client';
import { BInput } from '../../components/Atoms';

export type CrystalLocation = {
  id?: number,
  placeName: string,
  city?: string | null,
  county?: string | null,
  country: string | null,
  lat: string,
  long: string,
}

export type ViewLocationProps = {
  location: null | Location,
  children: React.ReactNode
}

export const locationFields: ({
  key: keyof Omit<CrystalLocation, 'id'>,
} & basicField )[] = [
  {
    key: 'placeName',
    label: 'Find a location',
    placeHolder: 'Covent Gardens, London, WC2',
    required: true,
    component: BInput
  },
];
