import { useThree } from "@react-three/fiber";
import * as THREE from 'three';

export const useSounds = () => {
  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  const { camera } = useThree();
  camera.add( listener );

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();

  function playSound(path) {
    audioLoader.load( path, function( buffer ) {
      sound.setBuffer( buffer );
      // sound.setLoop( true );
      sound.setVolume( 0.5 );
      sound.play();
    });
  }

  return [playSound]
}