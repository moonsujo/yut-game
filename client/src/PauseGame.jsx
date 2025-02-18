import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import Star from "./meshes/Star";
import MeshColors from "./MeshColors";
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import { useAtomValue } from "jotai";
import { clientAtom, hostAtom } from "./GlobalState";

export default function PauseGame({ position }) {
  const [hover, setHover] = useState(false);

  const params = useParams();
  const client = useAtomValue(clientAtom)
  const host = useAtomValue(hostAtom)
  const isHost = client._id === host._id

  const borderMesh0Ref = useRef();
  const borderMesh1Ref = useRef();
  const borderMesh2Ref = useRef();
  const borderMesh3Ref = useRef();
  const borderMesh4Ref = useRef();
  const borderMesh5Ref = useRef();
  const borderMesh6Ref = useRef();
  const borderMeshRefs = [
    borderMesh0Ref,
    borderMesh1Ref,
    borderMesh2Ref,
    borderMesh3Ref,
    borderMesh4Ref,
    borderMesh5Ref,
    borderMesh6Ref
  ]
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      if (borderMeshRefs[i].current) {
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
        borderMeshRefs[i].current.position.y = 0.1
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
      }
    }
  })

  function handlePointerEnter(e) {
    e.stopPropagation()
    setHover(true)
  }
  
  function handlePointerLeave(e) {
    e.stopPropagation()
    setHover(false)
  }
  
  function handlePointerUp(e) {
    e.stopPropagation()
    if (isHost) {    
      socket.emit('pauseGame', ({ roomId: params.id, clientId: client._id, flag: false}))
    }
  }

  return <group position={position} rotation={[0, Math.PI/2, 0]}>
    <mesh
      castShadow
      receiveShadow
      scale={[2, 0.055, 2.6]}
      onPointerEnter={e => handlePointerEnter(e)}
      onPointerLeave={e => handlePointerLeave(e)}
      onPointerUp={e => handlePointerUp(e)}
    >
      <cylinderGeometry args={[1, 1, 1, 64]}/>
      <meshStandardMaterial color='black' opacity={0.8} transparent/>
    </mesh>
    <group>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={ isHost ? [0, 0.05, -1.65] : [-0.75, 1, -1.6] }
        size={0.7}
        height={0.01}
        lineHeight={0.8}
      >
        {`PAUSED`}
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      {/* unpause if host */}
      { isHost && <group name='unpause-button' position={[0.15, 0, 0]}>
        <mesh name='unpause-button-outer-box' position={[-1, 0.05, 0]}>
          <boxGeometry args={[0.95, 0.01, 2.85]}/>
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh name='unpause-button-inner-box' position={[-1, 0.05, 0]}>
          <boxGeometry args={[0.9, 0.02, 2.8]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[-1.2,0.06,-1.17]}
          size={0.4}
          height={0.01}
          lineHeight={0.8}
        >
          {`unpause`}
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>}
    </group>
    <group ref={borderMesh0Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
    <group ref={borderMesh1Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
    <group ref={borderMesh2Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
    <group ref={borderMesh3Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
    <group ref={borderMesh4Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
    <group ref={borderMesh5Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
    <group ref={borderMesh6Ref}>
      <Star 
        scale={0.2}
        color='limegreen'
      />
    </group>
  </group>
}