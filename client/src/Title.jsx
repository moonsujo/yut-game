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
      textRef.current.material.color.r = 3.2 + Math.sin(time* 2) * 0.3
      textRef.current.material.color.g = 3.2 + Math.sin(time* 2) * 0.3
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
        {/* <meshStandardMaterial color={hover ? "green": "#DDD709"} /> */}
        {/* <meshStandardMaterial color={[color0.current, color1.current, 0.0]}/> */}
      </Text3D>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -1, 0]}
      >
        GAME
        <meshStandardMaterial color={hover ? "green": "#DDD709"} />
      </Text3D>
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