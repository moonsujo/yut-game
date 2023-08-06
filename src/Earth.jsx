import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { useRocketStore } from "./state/zstore";

export default function Earth({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);
  console.log("[Earth]", tiles);
  console.log("[Earth]", tile);

  const earth1Ref = useRef();
  const earth2Ref = useRef();
  const earth3Ref = useRef();
  const earth4Ref = useRef();
  const earth5Ref = useRef();
  const earthWrapRef = useRef();
  const earthGroupRef = useRef();

  useFrame((state, delta) => {
    earthGroupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    earth1Ref.current.material.color.r += 0.1;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    earth1Ref.current.material.color.r -= 0.1;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection == null) {
      setSelection({ type: "tile", tile });
    } else {
      if (selection.length > 0 && selection[0].tile != tile) {
        setPiece({ destination: tile });
      }
      setSelection(null);
    }
  }

  const rocketPositions = [
    [0, 0.2, 0 * 0.3],
    [0, 0.2, -1 * 0.3],
    [-0.3, 0.2, 0 * 0.3],
    [-0.3, 0.2, -1 * 0.3],
  ];

  const ufoPositions = [
    [0, -0.1, 1 * 0.3],
    [0, -0.1, -1 * 0.3],
    [-0.3, -0.1, 1 * 0.3],
    [-0.3, -0.1, -1 * 0.3],
  ];

  function Piece() {
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={rocketPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              id={value.id}
              key={index}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Ufo
              position={ufoPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              id={value.id}
              key={index}
            />
          ))}
        </>
      );
    }
  }

  function EarthWrap() {
    return (
      <mesh
        castShadow
        ref={earthWrapRef}
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[4, 32, 16]} />
        <meshStandardMaterial transparent opacity={0.1} />
      </mesh>
    );
  }

  return (
    <>
      <group
        ref={earthGroupRef}
        scale={0.15}
        position={position}
        rotation={[Math.PI / 16, Math.PI / 4, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.low_poly_earth.geometry}
          material={materials.water}
          position={[0, 0.12, 0]}
          rotation={[-0.4, -0.4, 0.3]}
          ref={earth1Ref}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.001"]}
            position={[1.1, 0.98, 0.38]}
            rotation={[0.49, 0.02, 0.39]}
            ref={earth2Ref}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane.geometry}
              material={materials.Material}
              position={[0.24, 1.29, 0]}
              scale={0.77}
              ref={earth3Ref}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.water}
            ref={earth4Ref}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_1.geometry}
            material={materials.earth}
            ref={earth5Ref}
          />
        </mesh>
        <EarthWrap />
        {tiles[tile].length != 0 && <Piece />}
      </group>
    </>
  );
}
