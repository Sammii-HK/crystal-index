import { basicField } from './field';

export type CrystalLocation = {
  placeName: string,
  city?: string,
  county?: string,
  country: string,
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
