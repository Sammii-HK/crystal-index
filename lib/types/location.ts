import { basicField } from './field';
import { Location } from '@prisma/client';
import { BInput } from '../../components/Atoms';
import { SerialisableCrystalWithUser } from './crystal';

export type CrystalLocation = {
  id: number,
  placeName: string,
  city?: string | null,
  county?: string | null,
  country: string | null,
  lat: string,
  long: string,
}

export type CrystalLocationWithRelations = CrystalLocation & {
  crystalsOfOrigin: SerialisableCrystalWithUser[],
  crystalsOfMemento: SerialisableCrystalWithUser[],
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
