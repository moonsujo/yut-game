import fireworkVertexShader from './vertex.glsl';
import fireworkFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function MeteorsRealShader() {

    const { scene } = useThree();

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 1)
    }
    sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        sizes.pixelRatio = Math.min(window.devicePixelRatio, 1)
        sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
    })

    // one particle in the center
    // other particles shine around it
    function CreateMeteorReal({ count, position, size, texture, color, speedX, speedY, duration }) {
        count = 1000.0;
        const positionsArray = new Float32Array(count * 3)
        const setOffTimeArray = new Float32Array(count);
        const sizesArray = new Float32Array(count)
        const timeMultipliersArray = new Float32Array(count)
        const trailDurationArray = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            const position = new THREE.Vector3(Math.random()*0.02, Math.random()*0.02, 0)
            
            positionsArray[i3] = position.x
            positionsArray[i3+1] = position.y
            positionsArray[i3+2] = position.z

            sizesArray[i] = 1.1

            trailDurationArray[i] = 0.05 + Math.random()*0.03

            setOffTimeArray[i] = (i / count) * 0.8
        }

        texture.flipY = false;

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
        geometry.setAttribute('aSetOffTime', new THREE.Float32BufferAttribute(setOffTimeArray, 1))
        geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1));
        geometry.setAttribute('aTrailDuration', new THREE.Float32BufferAttribute(trailDurationArray, 1));
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
                uSpeedX: new THREE.Uniform(speedX),
                uSpeedY: new THREE.Uniform(speedY),
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

    const meteorTextures = [
        useLoader(TextureLoader, '/textures/particles/3.png'),
        useLoader(TextureLoader, '/textures/particles/7.png'), // heart
    ] 

    // falling meteor background
    useEffect(() => {       
        const interval = setInterval(() => {
            const count = Math.round(400 + Math.random() * 1000);
            const position = new THREE.Vector3(
                (Math.random()-0.5) * 5, 
                -2,
                (Math.random()-0.5) * 15, 
            )
            const size = 0.5 + Math.random() * 0.02
            const texture = meteorTextures[Math.floor(Math.random() * meteorTextures.length)]
            const color = new THREE.Color();
            color.setHSL(0.05, 0.7, 0.4)
            const speedX = 5.0 + (Math.random() - 0.5) * 6.0;
            const speedY = 4.0 + (Math.random() - 0.5) * 3.0;
            const duration = 5.0 + (Math.random() - 0.5) * 5.0;
            if (document.hasFocus()) {
                CreateMeteorReal({
                    count,
                    position,
                    size,
                    texture,
                    color,
                    speedX,
                    speedY,
                    duration
                })
            }
        }, 2000);
        return (() => {
            clearInterval(interval);
        })
    }, [])
}