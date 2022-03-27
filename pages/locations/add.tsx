import axios from 'axios';
import { Location } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField, BInput } from '../../components/Atoms';
import { locationFields, LocationState } from '../../lib/types/location';

const CreateLocations: React.FC = () => {

  const [locationState, setLocationState] = useState<LocationState>({
    placeName: undefined,
    country: undefined,
    lat: undefined,
    long: undefined,
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

