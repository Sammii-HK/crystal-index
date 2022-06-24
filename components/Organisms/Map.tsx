import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import setupGlobe from '../../lib/d3-map';
import { CrystalLocation } from '../../lib/types/location';

const Map: React.FC<{locationData: CrystalLocation[], onLocationHovered?: (locationId: number) => void}> = (props) => {
  const { locationData, onLocationHovered } = props;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      console.log("Setting up globe")
            
      const cleanUpGlobe = setupGlobe({
        container: container.current,
        locationData,
        onLocationHovered: onLocationHovered || (() => {})
      });

      return () => {
        console.log("Cleaning up");
        cleanUpGlobe();
      }
    }
  }, [container.current, locationData, onLocationHovered])
  
  return (
      <div ref={container} className="globe-container" />
  )
}

export default Map