import axios from 'axios';
import { Location } from '@prisma/client';
import { FormEventHandler, useCallback } from 'react'
import { BField, BInput } from '../../components/Atoms';

const locationFields = [
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
    required: true,
  },
  {
    key: 'long',
    label: 'Longitudinal Coordinates',
    placeHolder: '0.1240',
    required: true,
  },
]

const CreateLocations: React.FC = () => {

  const createLocation: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      placeName: {value: string}
      country: {value: string}
      lat: {value: string}
      long: {value: string}
    };

    const locationData = {
      placeName: target.placeName.value,
      country: target.country.value,
      lat: target.lat.value,
      long: target.long.value,
    };


    const res = await axios.post<{location?: Location, error: string}>('/api/location/create', 
    locationData,
    { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Location create API result", result);
  }, []);


  return (
    <div className="section">
      <div>
      <form onSubmit={createLocation}>
        {locationFields.map(field => (
          <BField label={field.label}>
            <BInput id={field.key} placeholder={field.placeHolder} required={field.required} />
          </BField>
        ))}
        <button type="submit" className="button">Create</button> 
      </form>
    </div>
    </div>
  )
}

export default CreateLocations

