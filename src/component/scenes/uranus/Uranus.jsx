import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import uranusMap from "/assets/uranus_map.jpeg";

const Uranus = ({ displacementScale }) => {
  const uranusRef = useRef();
  const uranusPositionRef = useRef(new THREE.Vector3(6, 0, 0)); // Create a reference to the Uranus's position vector

  const [uranusTexture] = useTexture([uranusMap]);
  useFrame(({ clock }) => {
    // Calculate the Uranus's position based on its angle from the Sun
    const angle = clock.getElapsedTime() * 0.06795;
    const distance = 172.62; // 30
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    uranusRef.current.position.set(x, 0, z);
    uranusRef.current.rotation.y += 0.01129;
    uranusPositionRef.current = uranusRef.current.position;
  });

  return (
    <mesh name="Uranus" ref={uranusRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[4.01, 32, 32]} />
      <meshPhongMaterial
        map={uranusTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Uranus;