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
  clientAtom,
  joinTeamAtom,
  teamsAtom,
  connectedToServerAtom,
  guestBeingEdittedAtom,
  seatChosenAtom,
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
import GameRules from "./GameRules.jsx";

export default function Lobby() {

  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  const connectedToServer = useAtomValue(connectedToServerAtom)
  const params = useParams();

  function PlayersParty({ position=[0,0,0], scale=0.7 }) {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)  
    const [guestBeingEditted, setGuestBeingEditted] = useAtom(guestBeingEdittedAtom)
    const [seatChosen, setSeatChosen] = useAtom(seatChosenAtom)

    // #region animation
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
    // #endregion

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
            scale={[1.3, 1, 0.7]}
          >
            <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-0.95, 0.025, 0.03]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.25}
            height={0.01}
            lineHeight={0.7}
          >
            {`CLICK A SEAT\n     TO JOIN`}
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
            font="/fonts/Luckiest Guy_Regular.json"
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
            font="/fonts/Luckiest Guy_Regular.json"
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
            font="/fonts/Luckiest Guy_Regular.json"
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
      if (client.team === -1 && (teams[0].players.length < 4 || teams[1].players.length < 4)) {
        return <TakeASeat position={[0, 5, 7.5]} scale={2}/>
      } else if (teams[0].players.length >= 4 && teams[1].players.length >= 4) {
        return <FullCapacity position={[0,5,7.5]} scale={1.9}/>
      } else if (client.team === 0) {
        return <RocketJoined position={[0,5,7.5]} scale={1.9}/>
      } else if (client.team === 1) {
        return <UfoJoined position={[0,5,7.5]} scale={1.9}/>
      }
    }
    const setJoinTeam = useSetAtom(joinTeamAtom)

    function Seats() {
      const teams = useAtomValue(teamsAtom)
      // #region Seat hover
      const [seat1Team0Hover, setSeat1Team0Hover] = useState(false)
      const [seat2Team0Hover, setSeat2Team0Hover] = useState(false)
      const [seat3Team0Hover, setSeat3Team0Hover] = useState(false)
      const [seat4Team0Hover, setSeat4Team0Hover] = useState(false)
      const [seat1Team1Hover, setSeat1Team1Hover] = useState(false)
      const [seat2Team1Hover, setSeat2Team1Hover] = useState(false)
      const [seat3Team1Hover, setSeat3Team1Hover] = useState(false)
      const [seat4Team1Hover, setSeat4Team1Hover] = useState(false)
      function handleSeat1Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat1Team0Hover(true)
      }
      function handleSeat1Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat1Team0Hover(false)
      }
      function handleSeat2Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat2Team0Hover(true)
      }
      function handleSeat2Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat2Team0Hover(false)
      }
      function handleSeat3Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat3Team0Hover(true)
      }
      function handleSeat3Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat3Team0Hover(false)
      }
      function handleSeat4Team0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat4Team0Hover(true)
      }
      function handleSeat4Team0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat4Team0Hover(false)
      }
      function handleSeat1Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat1Team1Hover(true)
      }
      function handleSeat1Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat1Team1Hover(false)
      }
      function handleSeat2Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat2Team1Hover(true)
      }
      function handleSeat2Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat2Team1Hover(false)
      }
      function handleSeat3Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat3Team1Hover(true)
      }
      function handleSeat3Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat3Team1Hover(false)
      }
      function handleSeat4Team1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSeat4Team1Hover(true)
      }
      function handleSeat4Team1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSeat4Team1Hover(false)
      }
      // #endregion

      function handleSeatPointerUp(e, team, seatIndex) {
        e.stopPropagation()
        if (client.socketId === host.socketId) {
          if (client.team !== team && !teams[team].players[seatIndex]) {
            setSeatChosen([team, seatIndex])
          } else if (teams[team].players[seatIndex].socketId !== client.socketId) {
            const player = teams[team].players[seatIndex]
            setGuestBeingEditted({
              name: player.name,
              connectionState: player.connectedToRoom,
              isYou: false,
              isHost: false,
              team: player.team,
              status: player.status,
              _id: player._id,
            })
          }
        } else if (client.team !== team) {
          setJoinTeam(team)
        }
      }

      // Players are in seat by their index in the teams[team].players array
      return <group>
        <animated.group 
        name='rocket-seat-1'
        scale={0.6} 
        position={[
          -Math.cos(Math.PI * 2 / 8 + Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 + Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color={ seat1Team0Hover ? 'orange' : 'red' } onBoard offset={0.2}/>
          { teams[0].players[0] && host.socketId === teams[0].players[0].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[0] && client.socketId === teams[0].players[0].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[0] ? formatName(teams[0].players[0].name, 8) : `SEAT 1`}
            <meshStandardMaterial color={ (teams[0].players[0] && !teams[0].players[0].connectedToRoom) ? 'grey' : seat1Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat1Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat1Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat1Team0PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-2'
        scale={0.6} 
        position={[
          -Math.cos(Math.PI * 2 / 8 - Math.PI/8) * radius + 0.3, 
          5, 
          -Math.sin(Math.PI * 2 / 8 - Math.PI/8) * radius + 0.1
        ]}>
          <Star scale={0.4} color={ seat2Team0Hover ? 'orange' : 'red' } onBoard offset={0.2}/>
          { teams[0].players[1] && host.socketId === teams[0].players[1].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[1] && client.socketId === teams[0].players[1].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[1] ? formatName(teams[0].players[1].name, 8) : `SEAT 2`}
            <meshStandardMaterial color={ (teams[0].players[1] && !teams[0].players[1].connectedToRoom) ? 'grey' : seat2Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat2Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat2Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat2Team0PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-3'
        scale={0.6} 
        position={[
          -Math.cos(0 - Math.PI/8) * radius + 0.3, 
          5, 
          -Math.sin(0 - Math.PI/8) * radius - 0.1
        ]}>
          <Star scale={0.4} color={ seat3Team0Hover ? 'orange' : 'red' } onBoard offset={0.2}/>
          { teams[0].players[2] && host.socketId === teams[0].players[2].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[2] && client.socketId === teams[0].players[2].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[2] ? formatName(teams[0].players[2].name, 8) : `SEAT 3`}
            <meshStandardMaterial color={ (teams[0].players[2] && !teams[0].players[2].connectedToRoom) ? 'grey' : seat3Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat3Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat3Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat3Team0PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0, 2)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='rocket-seat-4'
        scale={0.6} 
        position={[
          -Math.cos(-Math.PI * 2 / 8 - Math.PI/8) * radius, 
          5, 
          -Math.sin(-Math.PI * 2 / 8 - Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color={ seat4Team0Hover ? 'orange' : 'red' } onBoard offset={0.2}/>
          { teams[0].players[3] && host.socketId === teams[0].players[3].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[0].players[3] && client.socketId === teams[0].players[3].socketId && <group>
            <Star scale={0.3}  position={[-5, 0, -0.5]} color='red'/>
            <Star scale={0.2}  position={[-4.75, 0, -0.7]} color='red'/>
            <Star scale={0.15}  position={[-4.5, 0, -0.8]} color='red'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ -4.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[0].players[3] ? formatName(teams[0].players[3].name, 8) : `SEAT 4`}
            <meshStandardMaterial color={ (teams[0].players[3] && !teams[0].players[3].connectedToRoom) ? 'grey' : seat4Team0Hover ? 'orange' : 'red' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[-2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat4Team0Hover ? 'orange' : 'red' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat4Team0PointerEnter(e)}
            onPointerLeave={e => handleSeat4Team0PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 0, 3)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-1'
        scale={0.6} 
        position={[
          Math.cos(Math.PI * 2 / 8 + Math.PI/8) * radius, 
          5, 
          -Math.sin(Math.PI * 2 / 8 + Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color={ seat1Team1Hover ? 'green' : 'turquoise' } onBoard offset={0.2}/>
          { teams[1].players[0] && host.socketId === teams[1].players[0].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[0] && client.socketId === teams[1].players[0].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ 0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[0] ? formatName(teams[1].players[0].name, 8) : `SEAT 1`}
            <meshStandardMaterial color={ (teams[1].players[0] && !teams[1].players[0].connectedToRoom) ? 'grey' : seat1Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat1Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat1Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat1Team1PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1, 0)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-2'
        scale={0.6} 
        position={[
          Math.cos(Math.PI * 2 / 8 - Math.PI/8) * radius - 0.3, 
          5, 
          -Math.sin(Math.PI * 2 / 8 - Math.PI/8) * radius + 0.1
        ]}>
          <Star scale={0.4} color={ seat2Team1Hover ? 'green' : 'turquoise' } onBoard offset={0.2}/>
          { teams[1].players[1] && host.socketId === teams[1].players[1].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[1] && client.socketId === teams[1].players[1].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ 0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[1] ? formatName(teams[1].players[1].name, 8) : `SEAT 2`}
            <meshStandardMaterial color={ (teams[1].players[1] && !teams[1].players[1].connectedToRoom) ? 'grey' : seat2Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat2Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat2Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat2Team1PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1, 1)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-3'
        scale={0.6} 
        position={[
          Math.cos(0 - Math.PI/8) * radius - 0.3, 
          5, 
          -Math.sin(0 - Math.PI/8) * radius - 0.1
        ]}>
          <Star scale={0.4} color={ seat3Team1Hover ? 'green' : 'turquoise' } onBoard offset={0.2}/>
          { teams[1].players[2] && host.socketId === teams[1].players[2].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[2] && client.socketId === teams[1].players[2].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[ 0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[2] ? formatName(teams[1].players[2].name, 8) : `SEAT 3`}
            <meshStandardMaterial color={ (teams[1].players[2] && !teams[1].players[2].connectedToRoom) ? 'grey' : seat3Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat3Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat3Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat3Team1PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1, 2)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
        <animated.group 
        name='ufo-seat-4'
        scale={0.6} 
        position={[
          Math.cos(-Math.PI * 2 / 8 - Math.PI/8) * radius, 
          5, 
          -Math.sin(-Math.PI * 2 / 8 - Math.PI/8) * radius
        ]}>
          <Star scale={0.4} color={ seat4Team1Hover ? 'green' : 'turquoise' } onBoard offset={0.2}/>
          { teams[1].players[3] && host.socketId === teams[1].players[3].socketId && <Star scale={0.45} position={[0, 0, 0]} color='yellow'/> }
          { teams[1].players[3] && client.socketId === teams[1].players[3].socketId && <group>
            <Star scale={0.3}  position={[-0.7, 0, -0.5]} color='turquoise'/>
            <Star scale={0.2}  position={[-0.45, 0, -0.7]} color='turquoise'/>
            <Star scale={0.15}  position={[-0.2, 0, -0.8]} color='turquoise'/>
          </group>}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[0.7, 0.02, 0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.6}
            height={0.01}
            lineHeight={0.7}
          >
            {teams[1].players[3] ? formatName(teams[1].players[3].name, 8) : `SEAT 4`}
            <meshStandardMaterial color={ (teams[1].players[3] && !teams[1].players[3].connectedToRoom) ? 'grey' : seat4Team1Hover ? 'green' : 'turquoise' }/>
          </Text3D>
          <group name='background'>
            <mesh 
            name='background-outer' 
            position={[2.2, 0, 0]} 
            scale={[5.8, 0.01, 1.3]}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ seat4Team1Hover ? 'green' : 'turquoise' } transparent opacity={0.1}/>
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
            onPointerEnter={e => handleSeat4Team1PointerEnter(e)}
            onPointerLeave={e => handleSeat4Team1PointerLeave(e)}
            onPointerUp={e => handleSeatPointerUp(e, 1, 3)}
            >
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
        </animated.group>
      </group>
    }

    function mapTeamToPlayerColor(team) {
      if (team === -1) {
        return '#9F9F9F'
      } else if (team === 0) {
        return 'red'
      } else if (team === 1) {
        return 'turquoise'
      }
    }
    // -1 team: spectator
    function EditOneGuest({ position=[0,0,0], scale=1 }) {  
      function CloseButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          setGuestBeingEditted(null)
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[1.55, 0.01, 0.55]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[1.45, 0.02, 0.45]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[1.55, 0.02, 0.55]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerUp={e=>handlePointerUp(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-0.63,0.02,0.14]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.26}
            height={0.01}
          >
            X CLOSE
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function AssignHostButton({ position=[0,0,0] }) {
        const [hover, setHover] = useState(false);
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          socket.emit('assignHost', { 
            roomId: params.id.toUpperCase(),
            clientId: client._id,
            userId: guestBeingEditted._id,
            team: guestBeingEditted.team,
            name: guestBeingEditted.name
          }, (response) => {
            if (response === 'success') {
              setGuestBeingEditted(null)
            }
          })
        }
        return <group name='assign-host-button' position={position}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='wrapper'
              onPointerEnter={e => handlePointerEnter(e)}
              onPointerLeave={e => handlePointerLeave(e)}
              onPointerUp={e => handlePointerUp(e)}
              scale={[8.5, 0.02, 1]}
            >
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.05,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            ASSIGN HOST
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function KickButton({ position=[0,0,0] }) {
        const [hover, setHover] = useState(false);
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          socket.emit('kick', { 
            roomId: params.id.toUpperCase(),
            clientId: client._id,
            team: guestBeingEditted.team,
            name: guestBeingEditted.name,
          }, (response) => {
            if (response === 'success') {
              setGuestBeingEditted(null)
            }
          })
        }
        return <group name='kick-button' position={position}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
            </mesh>
            <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='wrapper'
              onPointerEnter={e => handlePointerEnter(e)}
              onPointerLeave={e => handlePointerLeave(e)}
              onPointerUp={e => handlePointerUp(e)}
              scale={[8.5, 0.02, 1]}
            >
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.05,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            KICK
            <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
          </Text3D>
        </group>
      }
      function SetSpectatorButton({ position=[0,0,0] }) {
        const [hover, setHover] = useState(false);
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          // set player to spectator
          socket.emit('setTeam', {
            roomId: params.id.toUpperCase(),
            clientId: client._id,
            userId: guestBeingEditted._id,
            name: guestBeingEditted.name,
            currTeamId: guestBeingEditted.team,
            newTeamId: -1
          }, (response) => {
            if (response === 'success') {
              setGuestBeingEditted(null)
            }
          })
        }
        return <group name='set-spectator-button' position={position}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='wrapper'
              onPointerEnter={e => handlePointerEnter(e)}
              onPointerLeave={e => handlePointerLeave(e)}
              onPointerUp={e => handlePointerUp(e)}
              scale={[8.5, 0.02, 1]}
            >
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.05,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            SET SPECTATOR
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function handlePointerEnter(e) {
        e.stopPropagation()
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
      }
      return <group position={position} scale={scale}>
        {/* background */}
        <group name='background'
        onPointerEnter={e=>handlePointerEnter(e)}
        onPointerLeave={e=>handlePointerLeave(e)}
        >
          <mesh name='background-outer' scale={[9, 0.01, 4.3]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh name='background-inner' scale={[8.9, 0.02, 4.2]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        {/* title */}
        <group name='title' position={[0.34, 0.02, -2.2]}>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.6,0,0.7]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            EDIT
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.2,0,0.7]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            {guestBeingEditted.name}
            <meshStandardMaterial color={mapTeamToPlayerColor(guestBeingEditted.team)}/>
          </Text3D>
        </group>
        {/* navigation */}
        <CloseButton position={[3.5, 0.02, -1.725]}/>
        {/* action buttons */}
        <group name='player-buttons'>
          <SetSpectatorButton position={[0, 0.02, (-0.8) + (1 + 0.1) * 0]}/>
          <AssignHostButton position={[0, 0.02, (-0.8) + (1 + 0.1) * 1]}/>
          <KickButton position={[0, 0.02, (-0.8) + (1 + 0.1) * 2]}/>
        </group>
      </group>
    }

    function SeatModal({ position, rotation, scale }) {
      function CloseButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          setSeatChosen(null)
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[1.55, 0.01, 0.55]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[1.45, 0.02, 0.45]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[1.55, 0.02, 0.55]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerUp={e=>handlePointerUp(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-0.63,0.02,0.14]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.26}
            height={0.01}
          >
            X CLOSE
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function TakeSeatButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          setJoinTeam(seatChosen[0])
          setSeatChosen(null)
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[6.8, 0.01, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[6.7, 0.02, 0.8]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[6.8, 0.02, 0.9]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerUp={e=>handlePointerUp(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.15,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            TAKE SEAT
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function AddAIEZButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          setSeatChosen(null)
          // send 'add AI' event to server
          // must be host
          socket.emit('addAI', { roomId: params.id.toUpperCase(), clientId: client._id, team: seatChosen[0], level: 'random' })
        }
    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[6.8, 0.01, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[6.7, 0.02, 0.8]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[6.8, 0.02, 0.9]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerUp={e=>handlePointerUp(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.15,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            ADD AI - EZ
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      function AddAISmartButton({ position, rotation, scale }) {
        const [hover, setHover] = useState(false)
    
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'default'
        }
        function handlePointerUp(e) {
          e.stopPropagation()
          setSeatChosen(null)
          // send 'add AI' event to server
          // must be host
          socket.emit('addAI', { roomId: params.id.toUpperCase(), clientId: client._id, team: seatChosen[0], level: 'smart' })
        }

    
        return <group position={position} rotation={rotation} scale={scale}>
          {/* background */}
          <group name='background'>
            <mesh name='background-outer' scale={[6.8, 0.01, 0.9]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh name='background-inner' scale={[6.7, 0.02, 0.8]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh name='background-wrapper' 
            scale={[6.8, 0.02, 0.9]}
            onPointerEnter={e=>handlePointerEnter(e)}
            onPointerLeave={e=>handlePointerLeave(e)}
            onPointerUp={e=>handlePointerUp(e)}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial transparent opacity={0}/>
            </mesh>
          </group>
          {/* text */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-3.15,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            ADD AI - SMART
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
      }
      const seatModalButtons = [
        <TakeSeatButton/>,
        <AddAIEZButton/>,
        <AddAISmartButton/>,
      ]
      const backgroundDimensions = {
        position: [0, 0, 0.1 + 0.5 * (seatModalButtons.length - 2)],
        scaleOuter: [7, 0.01, 1 * seatModalButtons.length + 1],
        scaleInner: [6.9, 0.02, 1 * seatModalButtons.length + 0.9]
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background' position={backgroundDimensions.position}>
          <mesh name='background-outer' scale={backgroundDimensions.scaleOuter}>
          {/* <mesh name='background-outer' scale={[7, 0.01, 4.2]}> */}
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh name='background-inner' scale={backgroundDimensions.scaleInner}>
          {/* <mesh name='background-inner' scale={[6.9, 0.02, 4.1]}> */}
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        {/* title */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.3, 0.02, -0.7]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          {`SEAT ${seatChosen[1]+1}`}
          <meshStandardMaterial color={ seatChosen[0] === 0 ? 'red' : 'turquoise' }/>
        </Text3D>
        {/* close button */}
        <CloseButton position={[2.45, 0.02, -0.95]} scale={1.2}/>
        { seatModalButtons.map((value, index) => {
          return <group position={[0, 0.02, 1 * index]} key={index}>
            {value}
          </group>
        }) }
      </group>
    }

    return <group scale={scale} position={position}>
      <BlueMoon scale={3} rotationSpeed={-0.2}/>
      <group ref={partyRef} scale={1.6} position={[0, 2, 4.3]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
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
          font="/fonts/Luckiest Guy_Regular.json"
          position={[0.5,5,-3.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
          lineHeight={0.7}
        >
          {`TEAM\nUFO`}
          <meshStandardMaterial color={ 'turquoise' }/>
        </Text3D>
        <YootDisplay scale={0.14} position={[-0.15, 5, 0]} rotation={[0, Math.PI/2, 0]}/>
        {/* <YootDisplay scale={spring.boomScaleYut} position={[-0.15, 5, 0]} rotation={[0, Math.PI/2, 0]}/> */}
        <Seats/>
      </group>
      { device === 'portrait' && shipRefs.map((value, index) => {
        return (index < 4 ? <group ref={value} key={index}>
          <Rocket scale={1}/>
        </group> : <group ref={value} key={index}>
          <Ufo scale={1}/>
        </group>)
      })}
      <SeatStatus/>
      <JoinTeamModal 
        position={layout[device].lobby.joinTeamModal.position}
        rotation={layout[device].lobby.joinTeamModal.rotation}
        scale={layout[device].lobby.joinTeamModal.scale}
      />
      { seatChosen && <SeatModal position={[0, 13, 10]} rotation={[0,0,0]} scale={1.5}/> }
      { guestBeingEditted && <EditOneGuest 
        position={[0,12,10]} 
        scale={1.3}
        guestBeingEditted={guestBeingEditted}
      /> }
    </group>
  }

  function FirstSectionNew({ position }) {
    const readyToStart = useAtomValue(readyToStartAtom)
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId

    function StartGameButton({ position }) {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setHover(false)
        if (isHost && readyToStart) {
          socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
          
          const audio = new Audio('sounds/effects/boot-up.mp3');
          audio.volume = 1;
          audio.play();
        }
      }
      return <group name='start-game-button' position={position}>
        <mesh name='background-outer' scale={[4.5, 0.01, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[4.45, 0.02, 0.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[4.5, 0.02, 0.9]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.6, 0.02, 0.19]}
        >
          START GAME!
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function WaitingForCrewSign({ position, scale }) {
      return <group name='waiting-for-crew-sign' position={position} scale={scale}>
        <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey'/>
        </mesh> 
        <mesh name='background-inner' scale={[5.45, 0.02, 0.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-2.4, 0.02, 0.19]}
        >
          WAITING FOR CREW
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }
    function HostWillStartSign({ position, scale }) {
      return <group name='host-will-start-sign' position={position} scale={scale}>
        <mesh name='background-outer' scale={[5.1, 0.01, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='grey'/>
        </mesh> 
        <mesh name='background-inner' scale={[5.05, 0.02, 0.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-2.1, 0.02, 0.19]}
        >
          HOST WILL START
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }
    return <group position={position}>
      <group name='title' position={[-3.3,0,-5.3]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2,0,0]}
          size={0.6}
          height={0.01}
        >
          YUT NORI!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[4.5,0,0]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}
        >
          {`ID: ${params.id}${isHost ? '  (HOST)' : ''}`}
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
      <PlayersParty position={[1, 0, -0.2]} scale={0.55}/>
      { isHost && readyToStart && <StartGameButton position={[0.9, 0, 5]}/> }
      { isHost && !readyToStart && <WaitingForCrewSign position={[0.9,0,5]} scale={0.8}/> }
      { !isHost && <HostWillStartSign position={[0.9,0,5]} scale={0.8}/> }
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
          font="/fonts/Luckiest Guy_Regular.json"
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

    const [inviteFriendsVisible, setInviteFriendsVisible] = useState(true)
    const [settingsVisible, setSettingsVisible] = useState(false)
    function InviteFriendsButton() {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setHover(false)
      }
      function handlePointerUp(e) {
        e.stopPropagation()
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
          font="/fonts/Luckiest Guy_Regular.json"
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
        document.body.style.cursor = 'pointer'
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
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
          font="/fonts/Luckiest Guy_Regular.json"
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
          document.body.style.cursor = 'pointer'
          setHover(true)
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          document.body.style.cursor = 'default'
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
          scale={[3, 0.02, 0.75]}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerUp={e => handlePointerUp(e)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='yellow' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
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
            font="/fonts/Luckiest Guy_Regular.json"
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
        font="/fonts/Luckiest Guy_Regular.json"
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

    return <group name='third-section'>
      {/* <mesh name='background-panel' position={[8.8, 0, 0]}>
        <boxGeometry args={[7.4, 0.01, 14]}/>
        <meshStandardMaterial color='black' transparent opacity={0.5}/>
      </mesh> */}
      <InviteFriendsButton/>
      { inviteFriendsVisible && <InviteFriends/> }
      <SettingsButtonLobby/>
      { settingsVisible && <GameRules position={[0.3,0,0]}/> }
    </group>
  }

  function TopSection({ position }) {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = client.socketId === host.socketId
    
    const roomIdRef = useRef(null)
    const roomIdContainerRef = useRef(null)

    useFrame(() => {
      if (roomIdRef.current && roomIdRef.current.geometry.boundingSphere) {
        const centerX = roomIdRef.current.geometry.boundingSphere.center.x
        roomIdContainerRef.current.position.x = -centerX
      }
    })
    return <group position={position}>
      <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      position={[0,0,0]}
      rotation={[-Math.PI/2, 0, 0]}
      size={0.8}
      height={0.01}
      lineHeight={0.7}>
        YUT NORI
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <group ref={roomIdContainerRef}>
        <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[2.4,0,1.4]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.6}
        height={0.01}
        lineHeight={0.7}
        ref={roomIdRef}>
          {`ROOM ID: ${params.id}${isHost ? ' (HOST)' : ''}`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
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
          font="/fonts/Luckiest Guy_Regular.json"
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
          font="/fonts/Luckiest Guy_Regular.json"
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
          font="/fonts/Luckiest Guy_Regular.json"
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
    return <group position={position} scale={scale}>
      <SettingsButton position={[-3.8, 0, -7]} scale={1.3}/>
      <PlayersButton position={[0,0,-7]} scale={1.3}/>
      <RulebookButton position={[3.9,0,-7]} scale={1.3}/>
      {/* { selection === 'players' && <Players/> } */}
      { selection === 'players' && <PlayersParty position={[0, 0, 0.5]}/> }
      { selection === 'settings' && <GameRules position={[-11,0,1]} scale={1.3}/> }
      { selection === 'rulebook' && <HowToPlay device={device} scale={0.8} position={[-2.3, 0, -1.4]}/> }
    </group>
  }

  function ActionSection({ position }) {
    const readyToStart = useAtomValue(readyToStartAtom)
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)
    const isHost = host && client && client.socketId === host.socketId

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
              text: "Let's play a game!",
              url: window.location.href,
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
          font="/fonts/Luckiest Guy_Regular.json"
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
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.8,0.02,0.23]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
          lineHeight={0.7}>
          HOST WILL START
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }

    {/* For host: 'waiting for crew', 'start game!' */}
    function StartGameButton({ position }) {
      async function handleStartPointerUp(e) {
        e.stopPropagation()
        if (isHost && readyToStart) {
          socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
          
          const audio = new Audio('sounds/effects/boot-up.mp3');
          audio.volume = 1;
          audio.play();
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
          font="/fonts/Luckiest Guy_Regular.json"
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
      <ShareThisLobbyButton position={[0,0,1.1]}/>
      { !isHost && <GuestStartButton position={[0,0,3.1]}/> }
      { isHost && <StartGameButton position={[0,0,3.1]}/> } 
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
    { !connectedToServer && <DisconnectModal
      position={layout[device].lobby.disconnectModal.position}
      rotation={layout[device].lobby.disconnectModal.rotation}
    /> }
    <MeteorsRealShader/>
  </animated.group>
}