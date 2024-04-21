import { useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { isMyTurn } from "../helpers/helpers";
import { useFrame } from "@react-three/fiber";
import { 
  selectionAtom 
} from "../GlobalState";

// Pass pieces as children of mesh (like Earth)
// Score button, Legal tiles and Piece selection are server events
// Set client has turn in Socket Manager
// Use this to prevent click in the components

// wrapperScale: meshes are different sizes. One wrapper size doesn't fit all
export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile, 
  mesh
}) {

  const [selection] = useAtom(selectionAtom);

  const wrapper = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    if (selection != null && isMyTurn(turn, teams, client.id)) {
      document.body.style.cursor = "pointer";
    }
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    if (selection != null && isMyTurn(turn, teams, client.id)) {
      document.body.style.cursor = "default";
    }
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection != null) {
      if (isMyTurn(turn, teams, client.id)) {
        if (selection.tile != tile && tile in legalTiles) {
          socket.emit("move", { destination: tile, moveInfo: legalTiles[tile] }, ({ error }) => {
            if (error) {
              console.log("move error", error)
            }
          });
        }
        socket.emit("legalTiles", {legalTiles: {}})
        socket.emit("select", null);
      }
    }
  }

  useFrame((state) => {
    if (selection != null && tile in legalTiles) {
      wrapper.current.scale.x = SCALE + Math.cos(state.clock.elapsedTime * 3) * 0.5 + (1 / 2)
      wrapper.current.scale.y = SCALE + Math.cos(state.clock.elapsedTime * 3) * 0.5 + (1 / 2)
      wrapper.current.scale.z = SCALE + Math.cos(state.clock.elapsedTime * 3) * 0.5 + (1 / 2)
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
        onPointerDown={(e) => handlePointerDown(e)}
        ref={wrapper}
      >
        <sphereGeometry args={[0.8, 32, 16]} />
        <meshStandardMaterial
          transparent
          // opacity={selection != null && tile in legalTiles ? 0.5 : 0}
          opacity={0}
          color={selection != null && tile in legalTiles ? (selection.pieces[0].team == 0 ? "pink" : "turquoise") : ""}
        />
      </mesh>
      {mesh}
      {/* scale necessary because it's different from pieces at home or under team name */}
      {/* <group scale={layout[device].tilePieceScale}>
        <Pieces/>
      </group>
      { selection != null && tile in legalTiles && <Pointer tile={tile} color={selection.pieces[0].team == 0 ? "red" : "turquoise"}/>}
      {(gamePhase === "game" && 29 in legalTiles && selection !== null && selection.tile == tile) && <ScoreButton
        position={[-0.3,6,-1.2]}
        scale={2}
      />} */}
    </group>
  );
}
