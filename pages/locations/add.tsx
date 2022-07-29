import axios from 'axios';
import { Location } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { LocationForm } from '../../components/Organisms';

const CreateLocations: React.FC = () => {

  const createLocation = useCallback(async (location) => {
    const res = await axios.post<{location?: Location, error: string}>(
      '/api/location/create', 
      location,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = res.data;
    console.log("Location create API result", result);
  }, []);


  return (
    <div className="my-2">
      <LocationForm onCreateLocation={createLocation} />
    </div>
  )
}

export default CreateLocations

