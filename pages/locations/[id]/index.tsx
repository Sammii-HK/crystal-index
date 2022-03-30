import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { Location } from '@prisma/client';
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback } from 'react';

const fieldsToShow: (keyof Location)[] = [ 'placeName', 'country', 'lat', 'long',  ]

const ViewCrystal: React.FC<ViewCrystalocationProps> = (props) => {
  const location = props.location;
  const router = useRouter();
  
  const editLocation: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/locations/${location?.id}/update`)
  }, []);

  if (!location) return <p>Location not found</p>;

  return (
    <div className="section">
      <button type="button" className="button mb-4" onClick={editLocation}>Edit</button>
      {fieldsToShow.map(field => (
        <div key={field}>
          <p className='my-3'>
            <span className='has-text-weight-bold is-capitalized'>{field}: </span>
            {location[field]}
          </p>
        </div>
      ))}
      <hr />
      
    </div>
  )
}

export default ViewCrystal;

type ViewCrystalocationProps = {
  location: null | Location
}

export const getServerSideProps: GetServerSideProps<ViewCrystalocationProps> = async (context) => {
  const { id } = context.params!;
  const location = await prisma.location.findUnique( { where: { id: parseInt(id as string) } } );

  console.log(`GET Location ${id} result: `, location)
  return { props: {location: location }}
}
