export type GeoencodedLocation = {
  annotations: {
    // flag: 
  },
  geometry: {
    lat: number,
    lng: number,
  },
  components: {
    city: string,
    county: string,
    country: string,
  },
  formatted: string
}