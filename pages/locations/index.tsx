import { Location } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState, useMemo, Suspense } from 'react';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';
import { Canvas } from '@react-three/fiber'
import { Html, Stats } from '@react-three/drei';

const MapView: React.FC<MapViewProps> = (props) => {
  const [hoveredLocationId, setHoveredLocation] = useState<number | false>();
  const [activeLocation, setActiveLocation] = useState<number | false>();

  const viewCurrentLocation = (locationId: Location["id"]) => {

    console.log("props.locations[locationId]", props.locations[locationId - 1]);
    
    
    setActiveLocation(locationId)
    console.log("activeLocation", activeLocation);
    
  }
  
  return (
    <>
      <div className="container is-flex is-align-content-center locations-map"> 
        <Canvas>
          <Suspense fallback={null}>
            <Map 
            locationData={props.locations} 
            onLocationHovered={setHoveredLocation}
            onLocationClicked={viewCurrentLocation}
            hoveredLocationId={hoveredLocationId}
            activeLocationId={activeLocation || undefined}
            />
          </Suspense>
          <Stats />
          {/* <Html position={[3,1.5,0]}> */}
          {/* <Html position={[0,0,0]}>
            {activeLocation && 
              <div className="locationInformation is-flex is-flex-direction-column">
                <button className='mb-3 is-justify-self-flex-end' onClick={() => setActiveLocation(false)}>
                  X
                </button>
                <p>
                  {JSON.stringify(activeLocation && props.locations[activeLocation - 1].placeName) || false}
                </p>
              </div>
            }
          </Html> */}
        </Canvas>
        {activeLocation && 
          <div className="locationInformation is-flex is-flex-direction-column">
            <button className='mb-3 is-justify-self-flex-end' onClick={() => setActiveLocation(false)}>
              X
            </button>
            <p>
              {JSON.stringify(activeLocation && props.locations[activeLocation - 1].placeName) || false}
            </p>
          </div>
        }
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