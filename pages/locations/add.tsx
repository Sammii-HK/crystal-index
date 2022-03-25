import axios from 'axios';
import { Location } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField, BInput } from '../../components/Atoms';

type LocationState = {
  placeName: string,
  country: string,
  lat: string,
  long: string,
}

const locationFields: {
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
]

const CreateLocations: React.FC = () => {

  const [locationState, setLocationState] = useState<LocationState>({
    placeName: "",
    country: "",
    lat: "",
    long: "",
  })

  const createLocation: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const res = await axios.post<{location?: Location, error: string}>(
      '/api/location/create', 
      locationState,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Location create API result", result);
  }, [locationState]);


  return (
    <div className="section">
      <div>
      <form onSubmit={createLocation}>
        {locationFields.map(field => (
          <BField label={field.label} key={field.key}>
            <BInput 
              id={field.key} 
              placeholder={field.placeHolder} 
              required={field.required}
              value={locationState[field.key]}
              onChange={(newValue: any) => {
                setLocationState((oldLocationState) => ({...oldLocationState, [field.key]: newValue}))
              }}
            />
          </BField>
        ))}
        <button type="submit" className="button">Create</button> 
      </form>
    </div>
    </div>
  )
}

export default CreateLocations

