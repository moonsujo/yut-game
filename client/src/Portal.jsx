import { shaderMaterial, useGLTF } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import portalVertexShader from './shader/portal/vertex.glsl'
import portalFragmentShader from './shader/portal/fragment.glsl'
import * as THREE from 'three'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000')
  },
  portalVertexShader,
  portalFragmentShader
)
extend({ PortalMaterial })

export default function Portal({ position, scale, rotation }) {    
  const { nodes } = useGLTF('./models/portal.glb')

  const portalMaterial = useRef()
  useFrame((state, delta) =>
    {
      portalMaterial.current.uTime += delta
    })

  return <group rotation={rotation}>
    <mesh 
      geometry={ nodes.portalLight.geometry } 
      position={ position } 
      rotation={ nodes.portalLight.rotation }
      scale={ scale }
      >
      <portalMaterial ref={ portalMaterial }/>
    </mesh>
  </group>
}