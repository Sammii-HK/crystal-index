import { Location } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState, useMemo } from 'react';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';

const MapView: React.FC<MapViewProps> = (props) => {
  const [hoveredLocationId, setHoveredLocationId] = useState<number | undefined>();
  const [activeLocation, setActiveLocation] = useState<boolean>();
  // setActiveLocation(false)
  
  const currentLocation = useMemo(() => {
    // const currentLocation = props.locations.find(location => location.id == hoveredLocationId);
    setActiveLocation(true)
    
  }, [activeLocation])

  
  

  return (
    <>
      <div className="container is-flex is-align-content-center locations-map">
        <Map 
        locationData={props.locations} 
        onLocationHovered={setHoveredLocationId}
        onLocationClicked={viewCurrentLocation}
        />
      </div>
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