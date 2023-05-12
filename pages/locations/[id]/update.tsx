import axios from 'axios';
import { useCallback } from 'react'
import useUser from '../../../lib/hooks';
import type { RestrictedReactFC } from '../../../lib/hooks'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
// import { LocationForm } from '../../../components/Organisms';
import { findLocation } from '../../../lib/helpers/locationRequests';
import { ViewLocationProps } from '../../../lib/types/location';

const UpdateLocation: RestrictedReactFC<ViewLocationProps> = (props) => {
  const { role } = useUser()
  const router = useRouter()

  console.log("props", props);
  

  const updateLocation = useCallback(async (location) => {
    const res = await axios.put<{location?: Location, error: string}>(
      `/api/location/${router.query.id}/update`, 
      location,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Location update API result", result);
  }, []);

  if (!props) return <p>No location found</p>
  return (
    <div className="section">
      {/* <LocationForm 
        onCreateLocation={updateLocation}
        location={props}
      /> */}
    </div>
  )
}

export default UpdateLocation

UpdateLocation.requireAuth = true

export const getServerSideProps: GetServerSideProps<ViewLocationProps> = async (context) => {
  const { id } = context.params!;
  const location = await findLocation(id as string);

  console.log(`UPDATE Location ${id} result: `, location)
  return { 
    props: { ...location }
  }
}
