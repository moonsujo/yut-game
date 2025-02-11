// js
import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import layout from "./layout.js";
import { useSpring, animated } from '@react-spring/three';

import Board from "./Board.jsx";
import PiecesSection from "./PiecesSection.jsx";
import Team from "./Team.jsx";
import GameCamera from "./GameCamera.jsx";
import DisconnectModal from "./DisconnectModal.jsx";
import JoinTeamModal from "./JoinTeamModal.jsx";

// three js
// import { Leva, useControls } from "leva"
import { Perf } from 'r3f-perf'

// server
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";
import { 
  deviceAtom, 
  readyToStartAtom, 
  hostAtom, 
  disconnectAtom, 
  gamePhaseAtom, 
  turnAtom,
  legalTilesAtom,
  tilesAtom,
  helperTilesAtom,
  winnerAtom,
  clientAtom,
  joinTeamAtom,
  yootAnimationAtom,
  teamsAtom,
  hasTurnAtom,
  settingsOpenAtom,
  connectedToServerAtom,
  pauseGameAtom,
  timerAtom,
  animationPlayingAtom,
  turnExpireTimeAtom,
  backdoLaunchAtom,
  nakAtom,
  yutMoCatchAtom,
} from "./GlobalState.jsx";
import MoveList from "./MoveList.jsx";
import PiecesOnBoard from "./PiecesOnBoard.jsx";
import ScoreButtons from "./ScoreButtons.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";
import { Float, Text3D, useGLTF } from "@react-three/drei";
import { Color, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import GameLog from "./GameLog.jsx";
import HowToPlay from "./HowToPlay.jsx";

// react spring
import { MeshDistortMaterial } from '@react-three/drei'
import YootNew from "./YootNew.jsx";
import YootButtonNew from "./YootButtonNew.jsx";
import useResponsiveSetting from "./hooks/useResponsiveSetting.jsx";
import MeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader.jsx";
import SettingsHtml from "./SettingsHtml.jsx";
import PauseGame from "./PauseGame.jsx";
import Timer from "./Timer.jsx";
import useMusicPlayer from "./hooks/useMusicPlayer.jsx";
import TeamLobby from "./TeamLobby.jsx";
import MeshColors from "./MeshColors.jsx";
import QrCode3d from "./QRCode3D.jsx";
import Moon from "./meshes/Moon.jsx";
import BlueMoon from "./meshes/BlueMoon.jsx";
import YootDisplay from "./YootDisplay.jsx";
import Star from "./meshes/Star.jsx";
import Rocket from "./meshes/Rocket.jsx";
import Ufo from "./meshes/Ufo.jsx";
import { formatName } from "./helpers/helpers.js";

export default function Lobby() {

  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  const disconnect = useAtomValue(disconnectAtom)

  // For network calls
  const params = useParams();
  
  // function PlayersParty({ position=[0,0,0], scale=0.7 }) {
  //   const host = useAtomValue(hostAtom)
  //   const client = useAtomValue(clientAtom)
  //   const isHost = client.socketId === host.socketId
  //   const teams = useAtomValue(teamsAtom)
  //   const [seatClickedIndex, setSeatClickedIndex] = useState(0)
  //   const [joinTeamModalPosition, setJoinTeamModalPosition] = useState([0,0,0])

  //   const partyRef = useRef()
  //   const rocket0 = useRef()
  //   const rocket1 = useRef()
  //   const rocket2 = useRef()
  //   const rocket3 = useRef()
  //   const ufo0 = useRef()
  //   const ufo1 = useRef()
  //   const ufo2 = useRef()
  //   const ufo3 = useRef()
  //   const shipRefs = [rocket0, rocket1, rocket2, rocket3, ufo0, ufo1, ufo2, ufo3]
  //   const radius = 1.6
  //   const radius2 = 8.3
  //   const spring = useSpring({
  //     from: {
  //       boomScale: 0.6,
  //       boomScaleYut: 0.15
  //     },
  //     to: [
  //       {
  //         boomScale: 0.603,
  //         boomScaleYut: 0.155,
  //         config: {
  //           tension: 500,
  //           clamp: true
  //         }
  //       },
  //       {
  //         boomScale: 0.6,
  //         boomScaleYut: 0.15,
  //       },
  //     ],
  //     loop: true,
  //     delay: 234
  //   })
  //   useFrame((state) => {
  //     const time = state.clock.elapsedTime
  //     // partyRef.current.rotation.y = -time / 4;
  //     if (shipRefs[0].current) {
  //       shipRefs.forEach((value, index) => {
  //         if (value.current) {
  //           if (device === 'portrait') {
  //             value.current.position.x = Math.cos(-time / 3 + (Math.PI * 2 / shipRefs.length * index)) * radius2
  //             value.current.position.y = 5
  //             value.current.position.z = Math.sin(-time / 3 + (Math.PI * 2 / shipRefs.length * index)) * radius2 + 2
  //           } else {
  //             value.current.position.x = Math.cos((Math.PI * 2 / shipRefs.length * (index-1.5))) * radius2
  //             value.current.position.y = 5
  //             value.current.position.z = Math.sin((Math.PI * 2 / shipRefs.length * (index-1.5))) * radius2 + 2
  //           }
  //         }
  //       })
  //     }
  //   })

  //   {/* landing page: Take a seat */}
  //   {/* no more seats: Full capacity (grey button) */}
  //   {/* joined UFO: 'Prepare for contact' */}
  //   {/* joined Rocket: 'Ready to launch', 'Clear for takeoff' */}
  //   function SeatStatus({ position, scale }) {
  //     const teams = useAtomValue(teamsAtom)
  //     const client = useAtomValue(clientAtom)
  //     function TakeASeat({ position, scale }) {
  //       return <group
  //         name='take-a-seat-message'
  //         position={position}
  //         scale={scale}
  //       >
  //         <mesh
  //           name='background-inner'
  //           scale={[1.3, 1, 0.42]}
  //         >
  //           <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
  //           <meshStandardMaterial color='black'/>
  //         </mesh>
  //         <Text3D
  //           font="fonts/Luckiest Guy_Regular.json"
  //           position={[-0.95, 0.025, 0.12]}
  //           rotation={[-Math.PI/2, 0, 0]}
  //           size={0.25}
  //           height={0.01}
  //           lineHeight={0.7}
  //         >
  //           {`TAKE A SEAT`}
  //           <meshStandardMaterial color={ 'yellow' }/>
  //         </Text3D>
  //       </group>
  //     }
  //     function FullCapacity({ position, scale }) {
  //       return <group
  //         name='full-capacity-message'
  //         position={position}
  //         scale={scale}
  //       >
  //         <mesh
  //           name='background-inner'
  //           scale={[1.6, 1, 0.42]}
  //         >
  //           <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
  //           <meshStandardMaterial color='black'/>
  //         </mesh>
  //         <Text3D
  //           font="fonts/Luckiest Guy_Regular.json"
  //           position={[-1.1, 0.025, 0.12]}
  //           rotation={[-Math.PI/2, 0, 0]}
  //           size={0.25}
  //           height={0.01}
  //           lineHeight={0.7}
  //         >
  //           {`FULL CAPACITY`}
  //           <meshStandardMaterial color={ 'yellow' }/>
  //         </Text3D>
  //       </group>
  //     }
  //     function RocketJoined({ position, scale }) {
  //       return <group
  //         name='rocket-joined-message'
  //         position={position}
  //         scale={scale}
  //       >
  //         <mesh
  //           name='background-inner'
  //           scale={[1.3, 1, 0.6]}
  //         >
  //           <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
  //           <meshStandardMaterial color='black'/>
  //         </mesh>
  //         <Text3D
  //           font="fonts/Luckiest Guy_Regular.json"
  //           position={[-0.8, 0.025, -0.03]}
  //           rotation={[-Math.PI/2, 0, 0]}
  //           size={0.25}
  //           height={0.01}
  //           lineHeight={0.7}
  //         >
  //           {`CLEAR FOR\n  TAKEOFF`}
  //           <meshStandardMaterial color={ 'red' }/>
  //         </Text3D>
  //       </group>
  //     }
  //     function UfoJoined({ position, scale }) {
  //       return <group
  //         name='ufo-joined-message'
  //         position={position}
  //         scale={scale}
  //       >
  //         <mesh
  //           name='background-inner'
  //           scale={[1.5, 1, 0.6]}
  //         >
  //           <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
  //           <meshStandardMaterial color='black'/>
  //         </mesh>
  //         <Text3D
  //           font="fonts/Luckiest Guy_Regular.json"
  //           position={[-1, 0.025, -0.03]}
  //           rotation={[-Math.PI/2, 0, 0]}
  //           size={0.25}
  //           height={0.01}
  //           lineHeight={0.7}
  //         >
  //           {`PREPARE FOR\n    CONTACT`}
  //           <meshStandardMaterial color={ 'turquoise' }/>
  //         </Text3D>
  //       </group>
  //     }
  //     if (teams[0].players.length < 4 || teams[1].players.length < 4) {
  //       return <TakeASeat position={[0,5,7.3]} scale={1.9}/>
  //     } else if (teams[0].players.length >= 4 && teams[1].players.length >= 4) {
  //       return <FullCapacity position={[0,5,7.3]} scale={1.9}/>
  //     } else if (client.team === 0) {
  //       return <RocketJoined position={[0,5,7.3]} scale={1.9}/>
  //     } else if (client.team === 1) {
  //       return <UfoJoined position={[0,5,7.3]} scale={1.9}/>
  //     }
  //   }
  //   function handleSeatPointerEnter(e) {
  //     e.stopPropagation()
  //   }
  //   function handleSeatPointerLeave(e) {
  //     e.stopPropagation()
  //   }
  //   const setJoinTeam = useSetAtom(joinTeamAtom)
  //   function handleSeatPointerUp(e, team, seatIndex) {
  //     e.stopPropagation()
  //     setJoinTeam(team)
  //     setSeatClickedIndex(seatIndex)
  //   }

  //   useEffect(() => {
  //     if (seatClickedIndex === 6 || seatClickedIndex === 5) {
  //       setJoinTeamModalPosition([0, 0, 1.5])
  //     } else if (seatClickedIndex === 4 || seatClickedIndex === 7) {
  //       setJoinTeamModalPosition([0, 0, 3])
  //     } else if (seatClickedIndex === 3 || seatClickedIndex === 0) {
  //       setJoinTeamModalPosition([0, 0, 5.5])
  //     } else if (seatClickedIndex === 2 || seatClickedIndex === 1) {
  //       setJoinTeamModalPosition([0, 0, 7])
  //     }
  //   }, [seatClickedIndex])

  //   return <group scale={scale} position={position}>
  //     <BlueMoon scale={3} rotationSpeed={-0.2}/>
  //     <group ref={partyRef} scale={1.6} position={[0, 2, 4.3]}>
  //       <Text3D
  //         font="fonts/Luckiest Guy_Regular.json"
  //         position={[-2.3,5,-3.2]}
  //         rotation={[-Math.PI/2, 0, 0]}
  //         size={0.4}
  //         height={0.01}
  //         lineHeight={0.7}
  //       >
  //         {`TEAM\nROCKET`}
  //         <meshStandardMaterial color={ 'red' }/>
  //       </Text3D>
  //       <Text3D
  //         font="fonts/Luckiest Guy_Regular.json"
  //         position={[0.5,5,-3.2]}
  //         rotation={[-Math.PI/2, 0, 0]}
  //         size={0.4}
  //         height={0.01}
  //         lineHeight={0.7}
  //       >
  //         {`TEAM\nUFO`}
  //         <meshStandardMaterial color={ 'turquoise' }/>
  //       </Text3D>
  //       <YootDisplay scale={spring.boomScaleYut} position={[-0.15, 5, 0]} rotation={[0, Math.PI/2, 0]} />
  //       { [...Array(8)].map((value, index) => {
  //         return ((index-2 < 4 && index-2 >= 0) ? <animated.group 
  //         name='rocket-seat'
  //         key={index} 
  //         scale={spring.boomScale} 
  //         position={[
  //           Math.cos(Math.PI * 2 / 8 * index + Math.PI/8) * radius + ((index-2 === 1 || index-2 === 2) ? 0.3 : 0), 
  //           5, 
  //           Math.sin(Math.PI * 2 / 8 * index + Math.PI/8) * radius
  //         ]}>
  //           <Star scale={0.4} color='red' onBoard offset={0.2}/>
  //           {/* Host indicator */}
  //           {/* { index === 2 && <Star key={index} scale={0.3} position={[0.4, 0, -0.6]} color='red' onBoard offset={0.2} material={<meshStandardMaterial color='yellow' transparent opacity={1}/>}/> } */}
  //           <Text3D
  //             font="fonts/Luckiest Guy_Regular.json"
  //             position={[ -4.7, 0.02, 0.3]}
  //             rotation={[-Math.PI/2, 0, 0]}
  //             size={0.6}
  //             height={0.01}
  //             lineHeight={0.7}
  //           >
  //             {teams[0].players[index-2] ? formatName(teams[0].players[index-2].name, 8) : `SEAT ${(-index+6) % 8}`}
  //             <meshStandardMaterial color={ 'red' }/>
  //           </Text3D>
  //           <group name='background'>
  //             <mesh 
  //             name='background-outer' 
  //             position={[-2.2, 0, 0]} 
  //             scale={[5.8, 0.01, 1.3]}
  //             onPointerEnter={e => handleSeatPointerEnter(e)}
  //             onPointerLeave={e => handleSeatPointerLeave(e)}
  //             onPointerUp={e => handleSeatPointerUp(e, 0, index)}
  //             >
  //               <boxGeometry args={[1, 1, 1]}/>
  //               <meshStandardMaterial color='red' transparent opacity={0.1}/>
  //             </mesh>
  //             <mesh 
  //             name='background-inner' 
  //             position={[-2.2, 0, 0]} 
  //             scale={[5.7, 0.02, 1.2]}
  //             onPointerEnter={e => handleSeatPointerEnter(e)}
  //             onPointerLeave={e => handleSeatPointerLeave(e)}
  //             onPointerUp={e => handleSeatPointerUp(e, 0, index)}
  //             >
  //               <boxGeometry args={[1, 1, 1]}/>
  //               <meshStandardMaterial color='black' transparent opacity={0.3}/>
  //             </mesh>
  //             <mesh 
  //             name='wrapper' 
  //             position={[-2.2, 0, 0]} 
  //             scale={[5.8, 0.02, 1.3]}
  //             onPointerEnter={e => handleSeatPointerEnter(e)}
  //             onPointerLeave={e => handleSeatPointerLeave(e)}
  //             onPointerUp={e => handleSeatPointerUp(e, 0, index)}
  //             >
  //               <boxGeometry args={[1, 1, 1]}/>
  //               <meshStandardMaterial color='black' transparent opacity={0}/>
  //             </mesh>
  //           </group>
  //         </animated.group> :
  //         <animated.group 
  //         name='ufo-seat'
  //         key={index} 
  //         scale={spring.boomScale} 
  //         position={[
  //           Math.cos(Math.PI * 2 / 8 * index + Math.PI/8) * radius + ((index-2 === 5 || index-2 === -2) ? -0.3 : 0), 
  //           5, 
  //           Math.sin(Math.PI * 2 / 8 * index + Math.PI/8) * radius
  //         ]}>
  //           <Star key={index} scale={0.4}  color='turquoise' onBoard offset={0.2}/>
  //           <Text3D
  //             font="fonts/Luckiest Guy_Regular.json"
  //             position={[ (index === 2 || index === 4) ? -3.5 : 0.6, 0.02, 0.3]}
  //             rotation={[-Math.PI/2, 0, 0]}
  //             size={0.6}
  //             height={0.01}
  //             lineHeight={0.7}
  //           >
  //             {teams[1].players[index-6] ? formatName(teams[1].players[index-6].name) : `SEAT ${(index+3) % 8}`}
  //             <meshStandardMaterial color={ 'turquoise' }/>
  //           </Text3D>
  //           <group name='background'>
  //             <mesh 
  //             name='background-outer' 
  //             position={[2.2, 0, 0]} 
  //             scale={[5.8, 0.01, 1.3]}
  //             onPointerEnter={e => handleSeatPointerEnter(e)}
  //             onPointerLeave={e => handleSeatPointerLeave(e)}
  //             >
  //               <boxGeometry args={[1, 1, 1]}/>
  //               <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
  //             </mesh>
  //             <mesh 
  //             name='background-inner' 
  //             position={[2.2, 0, 0]} 
  //             scale={[5.7, 0.02, 1.2]}
  //             onPointerEnter={e => handleSeatPointerEnter(e)}
  //             onPointerLeave={e => handleSeatPointerLeave(e)}
  //             >
  //               <boxGeometry args={[1, 1, 1]}/>
  //               <meshStandardMaterial color='black' transparent opacity={0.3}/>
  //             </mesh>
  //             <mesh 
  //             name='wrapper' 
  //             position={[2.2, 0, 0]} 
  //             scale={[5.8, 0.02, 1.3]}
  //             onPointerEnter={e => handleSeatPointerEnter(e)}
  //             onPointerLeave={e => handleSeatPointerLeave(e)}
  //             onPointerUp={e => handleSeatPointerUp(e, 1, index)}
  //             >
  //               <boxGeometry args={[1, 1, 1]}/>
  //               <meshStandardMaterial color='black' transparent opacity={0}/>
  //             </mesh>
  //           </group>
  //         </animated.group>
  //       ) })}
  //     </group>
  //     { device === 'portrait' && shipRefs.map((value, index) => {
  //       return (index < 4 ? <group ref={value} key={index}>
  //         <Rocket scale={1}/>
  //       </group> : <group ref={value} key={index}>
  //         <Ufo scale={1}/>
  //       </group>)
  //     })}
  //     <SeatStatus/>
  //     <group position={joinTeamModalPosition}>
  //       <JoinTeamModal 
  //         position={layout[device].lobby.joinTeamModal.position}
  //         rotation={layout[device].lobby.joinTeamModal.rotation}
  //         scale={layout[device].lobby.joinTeamModal.scale}
  //         teams={teams}
  //       />
  //     </group>
  //   </group>
  // }

  function PlayersParty({ position=[0,0,0], scale=0.7 }) {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId
    const teams = useAtomValue(teamsAtom)
    const [seatClickedIndex, setSeatClickedIndex] = useState(0)
    const [joinTeamModalPosition, setJoinTeamModalPosition] = useState([0,0,0])

    const partyRef = useRef()
    const rocket0 = useRef()
    const rocket1 = useRef()
    const rocket2 = useRef()
    const rocket3 = useRef()
    const ufo0 = useRef()
    const ufo1 = useRef()
    const ufo2 = useRef()
    const ufo3 = useRef()
    const shipRefs = [rocket0, rocket1, rocket2, rocket3, ufo0, ufo1, ufo2, ufo3]
    const radius = 1.6
    const radius2 = 8.3
    const spring = useSpring({
      from: {
        boomScale: 0.6,
        boomScaleYut: 0.14
      },
      to: [
        {
          boomScale: 0.603,
          boomScaleYut: 0.145,
          config: {
            tension: 500,
            clamp: true
          }
        },
        {
          boomScale: 0.6,
          boomScaleYut: 0.14,
        },
      ],
      loop: true,
      delay: 234
    })
    useFrame((state) => {
      const time = state.clock.elapsedTime
      // partyRef.current.rotation.y = -time / 4;
      if (shipRefs[0].current) {
        shipRefs.forEach((value, index) => {
          if (value.current) {
            if (device === 'portrait') {
              value.current.position.x = Math.cos(-time / 3 + (Math.PI * 2 / shipRefs.length * index)) * radius2
              value.current.position.y = 5
              value.current.position.z = Math.sin(-time / 3 + (Math.PI * 2 / shipRefs.length * index)) * radius2 + 2
            } else {
              value.current.position.x = Math.cos((Math.PI * 2 / shipRefs.length * (index-1.5))) * radius2
              value.current.position.y = 5
              value.current.position.z = Math.sin((Math.PI * 2 / shipRefs.length * (index-1.5))) * radius2 + 2
            }
          }
        })
      }
    })

    {/* landing page: Take a seat */}
    {/* no more seats: Full capacity (grey button) */}
    {/* joined UFO: 'Prepare for contact' */}
    {/* joined Rocket: 'Ready to launch', 'Clear for takeoff' */}
    function SeatStatus({ position, scale }) {
      const teams = useAtomValue(teamsAtom)
      const client = useAtomValue(clientAtom)
      function TakeASeat({ position, scale }) {
        return <group
          name='take-a-seat-message'
          position={position}
          scale={scale}
        >
          <mesh
            name='background-inner'
            scale={[1.3, 1, 0.42]}
          >
            <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-0.95, 0.025, 0.12]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.25}
            height={0.01}
            lineHeight={0.7}
          >
            {`TAKE A SEAT`}
            <meshStandardMaterial color={ 'yellow' }/>
          </Text3D>
        </group>
      }
      function FullCapacity({ position, scale }) {
        return <group
          name='full-capacity-message'
          position={position}
          scale={scale}
        >
          <mesh
            name='background-inner'
            scale={[1.6, 1, 0.42]}
          >
            <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.1, 0.025, 0.12]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.25}
            height={0.01}
            lineHeight={0.7}
          >
            {`FULL CAPACITY`}
            <meshStandardMaterial color={ 'yellow' }/>
          </Text3D>
        </group>
      }
      function RocketJoined({ position, scale }) {
        return <group
          name='rocket-joined-message'
          position={position}
          scale={scale}
        >
          <mesh
            name='background-inner'
            scale={[1.3, 1, 0.6]}
          >
            <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-0.8, 0.025, -0.03]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.25}
            height={0.01}
            lineHeight={0.7}
          >
            {`CLEAR FOR\n  TAKEOFF`}
            <meshStandardMaterial color={ 'red' }/>
          </Text3D>
        </group>
      }
      function UfoJoined({ position, scale }) {
        return <group
          name='ufo-joined-message'
          position={position}
          scale={scale}
        >
          <mesh
            name='background-inner'
            scale={[1.5, 1, 0.6]}
          >
            <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1, 0.025, -0.03]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.25}
            height={0.01}
            lineHeight={0.7}
          >
            {`PREPARE FOR\n    CONTACT`}
            <meshStandardMaterial color={ 'turquoise' }/>
          </Text3D>
        </group>
      }
      if (teams[0].players.length < 4 || teams[1].players.length < 4) {
        return <TakeASeat position={[0,5,7.3]} scale={1.9}/>
      } else if (teams[0].players.length >= 4 && teams[1].players.length >= 4) {
        return <FullCapacity position={[0,5,7.3]} scale={1.9}/>
      } else if (client.team === 0) {
        return <RocketJoined position={[0,5,7.3]} scale={1.9}/>
      } else if (client.team === 1) {
        return <UfoJoined position={[0,5,7.3]} scale={1.9}/>
      }
    }
    function handleSeatPointerEnter(e) {
      e.stopPropagation()
    }
    function handleSeatPointerLeave(e) {
      e.stopPropagation()
    }
    const setJoinTeam = useSetAtom(joinTeamAtom)
    function handleSeatPointerUp(e, team) {
      e.stopPropagation()
      setJoinTeam(team)
    }

    useEffect(() => {
      if (seatClickedIndex === 6 || seatClickedIndex === 5) {
        setJoinTeamModalPosition([0, 0, 1.5])
      } else if (seatClickedIndex === 4 || seatClickedIndex === 7) {
        setJoinTeamModalPosition([0, 0, 3])
      } else if (seatClickedIndex === 3 || seatClickedIndex === 0) {
        setJoinTeamModalPosition([0, 0, 5.5])
      } else if (seatClickedIndex === 2 || seatClickedIndex === 1) {
        setJoinTeamModalPosition([0, 0, 7])
      }
    }, [seatClickedIndex])

    return <group scale={scale} position={position}>
      <BlueMoon scale={3} rotationSpeed={-0.2}/>
      <group ref={partyRef} scale={1.6} position={[0, 2, 4.3]}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-2.3,5,-3.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
          lineHeight={0.7}
        >
          {`TEAM\nROCKET`}
          <meshStandardMaterial color={ 'red' }/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0.5,5,-3.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
          lineHeight={0.7}
        >
          {`TEAM\nUFO`}
          <meshStandardMaterial color={ 'turquoise' }/>
        </Text3D>
        <YootDisplay scale={spring.boomScaleYut} position={[-0.15, 5, 0]} rotation={[0, Math.PI/2, 0]} />
        <animated.group 
        name='rocket-seat-1'
        scale={spring.boomScale} 
        position={[
          -Math.cos(Math.PI * 2 / 8 + Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 + Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color='red' onBoard offset={0.2}/>
          { teams[0].players[0] && host.socketId === teams[0].players[0].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[0] && client.socketId === teams[0].players[0].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[0] ? formatName(teams[0].players[0].name, 8) : `SEAT 1`}
            <meshStandardMaterial color={ 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='red' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-2'
        scale={spring.boomScale} 
        position={[
          -Math.cos(Math.PI * 2 / 8 - Math.PI/8) * radius + 0.3, 
          5, 
          -Math.sin(Math.PI * 2 / 8 - Math.PI/8) * radius + 0.1
        ]}>
          <Star scale={0.4} color='red' onBoard offset={0.2}/>
          { teams[0].players[1] && host.socketId === teams[0].players[1].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[1] && client.socketId === teams[0].players[1].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[1] ? formatName(teams[0].players[1].name, 8) : `SEAT 2`}
            <meshStandardMaterial color={ 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='red' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-3'
        scale={spring.boomScale} 
        position={[
          -Math.cos(0 - Math.PI/8) * radius + 0.3, 
          5, 
          -Math.sin(0 - Math.PI/8) * radius - 0.1
        ]}>
          <Star scale={0.4} color='red' onBoard offset={0.2}/>
          { teams[0].players[2] && host.socketId === teams[0].players[2].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[2] && client.socketId === teams[0].players[2].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[2] ? formatName(teams[0].players[2].name, 8) : `SEAT 3`}
            <meshStandardMaterial color={ 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='red' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-4'
        scale={spring.boomScale} 
        position={[
          -Math.cos(-Math.PI * 2 / 8 - Math.PI/8) * radius, 
          5, 
          -Math.sin(-Math.PI * 2 / 8 - Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color='red' onBoard offset={0.2}/>
          { teams[0].players[3] && host.socketId === teams[0].players[3].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[3] && client.socketId === teams[0].players[3].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[3] ? formatName(teams[0].players[3].name, 8) : `SEAT 4`}
            <meshStandardMaterial color={ 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='red' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[-2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-1'
        scale={spring.boomScale} 
        position={[
          Math.cos(Math.PI * 2 / 8 + Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 + Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color='turquoise' onBoard offset={0.2}/>
          { teams[1].players[0] && host.socketId === teams[1].players[0].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[0] && client.socketId === teams[1].players[0].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ 0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[0] ? formatName(teams[1].players[0].name, 8) : `SEAT 1`}
            <meshStandardMaterial color={ 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-2'
        scale={spring.boomScale} 
        position={[
          Math.cos(Math.PI * 2 / 8 - Math.PI/8) * radius - 0.3, 
          5, 
          -Math.sin(Math.PI * 2 / 8 - Math.PI/8) * radius + 0.1
        ]}>
          <Star scale={0.4} color='turquoise' onBoard offset={0.2}/>
          { teams[1].players[1] && host.socketId === teams[1].players[1].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[1] && client.socketId === teams[1].players[1].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ 0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[1] ? formatName(teams[1].players[1].name, 8) : `SEAT 2`}
            <meshStandardMaterial color={ 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-3'
        scale={spring.boomScale} 
        position={[
          Math.cos(0 - Math.PI/8) * radius - 0.3, 
          5, 
          -Math.sin(0 - Math.PI/8) * radius - 0.1
        ]}>
          <Star scale={0.4} color='turquoise' onBoard offset={0.2}/>
          { teams[1].players[2] && host.socketId === teams[1].players[2].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[2] && client.socketId === teams[1].players[2].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[ 0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[2] ? formatName(teams[1].players[2].name, 8) : `SEAT 3`}
            <meshStandardMaterial color={ 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-4'
        scale={spring.boomScale} 
        position={[
          Math.cos(-Math.PI * 2 / 8 - Math.PI/8) * radius, 
          5, 
          -Math.sin(-Math.PI * 2 / 8 - Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color='turquoise' onBoard offset={0.2}/>
          { teams[1].players[3] && host.socketId === teams[1].players[3].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[3] && client.socketId === teams[1].players[3].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[3] ? formatName(teams[1].players[3].name, 8) : `SEAT 4`}
            <meshStandardMaterial color={ 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
            </mesh>
            <mesh 
            name='background-inner' 
            position={[2.2, 0, 0]} 
            scale={[5.7, 0.02, 1.2]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0.3}/>
            </mesh>
            <mesh 
            name='wrapper' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.02, 1.3]}
            onPointerEnter={e => handleSeatPointerEnter(e)}
            onPointerLeave={e => handleSeatPointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
      </group>
      { device === 'portrait' && shipRefs.map((value, index) => {
        return (index < 4 ? <group ref={value} key={index}>
          <Rocket scale={1}/>
        </group> : <group ref={value} key={index}>
          <Ufo scale={1}/>
        </group>)
      })}
      <SeatStatus/>
      <group position={joinTeamModalPosition}>
        <JoinTeamModal 
          position={layout[device].lobby.joinTeamModal.position}
          rotation={layout[device].lobby.joinTeamModal.rotation}
          scale={layout[device].lobby.joinTeamModal.scale}
          teams={teams}
        />
      </group>
    </group>
  }

  function FirstSection() {
    const readyToStart = useAtomValue(readyToStartAtom)
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId
    const teams = useAtomValue(teamsAtom)

    function StartGameButton({ position }) {

      const colorMaterial = new MeshStandardMaterial({ color: 'turquoise' })

      const [hover, setHover] = useState(false);

      function handlePointerEnter(e) {
        e.stopPropagation();
        setHover(true)
      }

      function handlePointerLeave(e) {
        e.stopPropagation();
        setHover(false)
      }

      function handlePointerUp(e) {
        // const audio = new Audio('sounds/effects/join.wav');
        // audio.volume=0.3;
        // audio.play();
        e.stopPropagation();
        setHover(false)
        if (readyToStart) {
          socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
        }
      }

      return <group
        position={position}
        scale={2}
      >
        <mesh
          name='background-outer'
          scale={[1.3, 1, 0.45]}
        >
          <cylinderGeometry args={[1, 1, 0.01, 32]}/>
          <meshStandardMaterial color={ !readyToStart ? 'grey' : hover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          name='background-inner'
          scale={[1.3, 1, 0.42]}
        >
          <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
          name='wrapper' 
          scale={[1.3, 1, 0.45]}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerDown={e => handlePointerUp(e)}
        >
          <cylinderGeometry args={[1, 1, 0.01, 32]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.02, 0.025, 0.12]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.25}
          height={0.01}
          lineHeight={0.7}
        >
          {`START GAME!`}
          <meshStandardMaterial color={ !readyToStart ? 'grey' : hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    return <group>
      {/* <mesh name='background-panel' position={[-8.2, 0, 0]}>
        <boxGeometry args={[9, 0.01, 14]}/>
        <meshStandardMaterial color='black' transparent opacity={0.5}/>
      </mesh> */}
      <group name='title'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-12,0,-5.3]}
          rotation={[-Math.PI/2,0,0]}
          size={0.6}
          height={0.01}
        >
          YUT NORI!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-7,0,-5.3]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}
        >
          {`ID: ${params.id}`}
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
      <group name='players'>
        <TeamLobby
          position={layout[device].game.team0.position}
          scale={layout[device].game.team0.scale}
          device={device}
          team={0} 
        />
        <TeamLobby
          position={layout[device].game.team1.position}
          scale={layout[device].game.team1.scale}
          device={device}
          team={1} 
        />
        <JoinTeamModal 
          position={[-11.5, 0, -3]}
          rotation={layout[device].game.joinTeamModal.rotation}
          scale={layout[device].game.joinTeamModal.scale}
          teams={teams}
        />
        { isHost && <StartGameButton
          position={layout[device].game.letsPlayButton.position}
          rotation={layout[device].game.letsPlayButton.rotation}
        /> }
      </group>
    </group>
  }

  function FirstSectionNew({ position }) {
    return <group position={position}>
      <group name='title' position={[-3.3,0,-5.3]}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2,0,0]}
          size={0.6}
          height={0.01}
        >
          YUT NORI!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[4.5,0,0]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}
        >
          {`ID: ${params.id}`}
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
      <PlayersParty position={[1, 0, 0]} scale={0.6}/>
    </group>
  }

  // Rulebook
  function SecondSection({ position }) {
    return <group name='rulebook' position={position}>
      {/* <mesh name='background-panel' position={[0.7, -0.5, 0]}>
        <boxGeometry args={[8.4, 0.01, 14]}/>
        <meshStandardMaterial color='black' transparent opacity={0.5}/>
      </mesh> */}
      <group name='rulebook-label' position={[0.67, 0, -5.6]} scale={0.9}>
        <mesh name='background-outer' scale={[3.0, 0.01, 0.75]} position={[0,0,0]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh> 
        <mesh name='background-inner' scale={[2.95, 0.02, 0.7]} position={[0,0,0]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.3, 0.02, 0.19]}
        >
          RULEBOOK
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      <HowToPlay 
        device={device} 
        position={[-1,0,-1]} 
        scale={0.6}
        closeButton={false}
      />
    </group>
  }

  // Invite friends and rule setting
  function ThirdSection() {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId

    const [inviteFriendsVisible, setInviteFriendsVisible] = useState(true)
    const [settingsVisible, setSettingsVisible] = useState(false)
    function InviteFriendsButton() {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        console.log('[InviteFriendsButton] click')
        setInviteFriendsVisible(true)
        setSettingsVisible(false)
      }
      return <group name='invite-friends-button' position={[7.5, 0, -5.6]} scale={0.9}>
        <mesh name='background-outer' scale={[4.2, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || inviteFriendsVisible) ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[4.15, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[4.2, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.9, 0.02, 0.19]}
        >
          INVITE FRIENDS
          <meshStandardMaterial color={ (hover || inviteFriendsVisible) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function SettingsButtonLobby() {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        console.log('[SettingsButton] click')
        setSettingsVisible(true)
        setInviteFriendsVisible(false)
      }
      return <group name='settings-button' position={[10.8, 0, -5.6]} scale={0.9}>
        <mesh name='background-outer' scale={[2.8, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || settingsVisible) ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.75, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.8, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.2, 0.02, 0.19]}
        >
          SETTINGS
          <meshStandardMaterial color={ (hover || settingsVisible) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function InviteFriends() {
      function CopyLinkButton({ position }) {
        const [hover, setHover] = useState(false)
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
        }
        function copyURLToClipboard() {
          const url = window.location.href;
        
          if (navigator.clipboard && navigator.clipboard.writeText) {
            // Modern browsers with Clipboard API support
            navigator.clipboard.writeText(url)
              .then(() => {
              })
              .catch(err => {
                console.error("Failed to copy URL: ", err);
              });
          } else {
            // Fallback for older browsers
            const tempInput = document.createElement("input");
            document.body.appendChild(tempInput);
            tempInput.value = url;
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
          }
        }
        const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
        const [springs, api] = useSpring(() => ({        
          from: {
            opacity: 0, 
          }
        }))
        function handlePointerUp(e) {
          e.stopPropagation()
          console.log('[CopyLinkButton] click')
          copyURLToClipboard()
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
        return <group name='copy-link-button' position={position}>
          <mesh name='background-outer' scale={[3, 0.01, 0.75]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh> 
          <mesh name='background-inner' scale={[2.95, 0.02, 0.7]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={MeshColors.spaceDark}/>
          </mesh>
          <mesh 
          name='wrapper' 
          scale={[2.7, 0.02, 0.75]}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerUp={e => handlePointerUp(e)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='yellow' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            size={0.4}
            height={0.01}
            rotation={[-Math.PI/2, 0, 0]}
            position={[-1.3, 0.02, 0.19]}
          >
            COPY LINK
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
          <Text3D 
            name='copied-tooltip'
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1,0,-0.6]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            copied!
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color='limegreen'
              transparent
              opacity={springs.opacity}
            />
          </Text3D>
        </group>
      }

      // get image before download
      // display it as drei-image
      return <group>
        <QrCode3d text={window.location.href} position={[8.8,0.02,-2]} scale={0.8} rotation={[-Math.PI/2,0,0]}/>
        <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[5.6,0,1.5]}
        rotation={[-Math.PI/2,0,0]}
        size={0.35}
        height={0.01}
        lineHeight={0.9}>
          {`SCAN THE QR CODE TO JOIN\nTHIS ROOM, OR COPY THE\nLINK AND SHARE WITH YOUR\nFRIENDS`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <CopyLinkButton position={[8.6, 0.02, 5]}/>
      </group>
    }
    // reuse this component in the Settings menu in Game
    function SettingsLobby() {
      // hover states
      const [setting0Hover, setSetting0Hover] = useState(false)
      const [setting1Hover, setSetting1Hover] = useState(false)
      const [setting2Hover, setSetting2Hover] = useState(false)
      const [setting3Hover, setSetting3Hover] = useState(false)
      // toggle states (global)
      // pointer handlers (enter, leave, and up for each rule)
      const backdoLaunch = useAtomValue(backdoLaunchAtom)
      const timer = useAtomValue(timerAtom)
      const nak = useAtomValue(nakAtom)
      const yutMoCatch = useAtomValue(yutMoCatchAtom)
      const { 
        setting0TogglePosition, 
        setting0ToggleBackgroundColor,
        setting1TogglePosition, 
        setting1ToggleBackgroundColor,
        setting2TogglePosition, 
        setting2ToggleBackgroundColor,
        setting3TogglePosition, 
        setting3ToggleBackgroundColor,
      } = useSpring({
        setting0TogglePosition: !backdoLaunch ? [0,0,0] : [0.4, 0, 0],
        setting0ToggleBackgroundColor: !isHost ? '#454200' : !backdoLaunch ? '#5C5800' : 'green',
        setting1TogglePosition: !timer ? [0,0,0] : [0.4, 0, 0],
        setting1ToggleBackgroundColor: !isHost ? '#454200' : !timer ? '#5C5800' : 'green',
        setting2TogglePosition: !nak ? [0,0,0] : [0.4, 0, 0],
        setting2ToggleBackgroundColor: !isHost ? '#454200' : !nak ? '#5C5800' : 'green',
        setting3TogglePosition: !yutMoCatch ? [0,0,0] : [0.4, 0, 0],
        setting3ToggleBackgroundColor: !isHost ? '#454200' : !yutMoCatch ? '#5C5800' : 'green',
        config: {
          tension: 170,
          friction: 26
        },
      })
      
      function handleSetting0PointerEnter(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'pointer'
          setSetting0Hover(true)
        }
      }
      function handleSetting0PointerLeave(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'default'
          setSetting0Hover(false)
        }
      }
      function handleSetting0PointerUp(e) {
        e.stopPropagation()
        if (isHost) {
          if (!backdoLaunch) {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'backdoLaunch', flag: true }))
          } else {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'backdoLaunch', flag: false }))
          }
        }
      }
      function handleSetting1PointerEnter(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'pointer'
          setSetting1Hover(true)
        }
      }
      function handleSetting1PointerLeave(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'default'
          setSetting1Hover(false)
        }
      }
      function handleSetting1PointerUp(e) {
        e.stopPropagation()
        if (isHost) {
          if (!timer) {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'timer', flag: true }))
          } else {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'timer', flag: false }))
          }
        }
      }
      function handleSetting2PointerEnter(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'pointer'
          setSetting2Hover(true)
        }
      }
      function handleSetting2PointerLeave(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'default'
          setSetting2Hover(false)
        }
      }
      function handleSetting2PointerUp(e) {
        e.stopPropagation()
        if (isHost) {
          if (!nak) {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'nak', flag: true }))
          } else {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'nak', flag: false }))
          }
        }
      }
      function handleSetting3PointerEnter(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'pointer'
          setSetting3Hover(true)
        }
      }
      function handleSetting3PointerLeave(e) {
        e.stopPropagation()
        if (isHost) {
          document.body.style.cursor = 'default'
          setSetting3Hover(false)
        }
      }
      function handleSetting3PointerUp(e) {
        e.stopPropagation()
        if (isHost) {
          if (!yutMoCatch) {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'yutMoCatch', flag: true }))
          } else {
            socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'yutMoCatch', flag: false }))
          }
        }
      }
      
      const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

      return <group position={[0,0,0]}>
        <group name='setting-0' position={[5.2, 0, -3.2]}>
          <group name='setting-0-background'>
            { isHost && <mesh
            name='setting-0-background-outer'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.05, 2.9]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> }
            <mesh 
            name='setting-0-background-inner'
            position={[3.25, 0, 0]}
            scale={[7.05, 0.1, 2.85]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              color={ !setting0Hover ? MeshColors.disabledGreyBackground : '#444444' } 
              transparent 
              opacity={1}/>
            </mesh>
            <mesh 
            name='setting-0-background-wrapper'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.05, 2.9]}
            onPointerEnter={e=>handleSetting0PointerEnter(e)}
            onPointerLeave={e=>handleSetting0PointerLeave(e)}
            onPointerUp={e=>handleSetting0PointerUp(e)}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              transparent 
              opacity={0}/>
            </mesh>
          </group>
          <Text3D 
          name='setting-0-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,-0.8]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}>
            BACKDO LAUNCH
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <group 
          name='setting-0-toggle' 
          position={[5.95, 0.1, -1]}>
            <group name='setting-0-toggle-background'>
              <mesh 
              name='setting-0-toggle-background-left-circle'
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting0ToggleBackgroundColor}
                />
              </mesh>
              <mesh
              name='setting-0-toggle-background-block'
              position={[0.2, 0, 0]}
              scale={[0.4, 0.01, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting0ToggleBackgroundColor}
                />
              </mesh>
              <mesh 
              name='setting-0-toggle-background-right-circle'
              position={[0.4, 0, 0]}
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting0ToggleBackgroundColor}
                />
              </mesh>
            </group>
            <animated.mesh
            name='setting-0-toggle-switch'
            scale={[0.15, 0.02, 0.15]}
            position={setting0TogglePosition}>
              <cylinderGeometry args={[1, 1, 1, 32]}/>
              <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
            </animated.mesh>
          </group>
          <Text3D 
          name='setting-0-description'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,-0.2]}
          rotation={[-Math.PI/2,0,0]}
          size={0.3}
          height={0.01}
          lineHeight={0.8}>
            {`IF A TEAM THROWS A BACKDO (-1)\nAND HAS NO PIECES ON THE BOARD,\nTHEY CAN PUT A PIECE ON THE STAR\nBEHIND EARTH.`}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
        <group name='setting-1' position={[5.2, 0, -0.9]}>
          <group name='setting-1-background'>
            { isHost && <mesh
            name='setting-1-background-outer'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.05, 1.5]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> }
            <mesh 
            name='setting-1-background-inner'
            position={[3.25, 0, 0]}
            scale={[7.05, 0.1, 1.45]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              color={ !setting1Hover ? MeshColors.disabledGreyBackground : '#444444' } 
              transparent 
              opacity={1}/>
            </mesh>
            <mesh 
            name='setting-1-background-wrapper'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.1, 1.5]}
            onPointerEnter={e=>handleSetting1PointerEnter(e)}
            onPointerLeave={e=>handleSetting1PointerLeave(e)}
            onPointerUp={e=>handleSetting1PointerUp(e)}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              transparent 
              opacity={0}/>
            </mesh>
          </group>
          <Text3D
          name='setting-1-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,-0.1]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}>
            TIMER
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <group 
          name='setting-1-toggle' 
          position={[5.95, 0.1, -0.3]}>
            <group name='setting-1-toggle-background'>
              <mesh 
              name='setting-1-toggle-background-left-circle'
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting1ToggleBackgroundColor}
                />
              </mesh>
              <mesh
              name='setting-1-toggle-background-block'
              position={[0.2, 0, 0]}
              scale={[0.4, 0.01, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting1ToggleBackgroundColor}
                />
              </mesh>
              <mesh 
              name='setting-1-toggle-background-right-circle'
              position={[0.4, 0, 0]}
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting1ToggleBackgroundColor}
                />
              </mesh>
            </group>
            <animated.mesh
            name='setting-1-toggle-switch'
            scale={[0.15, 0.02, 0.15]}
            position={setting1TogglePosition}>
              <cylinderGeometry args={[1, 1, 1, 32]}/>
              <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
            </animated.mesh>
          </group>
          <Text3D 
          name='setting-1-description'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,0.5]}
          rotation={[-Math.PI/2,0,0]}
          size={0.3}
          height={0.01}
          lineHeight={0.8}>
            {`1 MINUTE TIME LIMIT PER TURN.`}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
        <group name='setting-2' position={[5.2, 0, 0.95]}>
          <group name='setting-2-background'>
            { isHost && <mesh
            name='setting-2-background-outer'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.05, 2]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> }
            <mesh 
            name='setting-2-background-inner'
            position={[3.25, 0, 0]}
            scale={[7.05, 0.1, 1.95]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              color={ !setting2Hover ? MeshColors.disabledGreyBackground : '#444444' } 
              transparent 
              opacity={1}/>
            </mesh>
            <mesh 
            name='setting-2-background-wrapper'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.05, 2.9]}
            onPointerEnter={e=>handleSetting2PointerEnter(e)}
            onPointerLeave={e=>handleSetting2PointerLeave(e)}
            onPointerUp={e=>handleSetting2PointerUp(e)}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              transparent 
              opacity={0}/>
            </mesh>
          </group>
          <Text3D 
          name='setting-2-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,-0.35]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}>
            NAK THROW
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <group 
          name='setting-2-toggle' 
          position={[5.95, 0.1, -0.55]}>
            <group name='setting-2-toggle-background'>
              <mesh 
              name='setting-2-toggle-background-left-circle'
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting2ToggleBackgroundColor}
                />
              </mesh>
              <mesh
              name='setting-2-toggle-background-block'
              position={[0.2, 0, 0]}
              scale={[0.4, 0.01, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting2ToggleBackgroundColor}
                />
              </mesh>
              <mesh 
              name='setting-2-toggle-background-right-circle'
              position={[0.4, 0, 0]}
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting2ToggleBackgroundColor}
                />
              </mesh>
            </group>
            <animated.mesh
            name='setting-2-toggle-switch'
            scale={[0.15, 0.02, 0.15]}
            position={setting2TogglePosition}>
              <cylinderGeometry args={[1, 1, 1, 32]}/>
              <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
            </animated.mesh>
          </group>
          <Text3D 
          name='setting-2-description'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,0.25]}
          rotation={[-Math.PI/2,0,0]}
          size={0.3}
          height={0.01}
          lineHeight={0.8}>
            {`THE STICKS WILL SOMETIMES FALL\nOUT OF BOUNDS.`}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
        <group name='setting-3' position={[5.2, 0, 3.05]}>
          <group name='setting-3-background'>
            { isHost && <mesh
            name='setting-3-background-outer'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.05, 2]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> }
            <mesh 
            name='setting-3-background-inner'
            position={[3.25, 0, 0]}
            scale={[7.05, 0.1, 1.95]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              color={ !setting3Hover ? MeshColors.disabledGreyBackground : '#444444' } 
              transparent 
              opacity={1}/>
            </mesh>
            <mesh 
            name='setting-3-background-wrapper'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.1, 2.9]}
            onPointerEnter={e=>handleSetting3PointerEnter(e)}
            onPointerLeave={e=>handleSetting3PointerLeave(e)}
            onPointerUp={e=>handleSetting3PointerUp(e)}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              transparent 
              opacity={0}/>
            </mesh>
          </group>
          <Text3D 
          name='setting-3-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,-0.35]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}>
            BONUS THROW CATCH
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <group 
          name='setting-3-toggle' 
          position={[5.95, 0.1, -0.55]}>
            <group name='setting-3-toggle-background'>
              <mesh 
              name='setting-3-toggle-background-left-circle'
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting3ToggleBackgroundColor}
                />
              </mesh>
              <mesh
              name='setting-3-toggle-background-block'
              position={[0.2, 0, 0]}
              scale={[0.4, 0.01, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting3ToggleBackgroundColor}
                />
              </mesh>
              <mesh 
              name='setting-3-toggle-background-right-circle'
              position={[0.4, 0, 0]}
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting3ToggleBackgroundColor}
                />
              </mesh>
            </group>
            <animated.mesh
            name='setting-3-toggle-switch'
            scale={[0.15, 0.02, 0.15]}
            position={setting3TogglePosition}>
              <cylinderGeometry args={[1, 1, 1, 32]}/>
              <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
            </animated.mesh>
          </group>
          <Text3D 
          name='setting-3-description'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.1,0.25]}
          rotation={[-Math.PI/2,0,0]}
          size={0.3}
          height={0.01}
          lineHeight={0.8}>
            {`THE STICKS WILL SOMETIMES FALL\nOUT OF BOUNDS.`}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
      </group>
    }

    return <group name='third-section'>
      {/* <mesh name='background-panel' position={[8.8, 0, 0]}>
        <boxGeometry args={[7.4, 0.01, 14]}/>
        <meshStandardMaterial color='black' transparent opacity={0.5}/>
      </mesh> */}
      <InviteFriendsButton/>
      { inviteFriendsVisible && <InviteFriends/> }
      <SettingsButtonLobby/>
      { settingsVisible && <SettingsLobby/> }
    </group>
  }

  // Layer buttons on top
  // Refactor TeamLobbies into a component
  // Refactor Rulebook into a component
  // Refactor Settings into a component
  // Reuse here
  function TopSection({ position }) {
    return <group position={position}>
      <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={[0,0,0]}
      rotation={[-Math.PI/2, 0, 0]}
      size={0.8}
      height={0.01}
      lineHeight={0.7}>
        YUT NORI
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={[-0.35,0,1.2]}
      rotation={[-Math.PI/2, 0, 0]}
      size={0.6}
      height={0.01}
      lineHeight={0.7}>
        {`ROOM ID: ${params.id}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function BodySection({ position, scale }) {
    const [selection, setSelection] = useState('players')
    function SettingsButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setSelection('settings')
      }
      return <group name='settings-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[2.8, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || selection === 'settings') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.75, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.8, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.2, 0.02, 0.19]}
        >
          SETTINGS
          <meshStandardMaterial color={ (hover || selection === 'settings') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function PlayersButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setSelection('players')
      }
      return <group name='settings-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[2.55, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || selection === 'players') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.5, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.55, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.1, 0.02, 0.19]}
        >
          PLAYERS
          <meshStandardMaterial color={ (hover || selection === 'players') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function RulebookButton({ position, scale }) {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setSelection('rulebook')
      }
      return <group name='settings-button' position={position} scale={scale}>
        <mesh name='background-outer' scale={[2.95, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || selection === 'rulebook') ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.9, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.85, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.3, 0.02, 0.19]}
        >
          RULEBOOK
          <meshStandardMaterial color={ (hover || selection === 'rulebook') ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function Players(props) {
      const teams = useAtomValue(teamsAtom)

      return <group {...props}>
        <TeamLobby
          position={layout[device].game.team0.position}
          scale={layout[device].game.team0.scale}
          device={device}
          team={0}
          buttonPosition={[0, 0, 5]}
        />
        <TeamLobby
          position={layout[device].game.team1.position}
          scale={layout[device].game.team1.scale}
          device={device}
          team={1} 
          buttonPosition={[0.2, 0, 5]}
        />
        <JoinTeamModal 
          position={[-3, 0, 1]}
          rotation={layout[device].game.joinTeamModal.rotation}
          scale={layout[device].game.joinTeamModal.scale}
          teams={teams}
        />
      </group>
    }
    return <group position={position} scale={scale}>
      <SettingsButton position={[-3.8, 0, -7]} scale={1.3}/>
      <PlayersButton position={[0,0,-7]} scale={1.3}/>
      <RulebookButton position={[3.9,0,-7]} scale={1.3}/>
      {/* { selection === 'players' && <Players/> } */}
      { selection === 'players' && <PlayersParty/> }
      {/* { selection === 'settings' && <Settings/> } */}
      {/* { selection === 'rulebook' && <Rulebook/> } */}
    </group>
  }

  function ActionSection({ position }) {
    const readyToStart = useAtomValue(readyToStartAtom)
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId

    function ShareThisLobbyButton({ position }) {
      function handleSharePointerEnter(e) {
        e.stopPropagation()
      }
      function handleSharePointerLeave(e) {
        e.stopPropagation()
      }
      async function handleSharePointerUp(e) {
        e.stopPropagation()
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Yut Nori',
              text: "Let's play Yut Nori!",
              url: window.location.href
            })
          } catch (err) {
            console.error('Error sharing:', err)
          }
        } else {
          alert('Web Share API is not supported. Copy the URL to share.')
        }
      }

      return <group name='share-this-lobby-button' position={position}>
        <mesh scale={[11.4, 0.01, 1.8]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh scale={[11.3, 0.02, 1.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[11.4, 0.02, 1.8]}
        onPointerEnter={e => handleSharePointerEnter(e)}
        onPointerLeave={e => handleSharePointerLeave(e)}
        onPointerUp={e => handleSharePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-3,0.02,0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          SHARE THIS LOBBY
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
    }

    function GuestStartButton({ position }) {
      // looks like the StartGame button but only displays text.
      // thought: pop messages: 'let's go!' for host to see
      return <group name='host-will-start' position={position}>
        <mesh scale={[11.4, 0.01, 1.8]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey'/>
        </mesh>
        <mesh scale={[11.3, 0.02, 1.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[11.4, 0.02, 1.8]}
        onPointerUp={e => handleStartPointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-2.2,0.02,0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          HOST WILL START
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
    }

    {/* For guest: 'Host will start */}
    {/* For host: 'waiting for crew', 'start game!' */}
    function StartGameButton({ position }) {
      async function handleStartPointerUp(e) {
        e.stopPropagation()
        if (isHost && readyToStart) {
          socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
        }
      }
      return <group name='start-game-button' position={position}>
        <mesh scale={[11.4, 0.01, 1.8]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ readyToStart ? 'yellow' : 'grey' }/>
        </mesh>
        <mesh scale={[11.3, 0.02, 1.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[11.4, 0.02, 1.8]}
        onPointerUp={e => handleStartPointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[ (readyToStart ? -2.2 : -3.2) ,0.02, 0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          { readyToStart ? `START GAME!` : `WAITING FOR CREW` }
          <meshStandardMaterial color={ readyToStart ? 'yellow' : 'grey' }/>
        </Text3D>
      </group>
    }

    return <group position={position}>
      <ShareThisLobbyButton position={[0,0,0.6]}/>
      { !isHost && <GuestStartButton position={[0,0,2.6]}/> }
      { isHost && <StartGameButton position={[0,0,2.6]}/> } 
    </group>
  }
  
  return <animated.group>
    <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
    { device === 'landscapeDesktop' && <group>
      <FirstSectionNew position={[-9, 0, 0]} />
      <SecondSection position={[0, 0, 0]}/>
      <ThirdSection/>
    </group> }
    { device === 'portrait' && <group>
      <TopSection position={[-2.3, 0, -9.7]}/>
      <BodySection position={[0, 0, 0]}/>
      <ActionSection position={[0, 0, 7]}/>
    </group>}
    <MeteorsRealShader/>
  </animated.group>
}