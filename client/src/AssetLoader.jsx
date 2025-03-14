import { useLoader } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei';
import { useSetAtom } from "jotai"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { fireworkTexturesAtom } from "./GlobalState"

export default function AssetLoader() {
  const fireworkTextures = [
    useLoader(TextureLoader, '/textures/particles/3.png'),
    useLoader(TextureLoader, '/textures/particles/5.png'),
    useLoader(TextureLoader, '/textures/particles/6.png'),
    useLoader(TextureLoader, '/textures/particles/8.png'),
  ]
  const setFireworkTextures = useSetAtom(fireworkTexturesAtom)
  setFireworkTextures(fireworkTextures)

  return
}

useGLTF.preload("/models/yoot.glb")
useGLTF.preload("/models/rounded-rectangle.glb")
useGLTF.preload("/models/yoot-for-button.glb")
useGLTF.preload("/models/star.glb");
useGLTF.preload("/models/earth-round.glb");
useGLTF.preload("/models/Mars 4.glb");
useGLTF.preload("/models/neptune.glb");
useGLTF.preload("/models/Saturn 3.glb");
useGLTF.preload('/models/wolf-constellation-dhazele-2-new-mat.glb')
useGLTF.preload('/models/rhino-constellation-dhazele-2.glb')
useGLTF.preload('/models/taurus-constellation-dhazele-2.glb')
useGLTF.preload("/models/rocket.glb")
useGLTF.preload("/models/ufo.glb")
useGLTF.preload("/models/yoot.glb")
useGLTF.preload("/models/cursor.glb");
useGLTF.preload('/models/yoot-animation-3.glb')
useGLTF.preload('/models/bam-emoji.glb')
useGLTF.preload("/models/yoot-v3-regular.glb")
useGLTF.preload("/models/yoot-v3-backdo.glb")