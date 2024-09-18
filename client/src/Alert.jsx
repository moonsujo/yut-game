import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useGLTF, Text3D } from "@react-three/drei";
import Rocket from "./meshes/Rocket";
import Ufo from "./meshes/Ufo";
import { animated, useSpring } from "@react-spring/three";
import Star from "./meshes/Star";
import { useAtom, useAtomValue } from "jotai";
import { alertsAtom, animationPlayingAtom, catchOutcomeAtom, currentPlayerNameAtom, gamePhaseAtom, mainAlertAtom, pieceAnimationPlayingAtom, teamsAtom, turnAtom, yootOutcomeAtom } from "./GlobalState";
import { formatName } from "./helpers/helpers";
import DoAlert from "./alerts/DoAlert";
import GeAlert from "./alerts/GeAlert";
import GulAlert from "./alerts/GulAlert";
import YootAlert from "./alerts/YootAlert";
import MoAlert from "./alerts/MoAlert";
import OutAlert from "./alerts/OutAlert";
import BackdoAlert from "./alerts/BackdoAlert";
import Catch1RocketAlert from "./alerts/Catch1RocketAlert";
import Catch1UfoAlert from "./alerts/Catch1UfoAlert";
import Catch2RocketAlert from "./alerts/Catch2RocketAlert";
import Catch2UfoAlert from "./alerts/Catch2UfoAlert";
import Catch3RocketAlert from "./alerts/Catch3RocketAlert";
import Catch3UfoAlert from "./alerts/Catch3UfoAlert";
import Catch4RocketAlert from "./alerts/Catch4RocketAlert";
import Catch4UfoAlert from "./alerts/Catch4UfoAlert";
import YootAlertPregame from "./alerts/YootAlertPregame";
import MoAlertPregame from "./alerts/MoAlertPregame";

