import vertexShader from './shader/loadingScreen/vertex.glsl'
import fragmentShader from './shader/loadingScreen/fragment.glsl'

export default function LoadingScreen() {

  return <mesh rotation={[0, 0, -Math.PI/2]}>
    <planeGeometry args={[2, 2, 1, 1]}/>
    <shaderMaterial 
      transparent
      uniforms={{
        uAlpha: { value: 0.1 }
      }}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  </mesh>
}