import fireworkVertexShader from './vertex.glsl';
import fireworkFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';

export function useShootingStarShader() {

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

    const textures = [
        useLoader(TextureLoader, 'textures/particles/1.png'),
        useLoader(TextureLoader, 'textures/particles/2.png'),
        useLoader(TextureLoader, 'textures/particles/3.png'),
        useLoader(TextureLoader, 'textures/particles/4.png'),
        useLoader(TextureLoader, 'textures/particles/5.png'),
        useLoader(TextureLoader, 'textures/particles/6.png'),
        useLoader(TextureLoader, 'textures/particles/7.png'),
        useLoader(TextureLoader, 'textures/particles/8.png'),
    ]

    function CreateShootingStar({count, position, fallDirection, size, texture, radius, color, duration=5}) {
        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)
        const directionsArray = new Float32Array(count*2);
        const timingsArray = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            positionsArray[i3] = position.x + i * fallDirection.x + 2;
            positionsArray[i3+1] = position.y + i * fallDirection.y + 2
            positionsArray[i3+2] = 0

            sizesArray[i] = Math.random()

            directionsArray[i*2] = Math.random();
            directionsArray[i*2+1] = Math.random();

            timingsArray[i] = i/count;
        }

        texture.flipY = false;

        // const firework = useRef();
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
        geometry.setAttribute('aDirection', new THREE.Float32BufferAttribute(directionsArray, 2));
        geometry.setAttribute('aTiming', new THREE.Float32BufferAttribute(timingsArray, 1));
        const material = new THREE.ShaderMaterial({
            vertexShader: fireworkVertexShader,
            fragmentShader: fireworkFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(500), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uProgress: new THREE.Uniform(0),
                uSparkDuration: new THREE.Uniform(0.5)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const points = new THREE.Points(geometry, material)
        points.position.copy(new THREE.Vector3(0,0,0))
        const destroy = () => { // may need to run on component unmount as well
            console.log('destroy')
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration, ease: 'linear', onComplete: destroy }
        )

        scene.add(points)
    }

    function CreateRandomShootingStar() {
        const count = 500;
        const position = new THREE.Vector3(
            Math.random() * Math.random() > 0.5 ? 1 : -1, 
            Math.random() * Math.random() > 0.5 ? 1 : -1, 
        )
        const size = 0.5 + Math.random() * 0.06
        const texture = textures[Math.floor(Math.random() * textures.length)]
        const radius = 0.8 + Math.random() * 0.6
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1, 0.7)
        CreateShootingStar({
            count,
            position,
            size,
            texture,
            radius,
            color
        })
    }
    
    return [CreateShootingStar]
}