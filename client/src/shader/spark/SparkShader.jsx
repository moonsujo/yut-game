import sparkVertexShader from './vertex.glsl';
import sparkFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function useSparkShader() {

    const { scene } = useThree();
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
        sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
    })

    function CreateSpark({ position, texture, color }) {

        // particle left
        const leftPositionArray = new Float32Array(6)
        const leftSizeArray = new Float32Array(2)

        const startDistance = 1.0

        leftPositionArray[0] = -startDistance
        leftPositionArray[1] = 0.0
        leftPositionArray[2] = 0.0
        leftPositionArray[3] = startDistance
        leftPositionArray[4] = 0.0
        leftPositionArray[5] = 0.0

        leftSizeArray[0] = 0.6
        leftSizeArray[1] = 0.6

        texture.flipY = false;

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(leftPositionArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(leftSizeArray, 1))
        const material = new THREE.ShaderMaterial({
            vertexShader: sparkVertexShader,
            fragmentShader: sparkFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(1.0), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uProgress: new THREE.Uniform(0)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const points = new THREE.Points(geometry, material)
        points.position.copy(position)
        const destroy = () => { // may need to run on component unmount as well
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: 2.79, ease: 'linear', onComplete: destroy }
        )

        // point 1: comes from left
        // point 2: comes from right
        // time 0 - 1: come to the middle
        // time 1 - 2: scale up and down (sin func)
        // time 2 - 3: scale down to 0
        // try it above the pieces so it doesn't overlap
        // move 'joined!' to the side. it gets cut above the star when it's on the saturn

        scene.add(points)
    }

    return [CreateSpark];
}