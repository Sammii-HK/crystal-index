import { GetServerSideProps } from 'next';
import { Location } from '@prisma/client';
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback } from 'react';
import { Map } from '../../../components/Organisms';
import { findLocation } from '../../../lib/helpers/locationRequests';
import { ViewLocationProps } from '../../../lib/types/location';

const fieldsToShow: (keyof Location)[] = [ 'placeName', 'country' ];

const ViewLocation: React.FC<ViewLocationProps> = (props) => {
  const location = props.location;
  const router = useRouter();
  
  const editLocation: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/locations/${location?.id}/update`)
  }, []);

  if (!location) return <p>Location not found</p>;

  return (
    <div className="container">
      <div className="columns mt-6">
        <div className="column">
          <p className='my-3'>
            <span className='has-text-weight-bold is-capitalized'>Location: </span>
            {location.placeName}, {location.country}
          </p>
        </div>
        <div className="column">
          <p className='my-3'>
            <span className='has-text-weight-bold is-capitalized'>Coordinates: </span>
            {location.lat}, {location.long}
          </p>
        </div>
        <div className="column is-1">
          <button type="button" className="button mb-4" onClick={editLocation}>Edit</button>
        </div>
      </div>

      <div className="container is-flex is-align-content-center location-map">
        <Map locationData={[location]}/>
      </div>

      
    </div>
  )
}

export default ViewLocation;

export const getServerSideProps: GetServerSideProps<ViewLocationProps> = async (context) => {
  const { id } = context.params!;
  const location = await findLocation(id as string);

  console.log(`GET Location ${id} result: `, location)
  return { props: { ...location }}
}
