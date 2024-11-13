// parameter: score
// arrange shape to match

import { animated } from '@react-spring/three';
import React from 'react';
import YootMesh from './YootMesh';
import YootRhino from './YootRhino';

export default function YootSet({position=[0,0,0], rotation=[0,0,0], scale=1, points='do'}) {
    function Do() {
      return <animated.group position={position} rotation={rotation} scale={scale}>
        <YootMesh position={[0, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[1.5, 0, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[3, 0, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootRhino position={[4.5, 0, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>
      </animated.group>
    }
    function Ge() {
      return <animated.group position={position} rotation={rotation} scale={scale}>
        <YootMesh position={[0, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[1.5, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[3.0, 0, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootRhino position={[4.5, 0, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>
      </animated.group>
    }
    function Gul() {
      return <animated.group position={position} rotation={rotation} scale={scale}>
        <YootMesh position={[0, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[1.5, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[3.0, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootRhino position={[4.5, 0, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>
      </animated.group>
    }
    function YootShape() {
        return <animated.group position={position} rotation={rotation} scale={scale}>
        <YootMesh position={[0, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[1.5, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[3.0, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>      
        <YootRhino position={[4.5, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>
      </animated.group>
    }
    function Mo() {
        return <animated.group position={position} rotation={rotation} scale={scale}>
        <YootMesh position={[0, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[1.5, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[3.0, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootRhino position={[4.5, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>
      </animated.group>
    }
    function Backdo() {
        return <animated.group position={position} rotation={rotation} scale={scale}>
        <YootMesh position={[0, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[1.5, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootMesh position={[3.0, -0.3, 0]} rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.6}/>      
        <YootRhino position={[4.5, -0.3, 0]} rotation={[0, Math.PI/2, Math.PI/2]} scale={0.6}/>
      </animated.group>
    }
    return <>
        { points === 'do' && <Do/>}
        { points === 'ge' && <Ge/>}
        { points === 'gul' && <Gul/>}
        { points === 'yoot' && <YootShape/>}
        { points === 'mo' && <Mo/>}
        { points === 'backdo' && <Backdo/>}
    </>
}