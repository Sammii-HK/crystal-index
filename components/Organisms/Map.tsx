import { useRef } from 'react';
import { CrystalLocation } from '../../lib/types/location';
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three'

import EarthNightMap from '../../public/assets/textures/8k_earth_nightmap.jpg'
import EarthNormalMap from '../../public/assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../public/assets/textures/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../../public/assets/textures/8k_earth_clouds.jpg'
import { OrbitControls, Stars } from '@react-three/drei';

const Map: React.FC<
    {
      locationData: CrystalLocation[], 
      onLocationHovered?: (locationId: number) => void,
      onLocationClicked?: () => void
    }
  > = (props) => {
    const container = useRef<HTMLDivElement>(null);
    const cloudsRef = useRef();
    const { locationData, onLocationHovered, onLocationClicked } = props;
    const [colorMap, normalMap, specularMap, cloudMap] = 
      useLoader(TextureLoader, [EarthNightMap.src, EarthNormalMap.src, EarthSpecularMap.src, EarthCloudsMap.src]);
  
    useFrame(({ clock }) => {
      const elapsedTime = clock.elapsedTime / 50

      cloudsRef!.current.rotation.y = elapsedTime
    })
  
  
  return (
    <group ref={container} {...props} dispose={null}>
        <ambientLight intensity={.75}/>
        <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={7} 
        saturation={0}
        fade={true}
        />
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.01, 32, 32]} />
          <meshPhongMaterial 
          map={cloudMap} 
          opacity={0.15}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
          /> 
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial specularMap={specularMap} /> 
          <meshStandardMaterial map={colorMap} normalMap={normalMap} />
          <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6} 
          panSpeed={0.5}
          rotateSpeed={5}
          />
        </mesh>
      </group>
  )
}

export default Map