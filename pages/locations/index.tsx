import { Location } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState, Suspense } from 'react';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';
import { Canvas } from '@react-three/fiber'
import CrystalsOfLocation from '../../components/Organisms/CrystalsOfLocation';
import { CrystalLocationWithRelations } from '../../lib/types/location';
import { findAndSerializeCrystal } from '../../lib/helpers/serializeCrystalDates'

const MapView: React.FC<MapViewProps> = (props) => {
  const [hoveredLocationId, setHoveredLocation] = useState<number | false>();
  const [activeLocationId, setActiveLocation] = useState<number | false>();

  const viewCurrentLocation = (locationId: Location["id"]) => {

    console.log("props.locations[locationId]", props.locations[locationId]);
    
    
    setActiveLocation(locationId)
    console.log("activeLocation", activeLocationId);
    
  }

  // wrap in use memo
  const activeLocation = props.locations.find(l => l.id == activeLocationId);
  
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
            activeLocationId={activeLocationId || undefined}
            />
          </Suspense>
        </Canvas>
        {activeLocation && 
          <div className="locationInformation is-flex is-flex-direction-column mr-2 mt-3 mb-6">
            <div className='locationInformationContainer m-3'>
              <button className='delete ml-3 is-pulled-right' onClick={() => setActiveLocation(false)}>
                X
              </button>
              <p className='mx-3'>
                {activeLocation?.placeName.split(",", 1) || false}, 
                {" "}
                {(activeLocation?.placeName.split(",", 1) === activeLocation?.city) ? activeLocation.city : activeLocation.country}
              </p>
              <CrystalsOfLocation location={activeLocation} />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default MapView

export type MapViewProps = {
  locations: CrystalLocationWithRelations[] 
}

const crystalIncludeConfig = {
  select: { id: true } 
}

export const getServerSideProps: GetServerSideProps<MapViewProps> = async () => {
  const locationsWithCrystalIds = await prisma().location.findMany({
    include: {
      crystalsOfOrigin: crystalIncludeConfig,
      crystalsOfMemento: crystalIncludeConfig,
    }
  });

  const locations = await Promise.all(locationsWithCrystalIds.map(async locationWithCrystalId => ({
    ...locationWithCrystalId,
    crystalsOfOrigin: await Promise.all(locationWithCrystalId.crystalsOfOrigin.map(({id}) => findAndSerializeCrystal(id))),
    crystalsOfMemento: await Promise.all(locationWithCrystalId.crystalsOfMemento.map(({id}) => findAndSerializeCrystal(id)))
  })))
  
  return { props: { locations: locations }}
}