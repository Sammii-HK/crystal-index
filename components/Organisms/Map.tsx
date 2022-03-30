import { useEffect, useRef } from 'react';
import setupGlobe from '../../lib/d3-map';
import { CrystalLocation } from '../../lib/types/location';

const Map: React.FC<{locationData: CrystalLocation[]}> = (props) => {
  const { locationData } = props
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      console.log("Setting up globe")
      const cleanUpGlobe = setupGlobe(container.current, locationData);

      return () => {
        console.log("Cleaning up");
        cleanUpGlobe();
      }
    }
  }, [container.current, locationData])
  
  return (
    <div ref={container} key={JSON.stringify(locationData)} className="globeContainer" />
  )
}

export default Map