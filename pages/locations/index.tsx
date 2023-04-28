import { Location } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState, useMemo, Suspense } from 'react';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei';

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
        <Canvas>
          <Suspense fallback={null}>
            <Map 
            locationData={props.locations} 
            onLocationHovered={setHoveredLocationId}
            // onLocationClicked={viewCurrentLocation}
            />
          </Suspense>
          <Stats />
        </Canvas>
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