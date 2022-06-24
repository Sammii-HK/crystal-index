import { Location } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';

const MapView: React.FC<MapViewProps> = (props) => {
  const [hoveredLocationId, setHoveredLocationId] = useState<number | undefined>();

  return (
    <>
      <div className="container is-flex is-align-content-center locations-map">
        <Map locationData={props.locations} onLocationHovered={setHoveredLocationId}/>
      </div>
      {props.locations.find(location => location.id == hoveredLocationId)?.placeName}
    </>
  )
}

export default MapView

type MapViewProps = {
  locations: Location[] 
}

export const getServerSideProps: GetServerSideProps<MapViewProps> = async () => {
  const locations = await prisma().location.findMany();
  return { props: { locations: locations }}
}