export default function Alert({ position, rotation }) {
    const { nodes, materials } = useGLTF('models/alert-background.glb')
    
    const [alerts] = useAtom(alertsAtom)
    const [yootOutcome] = useAtom(yootOutcomeAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)
    const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
    const pieceAnimationPlaying = useAtomValue(pieceAnimationPlayingAtom)

    const [springs, api] = useSpring(() => ({
      from: {
        turnAlertScale: 0,
        gameStartAlertScale: 0,
        yootOutcome1AlertScale: 0,
        yootOutcome2AlertScale: 0,
        yootOutcome3AlertScale: 0,
        yootOutcome4PregameAlertScale: 0,
        yootOutcome5PregameAlertScale: 0,
        yootOutcome4AlertScale: 0,
        yootOutcome5AlertScale: 0,
        pregameTieAlertScale: 0,
        pregameRocketsWinAlertScale: 0,
        pregameUfosWinAlertScale: 0,
        catchAlertScale: 0
      },
    }))

    function transformAlertsToAnimations(alerts) {
      let animations = []
      for (let i = 0; i < alerts.length; i++) {
        if (alerts[i] === 'gameStart') {
          animations.push({
            gameStartAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            gameStartAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'turn') {
          animations.push({
            turnAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            turnAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome1') {
          animations.push({
            yootOutcome1AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome1AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome2') {
          animations.push({
            yootOutcome2AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome2AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome3') {
          animations.push({
            yootOutcome3AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome3AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome4Pregame') {
          animations.push({
            yootOutcome4PregameAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome4PregameAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome5Pregame') {
          animations.push({
            yootOutcome5PregameAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome5PregameAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome4') {
          animations.push({
            yootOutcome4AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome4AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome5') {
          animations.push({
            yootOutcome5AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome5AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'pregameTie') {
          animations.push({
            pregameTieAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            pregameTieAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'pregameUfosWin') {
          animations.push({
            pregameUfosWinAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            pregameUfosWinAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'pregameRocketsWin') {
          animations.push({
            pregameRocketsWinAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            pregameRocketsWinAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'catch') {
          animations.push({
            catchAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            catchAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1500
          })
        }
      }
      return animations
    }

    // score animation: piece movement without alert and twink
    // end with scaling down instead of scaling up and down
    // add score alert here
    // on rest, fire it
    // onStart of that alert, CreateRandomFirework with use hook
    // increase fireworks with number of finishes

    useEffect(() => {
      const toAnimations = transformAlertsToAnimations(alerts)
      if (!pieceAnimationPlaying) {
        api.start({
          from: {
            turnAlertScale: 0,
            gameStartAlertScale: 0,
            yootOutcome1AlertScale: 0,
            yootOutcome2AlertScale: 0,
            yootOutcome3AlertScale: 0,
            yootOutcome4PregameAlertScale: 0,
            yootOutcome5PregameAlertScale: 0,
            yootOutcome4AlertScale: 0,
            yootOutcome5AlertScale: 0,
            pregameTieAlertScale: 0,
            pregameUfosWinAlertScale: 0,
          },
          to: toAnimations,
          loop: false,
          onStart: () => setAnimationPlaying(true),
          onRest: () => setAnimationPlaying(false),
        })
      }
    }, [alerts, pieceAnimationPlaying])

    // make 'game start!' component and 'turn' component
    // useSpring to animate via scale

    function TurnAlert() {
      const [currentPlayerName] = useAtom(currentPlayerNameAtom)
      const [turn] = useAtom(turnAtom)
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]
      const nameRef = useRef();
      const nameContainerRef = useRef();
  
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.3
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
        
        if (nameRef.current && nameRef.current.geometry.boundingSphere) {
          const centerX = nameRef.current.geometry.boundingSphere.center.x
          nameContainerRef.current.position.z = -centerX
        }
      })

      return <animated.group scale={springs.turnAlertScale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[2, 0.055, 2.6]}
        >
          <meshStandardMaterial color='black' opacity={0.8} transparent/>
        </mesh>
        <group ref={nameContainerRef}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0,0,0]}
            size={0.6}
            height={0.1}
            ref={nameRef}
          >
            {formatName(currentPlayerName, 9)}
            <meshStandardMaterial color={ turn.team === 0 ? 'red': 'turquoise' }/>
          </Text3D>
        </group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[-0.7, 0, -1.5]}
          size={0.4}
          height={0.1}
        >
          your turn!
          <meshStandardMaterial color={ turn.team === 0 ? 'red': 'turquoise' }/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.3} color={ turn.team === 0 ? 'red': 'turquoise' }/>
        </group>
        <group ref={borderMesh1Ref}>
          { turn.team === 0 ? <Rocket 
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.4}
          /> : <Ufo
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
          scale={0.5}
          />}
        </group>
        <group ref={borderMesh2Ref}>
          { turn.team === 0 ? <Rocket 
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.4}
          /> : <Ufo
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
          scale={0.5}
          />}
        </group>
        <group ref={borderMesh3Ref}>
          { turn.team === 0 ? <Rocket 
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.4}
          /> : <Ufo
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
          scale={0.5}
          />}
        </group>
        <group ref={borderMesh4Ref}>
          { turn.team === 0 ? <Rocket 
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.4}
          /> : <Ufo
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
          scale={0.5}
          />}
        </group>
        <group ref={borderMesh5Ref}>
          { turn.team === 0 ? <Rocket 
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.4}
          /> : <Ufo
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
          scale={0.5}
          />}
        </group>
        <group ref={borderMesh6Ref}>
          { turn.team === 0 ? <Rocket 
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.4}
          /> : <Ufo
          position={[0, 0, 0]} 
          rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
          scale={0.5}
          />}
        </group>
      </animated.group>
    }

    function GameStartAlert() {
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.1
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
      })

      return <animated.group scale={springs.gameStartAlertScale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[2, 0.055, 2.6]}
        >
          <meshStandardMaterial color='black' opacity={0.8} transparent/>
        </mesh>
        <group>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0.2,0,-1.5]}
            size={0.7}
            height={0.1}
            lineHeight={0.8}
          >
            {`GAME\nSTART!`}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
          />
        </group>
      </animated.group>
    }

    function PregameTieAlert() {
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.1
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
      })

      return <animated.group scale={springs.pregameTieAlertScale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[2, 0.055, 2.6]}
        >
          <meshStandardMaterial color='black' opacity={0.8} transparent/>
        </mesh>
        <group>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[-0.1,0,-1.35]}
            size={1.2}
            height={0.1}
            lineHeight={0.8}
          >
            {`TIE!`}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[-1,0,-1.5]}
            size={0.5}
            height={0.1}
            lineHeight={0.8}
          >
            {`go again`}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
          />
        </group>
      </animated.group>
    }

    function PregameRocketsWinAlert() {
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.1
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
      })

      return <animated.group scale={springs.pregameRocketsWinAlertScale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[2, 0.055, 2.6]}
        >
          <meshStandardMaterial color='black' opacity={0.8} transparent/>
        </mesh>
        <group>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0.1,0,-1.6]}
            size={0.55}
            height={0.1}
            lineHeight={0.8}
          >
            {`ROCKETS\nGO FIRST!`}
            <meshStandardMaterial color='red'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
      </animated.group>
    }

    function PregameUfosWinAlert() {  
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.1
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
      })

      return <animated.group scale={springs.pregameUfosWinAlertScale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[2, 0.055, 2.6]}
        >
          <meshStandardMaterial color='black' opacity={0.8} transparent/>
        </mesh>
        <group>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0.2,0,-1.7]}
            size={0.6}
            height={0.1}
            lineHeight={0.8}
          >
            {`    UFOS\nGO FIRST!`}
            <meshStandardMaterial color='turquoise'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
      </animated.group>
    }

    function YootOutcome1Alert() {
      return <animated.group scale={springs.yootOutcome1AlertScale}>
        <DoAlert/>
      </animated.group>
    }
    function YootOutcome2Alert() {
      return <animated.group scale={springs.yootOutcome2AlertScale}>
        <GeAlert/>
      </animated.group>
    }
    function YootOutcome3Alert() {
      return <animated.group scale={springs.yootOutcome3AlertScale}>
        <GulAlert/>
      </animated.group>
    }
    function YootOutcome4PregameAlert() {
      return <animated.group scale={springs.yootOutcome4PregameAlertScale}>
        <YootAlertPregame/>
      </animated.group>
    }
    function YootOutcome5PregameAlert() {
      return <animated.group scale={springs.yootOutcome5PregameAlertScale}>
        <MoAlertPregame/>
      </animated.group>
    }
    function YootOutcome4Alert() {
      return <animated.group scale={springs.yootOutcome4AlertScale}>
        <YootAlert/>
      </animated.group>
    }
    function YootOutcome5Alert() {
      return <animated.group scale={springs.yootOutcome5AlertScale}>
        <MoAlert/>
      </animated.group>
    }


    function CatchAlert() {
      const [catchOutcome] = useAtom(catchOutcomeAtom)
      return <animated.group scale={springs.catchAlertScale}>
        { catchOutcome.numPieces === 1 && catchOutcome.teamCaught === 0 && <Catch1RocketAlert/> }
        { catchOutcome.numPieces === 2 && catchOutcome.teamCaught === 0 && <Catch2RocketAlert/> }
        { catchOutcome.numPieces === 3 && catchOutcome.teamCaught === 0 && <Catch3RocketAlert/> }
        { catchOutcome.numPieces === 4 && catchOutcome.teamCaught === 0 && <Catch4RocketAlert/> }
        { catchOutcome.numPieces === 1 && catchOutcome.teamCaught === 1 && <Catch1UfoAlert/> }
        { catchOutcome.numPieces === 2 && catchOutcome.teamCaught === 1 && <Catch2UfoAlert/> }
        { catchOutcome.numPieces === 3 && catchOutcome.teamCaught === 1 && <Catch3UfoAlert/> }
        { catchOutcome.numPieces === 4 && catchOutcome.teamCaught === 1 && <Catch4UfoAlert/> }
      </animated.group>
    }

    return (gamePhase === 'pregame' || gamePhase === 'game') && <group position={position} rotation={rotation}>
      <TurnAlert/>
      <GameStartAlert/>
      <PregameTieAlert/>
      <PregameRocketsWinAlert/>
      <PregameUfosWinAlert/>
      <YootOutcome1Alert/>
      <YootOutcome2Alert/>
      <YootOutcome3Alert/>
      <YootOutcome4PregameAlert/>
      <YootOutcome5PregameAlert/>
      <YootOutcome4Alert/>
      <YootOutcome5Alert/>
      <CatchAlert/>
    </group>
  }