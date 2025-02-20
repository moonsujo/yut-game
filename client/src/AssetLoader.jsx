import { useLoader } from "@react-three/fiber"
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