import { useSpring, animated } from "@react-spring/three";
import { Html, Sphere } from "@react-three/drei";
import classNames from "classnames";
import { useState } from "react";
import { CrystalLocation } from "../../lib/types/location";

const A = {
	Sphere: animated(Sphere),
};

export function placeObjectOnPlanet(
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
  locationLabel: CrystalLocation;
  hoveredLocationId: number;
	onLocationHovered: (locationId: number | false) => void;
	onLocationClicked?: (locationId: number) => void;
}

export function Marker({
	markerId,
	coord,
	radius,
  locationLabel,
	onLocationHovered,
	onLocationClicked,
  hoveredLocationId
}: MarkerProps) {
	const [isHovered, setIsHovered] = useState(false);

	const springProps = useSpring({
		scale: isHovered ? 3 : 1.5,
	});

	const { rotation, position } = placeObjectOnPlanet(
		coord.lat,
		coord.lon,
		radius
	);

	return (
		<A.Sphere
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
				setIsHovered(true);
        onLocationClicked?.(markerId);
      }}
			scale={springProps.scale}
		>
			<meshBasicMaterial />
      <Html style={{pointerEvents: "none"}}>
        <div 
        className={classNames("globe-label has-text-white is-size-5 px-3 py-1", {"is-hidden": (markerId !== hoveredLocationId)})}
        >
          {locationLabel.placeName.split(",", 1)},
          {" "}
          {(locationLabel?.placeName.split(",", 1) === locationLabel?.city) ? locationLabel.city : locationLabel.country}
        </div>
      </Html>
		</A.Sphere>
	);
}
