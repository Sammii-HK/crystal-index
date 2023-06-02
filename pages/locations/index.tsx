import { Location } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState, Suspense } from 'react';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';
import { Canvas } from '@react-three/fiber'
import CrystalsOfLocation from '../../components/Organisms/CrystalsOfLocation';
import { CrystalLocationWithRelations } from '../../lib/types/location';
import { findAndSerializeCrystal } from '../../lib/helpers/serializeCrystalDates'
import useUser from '../../lib/hooks';
import { SerialisableCrystalWithUser } from '../../lib/types/crystal';


const MapView: React.FC<MapViewProps> = (props) => {
  const user = useUser();
  const [hoveredLocationId, setHoveredLocation] = useState<number | false>();
  const [activeLocationId, setActiveLocation] = useState<number | false>();

  const viewCurrentLocation = (locationId: Location["id"]) => {
    setActiveLocation(locationId)
  }

  // wrap in use memo
  const activeLocation = props.locations.find(l => l.id == activeLocationId); 

  const filterMementos = (mementoCrystals: SerialisableCrystalWithUser[]) => mementoCrystals.map(crystal => {
    if (crystal.createdById === user?.userId) return crystal
    else return
  }).filter(e => e !== undefined)
  
  const filteredCrystalsMemento = activeLocation && filterMementos(activeLocation.crystalsOfMemento);
  
  const filteredCrystalsActiveLocation = { ...activeLocation, crystalsOfMemento: filteredCrystalsMemento}

  const filteredMapLocations = props.locations.map(location => {
    const filteredMementos = filterMementos(location.crystalsOfMemento)
    if (location.crystalsOfOrigin.length === 0 && filteredMementos.length === 0) return
    else return location
  }).filter(e => e !== undefined)
  
  return (
    <>
      <div className="container is-flex is-align-content-center locations-map"> 
        <Canvas>
          <Suspense fallback={null}>
            <Map 
            locationData={filteredMapLocations} 
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
              <p className='mx-3 pr-6'>
                {activeLocation?.placeName.split(",", 1) || false}, 
                {" "}
                {(activeLocation?.placeName.split(",", 1) === activeLocation?.city) ? activeLocation.city : activeLocation.country}
              </p>
              <CrystalsOfLocation location={filteredCrystalsActiveLocation} />
              {/* <CrystalsOfLocation location={activeLocation} /> */}
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