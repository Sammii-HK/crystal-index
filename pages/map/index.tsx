import { useCallback, useEffect, useRef, useState } from 'react';
import { LocationForm } from '../../components/Organisms';
import setupGlobe from '../../lib/d3-map';
import { CrystalLocation } from '../../lib/types/location';

const Map: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  const [locationData, setLocationData] = useState([
    {"latitude": 22, "longitude": 88},
    {"latitude": 12.61315, "longitude": 38.37723},
    {"latitude": -30, "longitude": -58},
    {"latitude": -14.270972, "longitude": -170.132217},
    {"latitude": 28.033886, "longitude": 1.659626},
    {"latitude": 40.463667, "longitude": -3.74922},
    {"latitude": 35.907757, "longitude": 127.766922},
    {"latitude": 23.634501, "longitude": -102.552784}
  ])

  const createLocation = useCallback((location: CrystalLocation) => {
    console.log("location", location);
    
    setLocationData((oldLocationData) => (
      [ ...oldLocationData,
        {
          'latitude': parseFloat(location.lat),
          'longitude': parseFloat(location.long),
        }
      ]
      
    ))
  }, [])

  useEffect(() => {
    if (container.current) {
      console.log("Setting up globe")
      setupGlobe(container.current, locationData);
    }
  }, [container.current])

  return (
    <div>
      <div ref={container}/>
      <div>
        <LocationForm onCreateLocation={createLocation} />
      </div>
    </div>
  )
}

export default Map