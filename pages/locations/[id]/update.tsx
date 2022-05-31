import axios from 'axios';
import { Location } from '@prisma/client';
import { useCallback } from 'react'
import useUser from '../../../lib/hooks';
import type { RestrictedReactFC } from '../../../lib/hooks'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
import { LocationForm } from '../../../components/Organisms';

const UpdateLocation: RestrictedReactFC<ViewLocationProps> = (props) => {
  const { role } = useUser()
  const router = useRouter()

  const updateLocation = useCallback(async (location) => {
    const res = await axios.put<{location?: Location, error: string}>(
      `/api/location/${router.query.id}/update`, 
      location,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Location create API result", result);
  }, []);

  if (!props.location) return <p>No location found</p>
  return (
    <div className="section">
      <LocationForm 
        onCreateLocation={updateLocation}
        location={props.location}
      />
    </div>
  )
}

export default UpdateLocation

UpdateLocation.requireAuth = true


type ViewLocationProps = {
  location: null | Location
}

export const getServerSideProps: GetServerSideProps<ViewLocationProps> = async (context) => {
  const { id } = context.params!;
  const location = await prisma().location.findUnique({ where: { id: parseInt(id as string) } });

  console.log(`UPDATE Location ${id} result: `, location)
  return { 
    props: {
      location: location,
    }
  }
}
