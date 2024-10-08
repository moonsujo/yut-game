import { Text3D } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { EffectComposer } from 'three-stdlib';

export default function Title({ position, rotation, scale, setDisplay }) {

    const [hover, setHover] = useState(false);
    function handlePointerEnter() {
        setHover(true)
    }
    function handlePointerLeave() {
        setHover(false)
    }
    function handlePointerUp() {
        setDisplay('board')
    }

    const { gl } = useThree();
    const composer = new EffectComposer(gl);
    let color0 = useRef(2.6);
    let color1 = useRef(2.6);
    let textRef = useRef();
    useFrame((state) => {
      const time = state.clock.elapsedTime;
      // color0.current = 1.6 + Math.sin(time* 10) * 3;
      // color1.current = 1.6 + Math.sin(time* 10) * 3;
      // composer.render()
      // console.log(textRef.current.material)

      // textRef.current.material.color.r = 1 + Math.sin(time* 2) * 0.08
      // textRef.current.material.color.g = 1 + Math.sin(time* 2) * 0.08
      // textRef.current.material.color.b = 0
    })

    return <group scale={scale} position={position} rotation={rotation}
    >
      {/* line 1 */}
      {/* line 2 */}
      {/* wrapper */}
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -0.5, 0]}
        ref={textRef}
      >
        YOOT
        <meshStandardMaterial color={hover ? "green": [0.7, 0.7, 0]}/>
        {/* <meshStandardMaterial color={[3, 3, 0]} /> */}
      </Text3D>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -1, 0]}
      >
        GAME
        <meshStandardMaterial color={hover ? "green": [0.7, 0.7, 0]}/>
      </Text3D>
      {/* <mesh scale={[0.8, 0.01, 0.6]} position={[0.5,-0.5, -0.1]} rotation={[Math.PI/2, 0, 0]} >
        <cylinderGeometry args={[1, 1, 1, 100]}/>
        <meshStandardMaterial color={[2, 3, 0]} transparent opacity={0.98}/>
      </mesh> */}
      <mesh 
        position={[0.7, -0.5, 0]} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
      >
        <boxGeometry args={[1.5, 1, 0.1]}/>
        <meshStandardMaterial color="grey" transparent opacity={0}/>
      </mesh>
    </group>
}