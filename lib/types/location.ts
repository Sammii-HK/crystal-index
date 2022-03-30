export type CrystalLocation = {
  placeName: string,
  country: string,
  lat: string,
  long: string,
}

export const locationFields: {
  key: keyof CrystalLocation,
  label: string,
  placeHolder: string,
  required: boolean,
  options?: string[]
}[] = [
  {
    key: 'placeName',
    label: 'Place Name',
    placeHolder: 'Covent Gardens',
    required: true,
  },
  {
    key: 'country',
    label: 'Country',
    placeHolder: 'England',
    required: true,
  },
  {
    key: 'lat',
    label: 'Latitudinal Coordinates',
    placeHolder: '51.5117',
    required: false,
  },
  {
    key: 'long',
    label: 'Longitudinal Coordinates',
    placeHolder: '0.1240',
    required: false,
  },
];
