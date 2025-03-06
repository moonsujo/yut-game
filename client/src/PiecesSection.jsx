import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { backdoLaunchAtom, clientAtom, hasTurnAtom, selectionAtom, teamsAtom } from './GlobalState';
import layout from './layout';
import Piece from './components/Piece';
import { hasValidMoveHome, pieceSelected, tileType } from './helpers/helpers';

export default function PiecesSection({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1,
  device
}) {
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom)
  const [selection] = useAtom(selectionAtom)
  const backdoLaunch = useAtomValue(backdoLaunchAtom)
  const hasTurn = useAtomValue(hasTurnAtom)

  function UnassignedPieces() {
    const emptyPieces = [0, 0, 0, 0]
    return <group>
      {emptyPieces.map((_value, index) =>
        (<mesh
          position={layout[device].game.piecesSection.emptyPieces.positions[index]}
          key={index}
        >
          <sphereGeometry args={[0.3, 32, 16]} />
          <meshStandardMaterial color="#505050"/>
        </mesh>
      ))}
    </group>
  }

  function AssignedPieces() {  
    const team = client.team  

    // Need to accept "key" to use it in an map
    function EmptyPiece({ position }) {
      return <mesh
        position={position}
      >
        <sphereGeometry args={[0.2, 32, 16]} />
      </mesh>
    }

    function ScoredPiece({ position }) {
      return <mesh
        position={position}
      >
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color={team == 0 ? "red" : "green"} />
      </mesh>
    }

    return (
      <group>
        {
          teams[team].pieces.map((value, index) =>
            tileType(value.tile) === "onBoard" ? <EmptyPiece 
              position={layout[device].game.piecesSection.pieces.positions[index]}
              key={index}
            /> : 
            tileType(value.tile) === "scored" ? <ScoredPiece
              position={layout[device].game.piecesSection.pieces.positions[index]}
              key={index}
            /> : <Piece
              position={layout[device].game.piecesSection.pieces.positions[index]}
              rotation={layout[device].game.piecesSection.pieces.rotation}
              scale={layout[device].game.piecesSection.pieces.scale}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              // on selection, no other piece should be in 'selectable' animation
              selectable={(selection === null && hasValidMoveHome(teams[team].pieces, teams[team].moves, backdoLaunch) && hasTurn)}
              onBoard={false}
              selected={pieceSelected(selection, value.id, team)}
            />
          )
        }
      </group>
    )
  } 

  return <group
    position={position}
    rotation={rotation}
    scale={scale}
  >
    { client.team === -1 && <UnassignedPieces/> }
    { (client.team === 0 || client.team === 1) && <AssignedPieces/>}
  </group>
}