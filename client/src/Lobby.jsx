import { useAtomValue } from "jotai";
import GameCamera from "./GameCamera";
import { deviceAtom } from "./GlobalState";
import useResponsiveSetting from "./ResponsiveSetting.jsx";
import layout from "./layout";
import Board from "./Board.jsx";
import HowToPlay from "./HowToPlay.jsx";
import Moon from "./meshes/Moon.jsx";

export default function Lobby() {

  useResponsiveSetting();

  const device = useAtomValue(deviceAtom)
  
  return <group>
    {/* game camera */}
    {/* moon */}
    {/* rulebook */}
    {/* invite instructions */}
    {/* team info */}
    {/* settings button */}
    {/* start button */}
    <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
    <HowToPlay 
      device={'landscapeDesktop'}
      scale={0.9}
      position={[4, 0, 0]}
    />
    <Moon/>
  </group>
}