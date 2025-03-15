import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";
import { animated } from "@react-spring/three";

export default function YootRhino({ 
  position, 
  rotation=[0, 0, 0], 
  scale=1
}) {
  const { scene, materials } = useGLTF(
    "/models/yoot-v3-backdo.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <animated.group position={position} rotation={rotation} scale={scale}>      
      <mesh        
          name="yoot0"
          castShadow
          receiveShadow
          geometry={nodes.yoot0.geometry}
          material={materials['Material.006']}
        position={[0,0,0]}
        rotation={[Math.PI, 0, -1.539]}
      />
    </animated.group>
  );
}