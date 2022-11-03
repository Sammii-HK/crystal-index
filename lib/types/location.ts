import { basicField } from './field';

export type CrystalLocation = {
  placeName: string,
  city?: string | null,
  county?: string | null,
  country: string | null,
  lat: string,
  long: string,
}

export const locationFields: ({
  key: keyof CrystalLocation,
} & basicField )[] = [
  {
    key: 'placeName',
    label: 'Find a location',
    placeHolder: 'Covent Gardens, London, WC2',
    required: true,
  },
];
