import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useRef } from "react";
import * as THREE from "three";

import { SettingContext } from "../../context/settingContext";
import Moon from "./Moon";
import ISS from "./ISS";

import earthDay from "/assets/earth_day.jpg";
import earthNormal from "/assets/earth_normal.jpg";
import earthSpecular from "/assets/earth_specular.jpg";
import earthDisplacement from "/assets/earth_displacement.jpg";

const Earth = ({ displacementScale }) => {
  const earthRef = useRef();
  const earthPositionRef = useRef(new THREE.Vector3(8, 0, 0));

  const { orbitLineState } = useContext(SettingContext);

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([earthDay, earthNormal, earthSpecular, earthDisplacement]);
  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * 0.2978;
    const distance = 9; // 9
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += 0.0043;
    earthPositionRef.current = earthRef.current.position;
  });

  return (
    <group ref={earthRef}>
      <mesh name="Earth" castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 50, 50]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={1000}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
        />
      </mesh>
      {/* <ISS /> */}

      <group>
        <Moon />
        {orbitLineState && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.95, 2.05, 80]} />
            <meshBasicMaterial
              color={0xf5e96c}
              opacity={0.2}
              transparent={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default Earth;