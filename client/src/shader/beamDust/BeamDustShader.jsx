import beamDustVertexShader from './vertex.glsl';
import beamDustFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function useBeamDustShader() {

    const { scene } = useThree();
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

    // doesn't get called; the one in GameCamera or setDevice does
    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
        sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
    })
    

    // one particle
    // spawn via setInterval
    // randomize position and size
    function CreateBeamDust({ position, size, speed }) {
        const color = new THREE.Color();
        color.setHSL(0.5, 0.5, 0.6)
        const geometry = new THREE.BufferGeometry()
        const positionsArray = new Float32Array(3)
        positionsArray[0] = position.x
        positionsArray[1] = position.y
        positionsArray[2] = position.z
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        const material = new THREE.ShaderMaterial({
            vertexShader: beamDustVertexShader,
            fragmentShader: beamDustFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(size), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uProgress: new THREE.Uniform(0),
                uPosition: new THREE.Uniform(position),
                uColor: new THREE.Uniform(color),
                uSpeed: new THREE.Uniform(speed)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
        const points = new THREE.Points(geometry, material)
        points.position.copy(new THREE.Vector3(
            0, 
            0,
            0, 
        ))
        const destroy = () => { // may need to run on component unmount as well
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: 1.8, ease: 'linear', onComplete: destroy }
        )

        scene.add(points)
    }

    return [CreateBeamDust];
}