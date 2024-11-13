import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";

export default function YootRhino({ 
  position, 
  rotation=[0, 0, 0], 
  scale=1
}) {
  const { scene, materials } = useGLTF(
    "models/yoot-v2-backdo.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group position={position} rotation={rotation} scale={scale}>      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.yoot0.geometry}
        material={materials['Material.006']}
        position={[0,0,0]}
        rotation={[Math.PI, 0, -1.539]}
      />
    </group>
  );
}

useGLTF.preload("models/yoot-rhino.glb")