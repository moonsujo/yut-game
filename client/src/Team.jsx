import React, { useRef, useState } from 'react';
import layout from './layout';
import { useAtom } from 'jotai';
import { joinTeamAtom, clientAtom, teamsAtom, gamePhaseAtom, hostAtom, turnAtom } from './GlobalState';
import { Html, MeshDistortMaterial, Text3D } from '@react-three/drei';
import Piece from './components/Piece';
import { formatName, pieceStatus } from './helpers/helpers';
import { MeshStandardMaterial } from 'three';
import YootMesh from './meshes/YootMesh';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { useParams } from 'wouter';

export default function Team({ position=[0,0,0], scale=1, team, device }) {
  const [teams] = useAtom(teamsAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);
  const [host] = useAtom(hostAtom);
  const [turn] = useAtom(turnAtom)
  const [client] = useAtom(clientAtom);
  const params = useParams();

  function JoinTeamButton() {
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    const colorMaterial = new MeshStandardMaterial()

    const [hover, setHover] = useState(false);

    const button = useRef();
    useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (button.current) {
        if (hover) {
          // limegreen
          colorMaterial.color.b = 0.031896033067374104;
          colorMaterial.color.g = 0.6104955708001716;
          colorMaterial.color.r = 0.031896033067374104;
          button.current.scale.x = 1;
        } else {
          if (client.team === -1) {
            colorMaterial.color.setHSL(Math.cos(time * 3) * 0.05 + 0.07, 1, 0.3);
            button.current.scale.x = Math.cos(time * 2) * 0.3 + 0.7;
          } else {
            colorMaterial.color.setHSL(1/6, 1, 0.5); // yellow
            button.current.scale.x = 1;
          }
        }
      }
    })

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      setJoinTeam(team);
      setHover(false)
    }

    return client.team !== team && !(joinTeam === 0 || joinTeam === 1) && <group
      position={layout[device].game[`team${team}`].join.position}
      scale={layout[device].game[`team${team}`].join.scale}
      ref={button}
    >
      <mesh
        material={colorMaterial}
        name='background-outer'
        scale={[0.75, 1, 0.34]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[0.75, 1, 0.31]}
      >
        <cylinderGeometry args={[0.95, 0.95, 0.02, 32]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.45, 0.025, 0.15]}
        rotation={layout[device].game[`team${team}`].join.rotation}
        size={layout[device].game[`team${team}`].join.size}
        height={layout[device].game[`team${team}`].join.height}
        material={colorMaterial}
      >
        JOIN
      </Text3D>
    </group>
  }

  // Need to accept "key" to use it in an map
  function EmptyPiece({ position }) {
    return <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 16]} />
    </mesh>
  }

  function ScoredPiece({ position }) {
    return <mesh position={position}>
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial color={team == 0 ? "red" : "green"} />
    </mesh>
  }

  function HomePieces({position, scale=1}) {
    let space = layout[device].game[`team${team}`].pieces.space;
    let positionStartX = layout[device].game[`team${team}`].pieces.positionStartX;
    let positionStartY = layout[device].game[`team${team}`].pieces.positionStartY;
    let positionStartZ = layout[device].game[`team${team}`].pieces.positionStartZ;

    return (
      <group position={position} scale={scale}>
        {
          teams[team].pieces.map((value, index) =>
            pieceStatus(value.tile) === "onBoard" ? <EmptyPiece 
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            /> : 
            pieceStatus(value.tile) === "scored" ? <ScoredPiece
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            /> : <Piece
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              rotation={layout[device].game[`team${team}`].pieces.rotation}
              scale={layout[device].game[`team${team}`].pieces.scale}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              animation={null}
            />
          )
        }
      </group>
    );
  }

  function RollDisplay() {
    // Handle 0 because it is coerced to 'null' as a string
    let rollText;
    if (teams[team].pregameRoll === null) {
      rollText = '';
    } else if (teams[team].pregameRoll === 0) {
      rollText = '&#10007'
    } else {
      rollText = teams[team].pregameRoll.toString()
    }

    return <group position={layout[device].game[`team${team}`].pregameRoll.position}>
      { teams[team].pregameRoll === 0 ? <group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.9, 0.025, 0.15]}
          rotation={[-Math.PI/2, 0, 0]}
          size={layout[device].game[`team${team}`].pregameRoll.size}
          height={layout[device].game[`team${team}`].pregameRoll.height}
        >
          {`roll:`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0.35, 0.025, 0.15]}
          rotation={[-Math.PI/2, 0, 0]}
          size={layout[device].game[`team${team}`].pregameRoll.size}
          height={layout[device].game[`team${team}`].pregameRoll.height}
        >
          {'X'}
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group> : <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.9, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game[`team${team}`].pregameRoll.size}
        height={layout[device].game[`team${team}`].pregameRoll.height}
      >
        {`roll: ${rollText}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D> }
    </group>
  }

  function PlayerIds() {
    const playerIdsRef = useRef([[],[]])
    const yootIconRef = useRef()
    useFrame((state, delta) => {
      playerIdsRef.current.forEach(function (value, i) {
        playerIdsRef.current[i].forEach(function (value1, j) {
          if (turn.team === i && turn.players[turn.team] === j && playerIdsRef.current[i][j].geometry.boundingSphere && (gamePhase === 'pregame' || gamePhase === 'game')) {
            yootIconRef.current.scale.x = 1
            yootIconRef.current.scale.y = 1
            yootIconRef.current.scale.z = 1
            yootIconRef.current.position.x = playerIdsRef.current[i][j].geometry.boundingSphere.center.x + playerIdsRef.current[i][j].geometry.boundingSphere.radius + 0.2
            // yootIconRef.current.position.y is fixed
            // yootIconRef.current.position.z is fixed
          }
        })
      })
    })
    return <group
      position={layout[device].game[`team${team}`].names.position}
      rotation={layout[device].game[`team${team}`].names.rotation}
    >
      {teams[team].players.map((value, index) => (
        index < 5 && <group key={index}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            size={layout[device].game[`team${team}`].names.size}
            height={layout[device].game[`team${team}`].names.height}
            position={[0, -index * 0.5, 0]}
            ref={(ref => playerIdsRef.current[team][index] = ref)}
          >
            {formatName(value.name, layout[device].game[`team${team}`].names.maxLength)
            + (host && value.socketId === host.socketId ? ' (h) ' : '')}
            <meshStandardMaterial color={ value.roomId === params.id && value.connectedToRoom ? 'yellow' : 'gray' }/>
          </Text3D>
          <group ref={yootIconRef} scale={0} position={[0, 0.17, 0]}>
            <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04}/>
            <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04} position={[0.1, 0, 0]}/>
            <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04} position={[0.2, 0, 0]}/>
            <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04} position={[0.3, 0, 0]}/>
          </group>
        </group>
      ))}
      {/* add 'copy link to share' if game hasn't started yet */}
      {/* { gamePhase === 'lobby' && client.team !== -1 && <CopyLink position={[0.1, -teams[team].players.length * 0.5-0.1, 0]}/> } */}
    </group>
  }

  // place under playerIds
  function CopyLink({ position }) {
    const [hover, setHover] = useState(false);
    const button = useRef();

    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
    const [springs, api] = useSpring(() => ({        
      from: {
        opacity: 0, 
      }
    }))

    useFrame((state) => {
      const time = state.clock.elapsedTime
      button.current.scale.x = Math.sin(time)*0.05 + 1
      button.current.scale.y = Math.sin(time)*0.05 + 1
      button.current.scale.z = Math.sin(time)*0.05 + 1
    })

    function handlePointerEnter(e) {
      e.stopPropagation()
      setHover(true)
    }
    function handlePointerLeave(e) {
      e.stopPropagation()
      setHover(false)
    }
    function handleClick(e) {
      e.stopPropagation()

      // works on safari and chrome browsers
      var inputc = document.body.appendChild(document.createElement("input"));
      inputc.value = window.location.href;
      inputc.select();
      document.execCommand('copy');
      inputc.parentNode.removeChild(inputc);

      // animation
      api.start({
        from: {
          opacity: 1
        },
        to: [
          {
            opacity: 1
          },
          { 
            opacity: 0,
            delay: 500,
            config: {
              tension: 170,
              friction: 26
            }
          }
        ]
      })
    }
    return <group position={position} ref={button}>
      <group name='background' position={[4/2-0.15, 0.5/2-0.1, -0.1]}>
        <mesh 
          name='background-outer' 
          rotation={[Math.PI/2, 0, 0]}
        >
          <boxGeometry args={[4, 0.01, 0.7]}/>
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh 
          name='background-inner' 
          rotation={[Math.PI/2, 0, 0]}
        >
          <boxGeometry args={[3.95, 0.02, 0.65]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        rotation={[Math.PI/2, 0, 0]}
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
        onClick={(e) => handleClick(e)}
        >
          <boxGeometry args={[4, 0.03, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
      </group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[0,0,-0.08]}
        rotation={[0, 0, 0]}
        size={0.35}
        height={0.01}
      >
        <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        {`copy room link`}
      </Text3D>
      <group name='copied-alert' position={[0, 0.7, 0.5]}>
        <Text3D 
          name='copied-tooltip'
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,0,0]}
          rotation={[0, 0, 0]}
          size={layout[device].game.invite.size}
          height={layout[device].game.invite.height}
        >
          copied!
          <AnimatedMeshDistortMaterial
            speed={5}
            distort={0}
            color='green'
            transparent
            opacity={springs.opacity}
          />
        </Text3D>
        <mesh position={[0.7, 0.1, 0]} rotation={[Math.PI/2, 0, 0]} scale={[1.1, 1, 0.5]}>
          <cylinderGeometry args={[1, 1, 0.01, 20]}/>
          <AnimatedMeshDistortMaterial 
            speed={5}
            distort={0}
            color='black'
            transparent
            opacity={springs.opacity}
          />
        </mesh>
      </group>
    </group>
  }

  return <group
    position={position}
    scale={scale}
  >
    {/* team name */}
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={layout[device].game[`team${team}`].title.position}
      rotation={layout[device].game[`team${team}`].title.rotation}
      size={layout[device].game[`team${team}`].title.size}
      height={layout[device].game[`team${team}`].title.height}
    >
      { team === 0 ? "Rockets" : "UFOs" }
      <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
    </Text3D>
    {/* join button */}
    { gamePhase === "lobby" && <JoinTeamButton/> }
    { gamePhase === "pregame" && <RollDisplay/> }
    {/* pieces */}
    <HomePieces 
    position={layout[device].game[`team${team}`].pieces.position} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    />
    {/* player ids */}
    <PlayerIds/>
    {/* copy link */}
  </group>
}