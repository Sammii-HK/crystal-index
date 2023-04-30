// import type { EarthProps } from './Earth'
import { CrystalInfo } from "@prisma/client";
import { useSpring, animated } from "@react-spring/three";
import { Html, Sphere } from "@react-three/drei";
import classNames from "classnames";
import { useState } from "react";

const A = {
	Sphere: animated(Sphere),
};

function placeObjectOnPlanet(
	lat: number,
	lon: number,
	radius: number
): Record<"position" | "rotation", [number, number, number]> {
	var latRad = lat * (Math.PI / 180);
	var lonRad = -lon * (Math.PI / 180);

	return {
		position: [
			Math.cos(latRad) * Math.cos(lonRad) * radius,
			Math.sin(latRad) * radius,
			Math.cos(latRad) * Math.sin(lonRad) * radius,
		],
		rotation: [0.0, -lonRad, latRad - Math.PI * 0.5],
	};
}

interface MarkerProps {
	markerId: number;
	coord: { lat: number; lon: number };
	radius: number;
  label: string;
  hoveredLocationId: number;
	onLocationHovered: (locationId: number | false) => void;
	onLocationClicked?: () => void;
}

export function Marker({
	markerId,
	coord,
	radius,
  label,
	onLocationHovered,
	onLocationClicked,
  hoveredLocationId
}: MarkerProps) {
	const [isHovered, setIsHovered] = useState(false);

	const springProps = useSpring({
		scale: isHovered ? 1.4 : 1,
	});

	const { rotation, position } = placeObjectOnPlanet(
		coord.lat,
		coord.lon,
		radius
	);

	return (
		<A.Sphere
			// onClick={() => (window.location.hash = coord.hash)}
			position={position}
			rotation={rotation}
			args={[0.01, 10, 10]}
			onPointerEnter={() => {
				setIsHovered(true);
				document.body.style.cursor = "pointer";
				onLocationHovered(markerId);
			}}
			onPointerLeave={() => {
        setIsHovered(false);
				document.body.style.cursor = "default";
        onLocationHovered(false);
			}}
      onClick={() => {
        onLocationClicked(markerId);
      }}
			scale={springProps.scale}
		>
			<meshBasicMaterial color={0xffe600} />
      <Html>
        <div 
        className={classNames("label has-text-white is-size-3", {"is-hidden": (markerId !== hoveredLocationId)})}
        style={{pointerEvents: "none"}}
        >
          {label.substring(0, 10)}
        </div>
      </Html>
		</A.Sphere>
	);
}
