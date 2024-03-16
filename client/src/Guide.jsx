import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { clientAtom, teamsAtom } from './SocketManager';
import layout from './layout';
import Piece from './components/Piece';
import HtmlElement from './HtmlElement';
import JoinTeamModal from './JoinTeamModal';
import { joinTeamAtom } from './GlobalState';

// all "atoms" get state individually
// clicking on one component should not rerender the parent
export default function Guide({ device }) {
    console.log('Guide')
    function HomePieces({team, scale=1, position}) {
        
        const [teams] = useAtom(teamsAtom);

        let space = layout[device].homePieces[team].space;
        let positionStartX = 0
        let positionStartY = 0
        let positionStartZ = 0.5
    
        return (
          <group scale={scale} position={position}>
            {teams[team].pieces.map((value, index) =>
              value == null ? (
                <mesh
                  position={[
                    positionStartX + index * space,
                    positionStartY,
                    positionStartZ,
                  ]}
                  key={index}
                >
                  <sphereGeometry args={[0.2]} />
                </mesh>
              ) : value === "scored" ? (
                <mesh
                  position={[
                    positionStartX + index * space,
                    positionStartY,
                    positionStartZ,
                  ]}
                  key={index}
                >
                  <sphereGeometry args={[0.2]} />
                  <meshStandardMaterial color={team == 0 ? "red" : "green"} />
                </mesh>
              ) : (
                  <Piece
                    position={[
                    positionStartX + index * space,
                    positionStartY,
                    positionStartZ,
                  ]}
                  rotation={layout[device].homePieces[team].rotation}
                  keyName={`count${index}`}
                  tile={-1}
                  team={team}
                  id={value.id}
                  key={index}
                  scale={1}
                />
              )
            )}
          </group>
        );
    }

    function JoinTeam0() {
        const [client] = useAtom(clientAtom);
        const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
        function handleJoinTeam0 () {
            setJoinTeam(0);
        }
        return client.team !== 0 && joinTeam !== 0 && <HtmlElement
            text="JOIN"
            position={layout[device].team0.join.position}
            rotation={layout[device].team0.join.rotation}
            fontSize={layout[device].team0.join.fontSize}
            handleClick={handleJoinTeam0}
        /> 
    }

    function JoinTeam1() {
        const [client] = useAtom(clientAtom);
        const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
        function handleJoinTeam1 () {
            setJoinTeam(1);
        }
        return client.team !== 1 && joinTeam !== 1 && <HtmlElement
            text="JOIN"
            position={layout[device].team1.join.position}
            rotation={layout[device].team1.join.rotation}
            fontSize={layout[device].team1.join.fontSize}
            handleClick={handleJoinTeam1}
        /> 
    }

    return <group name='guide'>
        <group
            position={layout[device].team0.position}
            scale={layout[device].team0.scale}
        >
            <HtmlElement
              text="Rockets"
              position={layout[device].team0.title.position}
              rotation={layout[device].team0.title.rotation}
              color="red"
            />
            <HomePieces team={0} scale={0.5} position={layout[device].team0.pieces.position}/>
            <JoinTeam0/>
        </group>
        <group
            position={layout[device].team1.position}
            scale={layout[device].team1.scale}
        >
            <HtmlElement
              text="UFOs"
              position={layout[device].team1.title.position}
              rotation={layout[device].team1.title.rotation}
              color="turquoise"
            />
            <HomePieces team={1} scale={0.5} position={layout[device].team1.pieces.position}/>
            <JoinTeam1/>
        </group>
        <JoinTeamModal
            position={layout[device].joinTeamModal.position}
            rotation={layout[device].joinTeamModal.rotation}
            scale={layout[device].joinTeamModal.scale}
        />
    </group>
}