import fireworkVertexShader from './vertex.glsl';
import fireworkFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function useMeteorsShader() {

    const { scene } = useThree();

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
        sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
    })
    
    const { gl } = useThree();
    gl.setSize(sizes.width, sizes.height)
    gl.setPixelRatio(sizes.pixelRatio)

    function CreateMeteor({ count, position, size, texture, color }) {
        const duration = 5.0;
        count = 4;
        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            const position = new THREE.Vector3((Math.random()-0.5)*20, 0, (Math.random()-0.5)*20)
            
            positionsArray[i3] = position.x
            positionsArray[i3+1] = position.y
            positionsArray[i3+2] = position.z

            sizesArray[i] = 2.0
        }

        texture.flipY = false;

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
        const material = new THREE.ShaderMaterial({
            vertexShader: fireworkVertexShader,
            fragmentShader: fireworkFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(size), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uProgress: new THREE.Uniform(0),
                uDuration: new THREE.Uniform(duration),
                uSpeedX: new THREE.Uniform(2.0 + Math.random() * 1.0),
                uSpeedY: new THREE.Uniform(1.0 + Math.random() * 0.5),
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const points = new THREE.Points(geometry, material)
        points.position.copy(position)
        const destroy = () => {
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: duration, ease: 'linear', onComplete: destroy }
        )

        scene.add(points)
    }

    return [CreateMeteor]
}