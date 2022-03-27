export type LocationState = {
  placeName: string | undefined,
  country: string | undefined,
  lat: string | undefined,
  long: string | undefined,
}

export const locationFields: {
  key: keyof LocationState,
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
