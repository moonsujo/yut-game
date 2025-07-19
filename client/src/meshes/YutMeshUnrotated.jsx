import React from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { animated } from "@react-spring/three";

export default function YootMeshUnrotated({ 
  position, 
  rotation=[0, 0, 0], 
  scale=1,
  active=true,
}) {

  const { scene, materials } = useGLTF(
    "/models/yut-v3-regular-darker-more.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  // can't assign two materials to one mesh.
  // assign the other material to another mesh and export it
  const modelDisabled = useGLTF('/models/yoot-v3-disabled.glb')
  const sceneDisabled = modelDisabled.scene
  const materialDisabled = modelDisabled.materials
  const cloneDisabled = useMemo(() => SkeletonUtils.clone(sceneDisabled), [sceneDisabled]);
  const graphDisabled = useGraph(cloneDisabled);
  const nodesDisabled = graphDisabled.nodes

  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      { active ? <mesh        
        castShadow
        receiveShadow
        geometry={nodes.yoot1.geometry}
        material={materials['material-disabled']}
        position={[0,0,0]}
        rotation={[0, Math.PI/2+Math.PI/16, 0]}
      /> :
      <mesh
        castShadow
        receiveShadow
        geometry={nodesDisabled.yoot0.geometry}
        material={materialDisabled['Material.006']}
        position={[0,0,0]}
        rotation={[0, 0, 0]}
      >
        {/* <meshStandardMaterial color='grey'/> */}
      </mesh>
      }
    </animated.group>
  );
}
