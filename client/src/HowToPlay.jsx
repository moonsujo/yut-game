import { Float, MeshDistortMaterial, Text3D, useGLTF } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import HtmlElement from './HtmlElement';
import { useFrame, useThree } from '@react-three/fiber';
import Cursor from './meshes/Cursor';
import Earth from './meshes/Earth';
import Mars from './meshes/Mars';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import Moon from './meshes/Moon';
import Star from './meshes/Star';
import layout from './layout';
import Rocket from './meshes/Rocket';
import Pointer from './meshes/Pointer';
import { useSpring, animated } from '@react-spring/three';
import Cursor2 from './meshes/Cursor2';
import Check from './meshes/Check';
import System, {
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  PointZone,
  Vector3D,
  Alpha,
  Scale,
  Color,
  Body,
  RadialVelocity,
  SpriteRenderer,
  ColorSpan,
} from "three-nebula";
import * as THREE from 'three';
import Ufo from './meshes/Ufo';
import BonusTurn from './meshes/BonusTurn';
import ArrowBlender from './meshes/ArrowBlender';
import YootSet from './meshes/YootSet';


// skip to the next page when the loop finishes
export default function HowToPlay({ device }) {
  const [page, setPage] = useState(0)

  const [pageTimeout, setPageTimeout] = useState(null)
  useEffect(() => {
    clearTimeout(pageTimeout)
    if (page === 0) {
      const page1Timeout = setTimeout(() => {
        setPage(1)
      }, 9000)
      setPageTimeout(page1Timeout)
    } else if (page === 1) {
      const page2Timeout = setTimeout(() => {
        setPage(2)
      }, 12000)
      setPageTimeout(page2Timeout)
    } else if (page === 2) {
      const page3Timeout = setTimeout(() => {
        setPage(3)
      }, 14500)
      setPageTimeout(page3Timeout)
    } else if (page === 3) {
      const page4Timeout = setTimeout(() => {
        setPage(4)
      }, 14500)
      setPageTimeout(page4Timeout)
    } else if (page === 4) {
      const page5Timeout = setTimeout(() => {
        setPage(5)
      }, 17500)
      setPageTimeout(page5Timeout)
    } else if (page === 5) {
      const page6Timeout = setTimeout(() => {
        setPage(6)
      }, 23500)
      setPageTimeout(page6Timeout)
    } else if (page === 6) {
      const page0Timeout = setTimeout(() => {
        setPage(0)
      }, 14500)
      setPageTimeout(page0Timeout)
    }
  }, [page])
  function Page0() {
    
    const nodes = useGLTF("models/yoot-highlight.glb").nodes;
    const materials = useGLTF("models/yoot-highlight.glb").materials;
    const nodesRhino = useGLTF("models/yoot-rhino-highlight.glb").nodes;
    const materialsRhino = useGLTF("models/yoot-rhino-highlight.glb").materials;

    const NUM_YOOTS = 4;
    let yoots = [];
    for (let i = 0; i < NUM_YOOTS; i++) {
      yoots.push(useRef());
    }

    const [startTime, setStartTime] = useState(0)
    const yoot0Mat = useRef()
    const yoot1Mat = useRef()
    const yoot2Mat = useRef()
    const yoot3Mat = useRef()
    const textRef = useRef()
    const yootMats = [yoot0Mat, yoot1Mat, yoot2Mat, yoot3Mat]
    const loopTime = 10
    const [yootButtonTurnedOn, setYootButtonTurnedOn] = useState(true)
    const throwTime = 2
    const [thrown, setThrown] = useState(false)
    const effectTime = 2.2
    const [effect, setEffect] = useState(false)
    const record0Time = 5
    const [record0, setRecord0] = useState(false)
    const record1Time = 5.5
    const [record1, setRecord1] = useState(false)
    const record2Time = 6
    const [record2, setRecord2] = useState(false)
    const record3Time = 6.5
    const [record3, setRecord3] = useState(false)
    const textTime = 6.7
    const [text, setText] = useState(false)

    useFrame((state, delta) => {
      if (startTime === 0) {
        setStartTime(state.clock.elapsedTime)
      } else {
        if (startTime + loopTime > state.clock.elapsedTime) {
          if (startTime + throwTime < state.clock.elapsedTime && !thrown) {
            for (let i = 0; i < 4; i++) {
              yoots[i].current.setLinvel({ x: 0, y: 0, z: 0 })
              yoots[i].current.setAngvel({ x: 0, y: 0, z: 0 })
              yoots[i].current.setTranslation({ x: -2 + 0.8*i, y: 1, z: -2});
              yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
              yoots[i].current.applyImpulse({
                x: 0,
                y: 5,
                z: 0,
              });
              yoots[i].current.applyTorqueImpulse({
                x: 3,
                y: 0.003,
                z: 0.16 + i * 0.01,
              });
            }
            setYootButtonTurnedOn(false)
            setThrown(true)
            setEffect(true)
          } else if ((startTime + effectTime < state.clock.elapsedTime) && effect) {
            setEffect(false)
          } else if ((startTime + record0Time < state.clock.elapsedTime) && !record0) {
            yootMats[0].current.opacity = 1
            setRecord0(true)
          } else if ((startTime + record1Time < state.clock.elapsedTime) && !record1) {
            yootMats[1].current.opacity = 1
            setRecord1(true)
          } else if ((startTime + record2Time < state.clock.elapsedTime) && !record2) {
            yootMats[2].current.opacity = 1
            setRecord2(true)
          } else if ((startTime + record3Time < state.clock.elapsedTime) && !record3) {
            yootMats[3].current.opacity = 1
            setRecord3(true)
          } else if (startTime + textTime < state.clock.elapsedTime && !text) {
            setText(true)
          } else if (startTime + textTime < state.clock.elapsedTime) {
            textRef.current.scale.x = Math.cos(state.clock.elapsedTime * 3) * 0.3 + 1.5
            textRef.current.scale.y = Math.cos(state.clock.elapsedTime * 3) * 0.3 + 1.5
            textRef.current.scale.z = Math.cos(state.clock.elapsedTime * 3) * 0.3 + 1.5
          }
        } else {
          setStartTime(0);
          setThrown(false);
          for (let i = 0; i < 4; i++) {
            yoots[i].current.setTranslation({ x: -2 + 0.8*i, y: 1, z: -2});
            yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
          }
          setRecord0(false)
          yootMats[0].current.opacity = 0
          setRecord1(false)
          yootMats[1].current.opacity = 0
          setRecord2(false)
          yootMats[2].current.opacity = 0
          setRecord3(false)
          yootMats[3].current.opacity = 0
          setText(false)
          setYootButtonTurnedOn(true)
        }
      }
    })

    return <group name='how-to-play-page-0'>
      <group
        position={[0,0,-1]}
        rotation={[Math.PI/8, 0, 0]}
      >
        <HtmlElement
          text='1. Throw the yoot (dice).'
          position={[-4,0,-3]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='They way they lie determines'
          position={[-3.5,0,-2.4]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='how many steps to advance.'
          position={[-3.5,0,-1.8]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={26}
        />
      </group>
      <Physics>
        <RigidBody type="fixed">
          <CuboidCollider args={[20, 0.3, 20]} restitution={0.2} friction={1}/>
          <mesh>
            <boxGeometry args={[40, 0.6, 40]} />
            <meshStandardMaterial 
              transparent 
              color='yellow'
              opacity={0}
            />
          </mesh>
        </RigidBody>
        {yoots.map((ref, index) => {
          return (
            <RigidBody
              ref={ref}            
              position={[-2 + 0.8*index, 1, 2]}
              rotation={[0, Math.PI/2, 0]}
              colliders="hull"
              restitution={0.3}
              friction={0.6}
              name={`yoot${index}`}
              linearDamping={0.3}
              angularDamping={0.1} // when this value is high, yoots spin more
              scale={0.35}
              gravityScale={2}
              key={index}
            >
              {index != 0 ? (
                <group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder011.geometry}
                    material={materials["Texture wrap.008"]}
                    position={[0, 0.021, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[1, 6.161, 1]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={nodes.Plane.material}
                    rotation={[-Math.PI, 0, 0]}
                    scale={[4.905, 1, 0.455]}
                  >
                    <meshStandardMaterial 
                      color="white" 
                      transparent 
                      opacity={0}
                      ref={yootMats[index]}
                    />
                  </mesh>
                </group>
              ) : (
                <group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodesRhino.Cylinder007.geometry}
                    material={materialsRhino["Texture wrap.005"]}
                    position={[0, 0.022, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[1, 6.161, 1]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodesRhino.Plane001.geometry}
                    material={nodesRhino.Plane001.material}
                    rotation={[-Math.PI, 0, 0]}
                    scale={[4.892, 1, 0.443]}
                  >
                    <meshStandardMaterial 
                      color="white" 
                      transparent 
                      opacity={0}
                      ref={yootMats[index]}
                    />
                  </mesh>
                </group>
              )}
            </RigidBody>
          );
        })}
        { text && <Text3D
          position={[-5, 0.2, 0]}
          rotation={[-Math.PI/2,0,0]}
          font="/fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
          ref={textRef}
        >
          MOVE: 3
          <meshStandardMaterial color={ "green" }/>
        </Text3D>}
      </Physics>
      <YootButtonModel
        position={[3, 0, 2]}
        rotation={[Math.PI/16, Math.PI/2, Math.PI/32, "ZXY"]}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={[4, 0.3, 3.4]}
        rotation={[0, 0, 0]}
        scale={[3, 3, 0.1]}
        effect={effect}
      />
    </group>
  }

  function Page1() {
    const springs = useSpring({
      from: {
        cursorPos: [1, 0.3, 1],
        rocket3Scale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.4,
        pointerOpacity: 0,
        rocket3Pos: [0,0,0]
      },
      to: [
        {
          cursorPos: [-0.6, 0.3, -0.5],
          delay: 1000
        },
        {
          rocket3Scale: 2.5,
          cursorEffectOpacity: 1,
          legalTileScale: 0.8,
          pointerOpacity: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorPos: [2.2, 1.3, 2.3],
          delay: 800,
        },
        {
          cursorEffectOpacity: 1,
          rocket3Pos: [-0.7, 1.7, 4.5],
          rocket3Scale: 1,
          legalTileScale: 0.4,
          pointerOpacity: 0,
          delay: 1000,
          config: {
            tension: 0,
            friction: 1
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket3Pos: [0.5, 1.7, 4.2],
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: [1.5, 1.7, 3.7],
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: [2.4, 1.7, 3.1],
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })
    
    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 6; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i == 0) {
          tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
        } else {
          if (i === 3) {
            tiles.push(
              <group 
                position={position}
              >
                <Star
                  tile={i}
                  key={i}
                  scale={springs.legalTileScale}
                  device={device}
                />
                <Pointer color='red' position={[0,1.7,0]} scale={2.5} opacity={springs.pointerOpacity}/>
              </group>
            )
          } else {            
            tiles.push(
              <Star
                position={position}
                tile={i}
                key={i}
                scale={layout[device].star.scale}
                device={device}
              />
            )
          }
        }
      }
  
      return <group position={position}>
        { tiles }
      </group>;
    }
    
    const rocket0 = useRef()
    const rocket1 = useRef()
    const rocket2 = useRef()
    const rocket3 = useRef()
    const cursorRef = useRef()
    function HomePieces({ position }) {
      return <group position={position}>
        <group name='rocket-0' ref={rocket0}>
          <Rocket position={[-0.4,0,-0.7]} scale={1.5}/>
        </group>
        <group name='rocket-1' ref={rocket1}>
          <Rocket position={[0.8,0,-0.7]} scale={1.5}/>
        </group>
        <group name='rocket-2' ref={rocket2}>
          <Rocket position={[-0.4,0,0.5]} scale={1.5}/>
        </group>
        <animated.group name='rocket-3' ref={rocket3} position={springs.rocket3Pos}>
          <Rocket position={[0.8,0,0.5]} scale={springs.rocket3Scale} />
        </animated.group>
      </group>
    }
    function MoveDisplay({ position }) {
      return <Text3D
        position={position}
        rotation={[-Math.PI/2,0,0]}
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.5} 
        height={0.01}
      >
        MOVE: 3
        <meshStandardMaterial color={ "green" }/>
      </Text3D>
    }

    return <group name='how-to-play-page-1'>
      <HtmlElement
        text='2. Advance your piece.'
        position={[-3.5,0,-5]}
        rotation={[-Math.PI/8, 0, 0]}
        fontSize={26}
      />
      <FirstCornerTiles position={[-2, 0, -1.5]}/>
      <HomePieces position={[-2, 0, -2]}/>
      <MoveDisplay position={[-2.8, 0, 1.7]}/>
      <group ref={cursorRef}>
        <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>
    </group>
  }

  function Page2() {
    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
    
    const { scene } = useThree();
    const zone = new PointZone(0, 0);
    const colors = new ColorSpan()
    colors.shouldRandomize = true
    var map = new THREE.TextureLoader().load("textures/dot.png");
    var material = new THREE.SpriteMaterial({
      map: map,
      color: new THREE.Color("#FF2727"),
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    let sprite = new THREE.Sprite(material);
    const system = useRef()
    const emitter = useRef();
    
    const [fireStartTime, setFireStartTime] = useState(0)
    useEffect(() => {
      system.current = new System();
      const renderer = new SpriteRenderer(scene, THREE);
      system.current.addRenderer(renderer)

      emitter.current = new Emitter();
      emitter.current
        .setRate(new Rate(new Span(4, 8), new Span(0.2, 0.5)))
        .setInitializers([
          new Position(zone),
          new Mass(1, 3),
          new Radius(0.1),
          new Life(1, 1.7),
          new Body(sprite),
          new RadialVelocity(new Span(2, 2.3), new Vector3D(0, 3, 0), 180),
        ])
        .setBehaviours([
          new Alpha(5, 0), 
          new Scale(1, 1.3), 
          new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
        ])
      system.current.addEmitter(emitter.current)
    }, [fireStartTime])

    const loopTime = 15
    const fireTime = 9.5
    let fireInterval = 1
    let fireIntervalCumulative = 0
    let fireDuration = 4
    let center = {
      x: -1,
      y: 0,
      z: -4,
      xRange: 0.1,
      yRange: 0,
      zRange: 0.1
    }
    useFrame((state, delta) => {
      if (system.current !== undefined) {
        system.current.update();
        if (fireStartTime === 0) {
          setFireStartTime(state.clock.elapsedTime)
        } else {
          if (fireStartTime + loopTime > state.clock.elapsedTime) {
            if (fireStartTime + fireTime + fireIntervalCumulative < state.clock.elapsedTime) {
              if (fireStartTime + fireTime + fireDuration > state.clock.elapsedTime) {

                emitter.current.position.x = center.x + Math.random() * center.xRange + (Math.random() < 0.5 ? 1 : -1)
                emitter.current.position.y = center.y + Math.random() * center.yRange + (Math.random() < 0.5 ? 1 : -1)
                emitter.current.position.z = center.z + Math.random() * center.zRange + (Math.random() < 0.5 ? 1 : -1)
                  
                emitter.current.emit(2) // works when set to 2, but not 1
                fireIntervalCumulative += fireInterval
              }
            }
          } else {
            fireIntervalCumulative = 0
            setFireStartTime(0) // setting state re-renders component
          }
        }
      }
    })

    // place on top of tiles with .map
    // adjust neptune particle size
    function Tiles({ device, position, rotation, scale }) {
      const TILE_RADIUS = layout[device].tileRadius.ring
      const NUM_STARS = 20;
      let tiles = [];
      let rocket3AnimationsArray = []
      //circle
      for (let i = 0; i < NUM_STARS; i++) {
        if (i == 0 || i >= 5) {
          let position = [
            -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
            0,
            Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          ];
          if (i == 0) {
            tiles.push(<Earth position={position} key={i} device={device}/>);
          } else if (i == 5) {
            tiles.push(
              <Mars
                position={position}
                key={i}
                device={device}
              />
            );
          } else if (i == 10) {
            tiles.push(<Saturn position={position} key={i} device={device}/>);
          } else if (i == 15) {
            tiles.push(<Neptune position={position} key={i} device={device}/>);
          } else {
            tiles.push(
              <Star
                position={position}
                key={i}
                scale={layout[device].star.scale}
                device={device}
              />
            );
          }
          rocket3AnimationsArray.push(
            {
              rocket3Pos: [
                position[0]-0.4,
                position[1]+1.5,
                position[2]
              ],
              delay: 100,
              config: {
                tension: 300,
                clamp: true
              },
            },
          )
        }
      }

      // doesn't trigger re-render
      const springs = useSpring({
        from: {
          rocket3Pos: rocket3AnimationsArray[1].rocket3Pos,
          rocket3Scale: 1,
          tilesScale: 1,
          tilesPos: [0,0,-1],
          rocketHomeScale: 0,
          shortcutStarScale: layout[device].star.scale,
          moveScale: 0,
          scoreScale: 0,
          scoreColor: '#ffff00',
          cursorScale: 0,
          cursorPos: [1, 0, 4],
          cursorEffectOpacity: 0,
          checkmarkColor: '#808080',
          checkmarkScale: 0,
          letsGoScale: 0,
        },
        to: [
          ...rocket3AnimationsArray.slice(2), 
          rocket3AnimationsArray[0],
          {
            tilesScale: 1.5,
            tilesPos: [-2, 0, -4],
            rocketHomeScale: 1.3,
            checkmarkScale: 0.3,
            shortcutStarScale: 0,
            moveScale: 1,
            cursorScale: 2,
            delay: 500
          },
          {
            cursorPos: [0, 1.5, 5.8],
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            rocket3Scale: 1.5,
            scoreScale: 1,
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            delay: 200,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorPos: [0.3, 0.2, 3.9],
            scoreColor: '#ffffff',
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            scoreScale: 0,
            moveScale: 0,
            rocket3Scale: 0,
            checkmarkColor: '#ff0000',
            letsGoScale: 1,
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            delay: 200,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            delay: 20000,
          },
        ],
        loop: true
      })

      function HomePieces({ position }) {
        return <group position={position}>
          <group name='rocket-0'>
            <Rocket position={[-0.4,0,-0.7]} scale={springs.rocketHomeScale}/>
          </group>
          <group name='rocket-1'>
            <Rocket position={[0.8,0,-0.7]} scale={springs.rocketHomeScale}/>
          </group>
          <group name='rocket-2'>
            <Rocket position={[-0.4,0,0.5]} scale={springs.rocketHomeScale}/>
          </group>
          <Check 
            position={[0.6,0,1]} 
            rotation={[Math.PI/8, 0, 0]}
            scale={springs.checkmarkScale} 
            color={springs.checkmarkColor}
          />
        </group>
      }
      // add components that use springs
  
      //shortcuts
      const radiusShortcut1 = layout[device].tileRadius.shortcut1;
      const radiusShortcut2 = layout[device].tileRadius.shortcut2;
      for (let i = 0; i < NUM_STARS; i++) {
        let indexShortcut1;
        let indexShortcut2;
        if (i == 0) {
          indexShortcut1 = 24;
          indexShortcut2 = 23;
        } else if (i == 5) {
          indexShortcut1 = 28;
          indexShortcut2 = 27;
        } else if (i == 10) {
          indexShortcut1 = 20;
          indexShortcut2 = 21;
        } else if (i == 15) {
          indexShortcut1 = 25;
          indexShortcut2 = 26;
        }
        if (i == 0 || i == 5 || i == 10 || i == 15) {
          let position1 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
          ]
          tiles.push(
            <Star
              position={position1}
              tile={indexShortcut1}
              key={i + 30}
              scale={i == 5 ? springs.shortcutStarScale : layout[device].star.scale}
              device={device}
            />
          );
          let position2 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
          ]
          tiles.push(
            <Star
              position={position2}
              tile={indexShortcut2}
              key={i + 41}
              scale={i == 5 ? springs.shortcutStarScale : layout[device].star.scale}
              device={device}
            />
          );
        }
      }
      // center piece
      tiles.push(
        <Moon
          position={[0,0,0]}
          intensity={3}
          key={100}
          device={device}
        />
      );
      // shoot fireworks
      // change color on 'lets go' text into rainbow
      return <animated.group position={springs.tilesPos} rotation={rotation} scale={springs.tilesScale}>
        {tiles}
        <animated.group name='rocket-3' position={springs.rocket3Pos} scale={springs.rocket3Scale}>
          <Rocket/>
        </animated.group>
        <group name='rocket-home'>
          <HomePieces position={[-2, 0, 2]}/>
        </group>
        <animated.group scale={springs.moveScale}>
          <HtmlElement
            text='Move: 1'
            position={[-0.5,0,2]}
            rotation={[-Math.PI/8, -Math.PI/16, 0]}
            fontSize={26}
            color='green'
          />
        </animated.group>
        <animated.group scale={springs.letsGoScale}>
          <HtmlElement
            text="Let's"
            position={[-0.5,0,1.7]}
            rotation={[-Math.PI/8, -Math.PI/16, 0]}
            fontSize={26}
            color='yellow'
          />
          <HtmlElement
            text="GO!"
            position={[-0.5,0,2.4]}
            rotation={[-Math.PI/8, -Math.PI/16, 0]}
            fontSize={26}
            color='yellow'
          />
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json" 
            size={0.5} 
            height={0.01}
            position={[-0.5, 0, 3.5]}
            rotation={[-Math.PI/8, -Math.PI/16, 0]}
          >
            SCORE
            <AnimatedMeshDistortMaterial color={springs.scoreColor} distort={0}/>
          </Text3D>
        </animated.group>
        <group>
          <Cursor2
            position={springs.cursorPos}
            rotation={[0,0,0]}
            scale={springs.cursorScale}
            effectOpacity={springs.cursorEffectOpacity}
            effect={true}
          />
        </group>
      </animated.group>;
    }

    return <group>
      <HtmlElement
        text='3. The first team to'
        position={[1,0,0]}
        rotation={[-Math.PI/8, -Math.PI/16, 0]}
        fontSize={26}
      />
      <HtmlElement
        text='move four pieces'
        position={[1,0,1]}
        rotation={[-Math.PI/8, -Math.PI/16, 0]}
        fontSize={26}
      />
      <HtmlElement
        text='around the board'
        position={[1,0,2]}
        rotation={[-Math.PI/8, -Math.PI/16, 0]}
        fontSize={26}
      />
      <HtmlElement
        text='wins!'
        position={[1,0,3]}
        rotation={[-Math.PI/8, -Math.PI/16, 0]}
        fontSize={26}
      />      
      <Tiles device={device}/>
    </group>
  }

  // capture
  function Page3() {
    const springs = useSpring({
      from: {
        cursorPos: [1, 0.3, 1],
        rocketScale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.4,
        pointerOpacity: 0,
        rocketPos: [-2,2,3],
        ufoPos: [2, 1, 1.4],
        ufoScale: 1.5,
        moveTextScale: 1,
        bonusTurnScale: 0,
        yootButtonScale: 0,
      },
      to: [
        {
          cursorPos: [-0.5,2,4.5],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocketScale: 2.1,
          legalTileScale: 0.8,
          pointerOpacity: 1,
          ufoScale: 2,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
        },
        {
          cursorPos: [3,2,2.5],
          delay: 1000,
        },
        {
          cursorEffectOpacity: 1,
          rocketScale: 1.5,
          legalTileScale: 0.4,
          pointerOpacity: 0,
          ufoScale: 1.5,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocketPos: [-1,2,3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: [0.3,2,2.3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: [1.5,2,1.5],
          ufoPos: [8, -3, -5],
          ufoScale: 0,
          config: {
            tension: 60,
            friction: 26
          }
        },
        {
          moveTextScale: 0,
          bonusTurnScale: 2,
          yootButtonScale: 1
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 4; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 3) {
          tiles.push(
            <group 
              position={position}
            >
              <Star
                tile={i}
                key={i}
                scale={springs.legalTileScale}
                device={device}
              />
              <Pointer color='red' position={[-0.3,2.5,0]} scale={2} opacity={springs.pointerOpacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].star.scale}
              device={device}
            />
          )
        }
      }
  
      return <group position={position}>
        { tiles }
      </group>;
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group>
      <group name='text' position={[-3.5,0,-5]}>
        <HtmlElement
          text='4. If you move into a tile with'
          position={[0,0,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text=' an enemy, it will be captured.'
          position={[0,-1,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='You will get an extra turn.'
          position={[0,-2,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
      </group>

      <FirstCornerTiles position={[-1, 0, -1]}/>
      <animated.group name='rocket' position={springs.rocketPos}>
        <Rocket position={[0.8,0,0.5]} scale={springs.rocketScale} />
      </animated.group>
      <animated.group name='ufo' position={springs.ufoPos}>
        <Ufo position={[0.8,0,0.5]} scale={springs.ufoScale} />
      </animated.group>
      <animated.group scale={springs.moveTextScale}>
        <Text3D
          position={[-2, 0, 1]}
          rotation={[-Math.PI/2,0,0]}
          font="/fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          MOVE: 3
          <meshStandardMaterial color={ "green" }/>
        </Text3D>
      </animated.group>
      <group>
        <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>
      <BonusTurn rotation={[Math.PI/4 - Math.PI/16, Math.PI/2, 0]} position={[-3, 0, 0.5]} scale={springs.bonusTurnScale}/>
      <Float>
        <animated.group scale={springs.yootButtonScale}>
          <YootButtonModel rotation={[Math.PI/4 - Math.PI/16, Math.PI/2, 0]} position={[0.5, 0, 0.5]} turnedOn={true}/>
        </animated.group>
      </Float>
    </group>
  }

  // combine
  function Page4() {    
    const springs = useSpring({
      from: {
        cursorPos: [1, 0.3, 3],
        rocket0Scale: 1.2,
        rocket1Scale: 1.2,
        cursorEffectOpacity: 0,
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        pointer0Opacity: 0,
        pointer1Opacity: 0,
        rocket0Pos: [
          -Math.cos(((-1+5) * (Math.PI * 2)) / 20) * 5 -1,
          0 + 1.5,
          Math.sin(((-1+5) * (Math.PI * 2)) / 20) * 5 -1,
        ],
        rocket1Pos: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 -1,
          0 + 1.5,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5 -1,
        ],
        moveText0Scale: 1,
        moveText1Scale: 0,
        bonusTurnScale: 0,
        yootButtonScale: 0,
      },
      to: [
        {
          cursorPos: [-1.2,2,5.5],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile0Scale: 0.6,
          pointerOpacity: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
        },
        {
          cursorPos: [2.8,2,5],
          delay: 1000,
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile0Scale: 0.4,
          pointer0Opacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5 -1,
            0 + 1.5,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5 -1,
            0 + 1.5,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 -1.3,
            0 + 1.5,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          rocket1Pos: [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 -0.7,
            0 + 1.5,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          cursorPos: [6, 0.3, 1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          moveText0Scale: 0,          
          moveText1Scale: 1,
        },
        {
          cursorPos: [2.8,2,5],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile1Scale: 0.6,
          pointer1Opacity: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
        },
        {
          cursorPos: [4, 2, 3],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile1Scale: 0.4,
          pointer1Opacity: 0,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          cursorPos: [6, 0.3, 1],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5 -1.3,
            0 + 1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          rocket1Pos: [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5 -0.7,
            0 + 1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5 -1.3,
            0 + 1.5,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          rocket1Pos: [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5 -0.7,
            0 + 1.5,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5 -1,
          ],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = -1; i < 5; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 2) {
          tiles.push(
            <group 
              position={position}
            >
              <Star
                key={i}
                scale={springs.legalTile0Scale}
                device={device}
              />
              <Pointer color='red' position={[-0.3,2.5,0]} scale={2} opacity={springs.pointer0Opacity}/>
            </group>
          )
        } else if (i === 4) {
          tiles.push(
            <group
            position={position}>
              <Mars
                key={i}
                scale={springs.legalTile1Scale}
                device={device}
              />
              <Pointer color='red' position={[-0.3,1.7,0]} scale={2.3} opacity={springs.pointer1Opacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              key={i}
              scale={layout[device].star.scale}
              device={device}
            />
          )
        }
      }
  
      return <group position={position}>
        { tiles }
        <animated.group name='rocket-0' position={springs.rocket0Pos}>
          <Rocket position={[0.8,0,0.5]} scale={springs.rocket0Scale} />
        </animated.group>
        <animated.group name='rocket-1' position={springs.rocket1Pos}>
          <Rocket position={[0.8,0,0.5]} scale={springs.rocket1Scale} />
        </animated.group>
        <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>;
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group>
      <group name='text' position={[-3.5,0,-5]}>
        <HtmlElement
          text='5. If you move a piece into a tile'
          position={[0,0,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='with your own, the pieces will'
          position={[0,-1,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='move together on the next turn.'
          position={[0,-2,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
      </group>
      <FirstCornerTiles position={[-1, 0, -1]}/>
      <animated.group scale={springs.moveText0Scale}>
        <Text3D
          position={[-2, 0, 1]}
          rotation={[-Math.PI/2,0,0]}
          font="/fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          MOVE: 3, 2
          <meshStandardMaterial color={ "green" }/>
        </Text3D>
      </animated.group>
      <animated.group scale={springs.moveText1Scale}>
        <Text3D
          position={[-2, 0, 1]}
          rotation={[-Math.PI/2,0,0]}
          font="/fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          MOVE: 2
          <meshStandardMaterial color={ "green" }/>
        </Text3D>
      </animated.group>
    </group>
  }
  
  function Page5() {
    const springs = useSpring({
      from: {
        cursorPos: [1, 0.3, 3],
        cursorScale: [0,0,0],
        cursorEffectOpacity: 0,
        rocket0Scale: 1.2,
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        legalTile2Scale: 0.4,
        legalTile3Scale: 0.4,
        pointer0Scale: 0,
        pointer1Scale: 0,
        pointer2Scale: 0,
        pointer3Scale: 0,
        pointer4Scale: 0,
        rocket0Pos: [
          -Math.cos(((5+5) * (Math.PI * 2)) / 20) * 5 -1,
          0 + 1.5,
          Math.sin(((5+5) * (Math.PI * 2)) / 20) * 5 -1,
        ],
        scoreScale: 0,
        tilesScale: 0.6,
        tilesPos: [0,0,1.5],
        tilesRotation: [0,0,0],
        ruleTextScale: 1,
        noteTextScale: 0,
        moveTextScale: 0,
      },
      to: [
        {
          rocket0Pos: [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
          ],
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            0 - 1,
            1.5,
            0 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            0 - 1,
            2.5,
            0 - 1,
          ],
          rocket0Scale: 1.8,
          legalTile0Scale: 0.6,
          pointer0Scale: 1.5,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
          ],
          rocket0Scale: 1.2,
          legalTile0Scale: 0.4,
          pointer0Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
          ],
          rocket0Scale: 1.2,
          legalTile0Scale: 0.4,
          pointer0Scale: 0,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          rocket0Scale: 1.2,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: 0,
          delay: 500,
          scoreScale: 1,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          rocket0Scale: 1.2,
          scoreScale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((13 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((13 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((14 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((14 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: 1.6,
          rocket0Pos: [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            2.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          legalTile1Scale: 0.6,
          pointer1Scale: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: 1.2,
          rocket0Pos: [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
          ],
          legalTile1Scale: 0.4,
          pointer1Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [-1,1.5,-1,],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 1,
          rocket0Scale: 0,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 0,
          rocket0Scale: 1.4,
          rocket0Pos: [
            Math.sin(((8 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((8 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          tilesScale: 1,
          tilesPos: [-3, 0, -1.5],
          tilesRotation: [Math.PI/8, -Math.PI/4, 0],
          ruleTextScale: 0,
          noteTextScale: 1,
          cursorPos: [3, 0, 5],
          cursorScale: [2, 2, 2],
          moveTextScale: 1,
          delay: 1000
        },
        {
          cursorPos: [-1.9, 0, 4],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.9,
          legalTile2Scale: 0.4,
          legalTile3Scale: 0.8,
          pointer2Scale: 1,
          pointer3Scale: 1,
          pointer4Scale: 2.5,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: 1.4,
          rocket0Pos: [
            Math.sin(((9 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((9 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 2000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((11 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((11 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5 - 1,
          ],
          pointer4Scale: 0,
          legalTile3Scale: 0.4,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          delay: 5000
        }
      ],
      config: {

      },
      loop: true
    })


    function Tiles(props) {
      const TILE_RADIUS = layout[device].tileRadius.ring
      const NUM_STARS = 20;
      let tiles = [];
  
      //circle
      for (let i = 0; i < NUM_STARS; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i == 0) {
          tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
        } else if (i == 3) {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={springs.legalTile2Scale}
              device={device}
            />
          );
        } else if (i == 7) {
          tiles.push(
            <group>
              <Star
                position={position}
                tile={i}
                key={i}
                scale={springs.legalTile3Scale}
                device={device}
              />
              <Pointer color='red' position={[position[0], position[1] + 2, position[2]]} scale={springs.pointer4Scale}/>
            </group>
          );
        } else if (i == 5) {
          tiles.push(
            <Mars
              position={position}
              tile={i}
              key={i}
              device={device}
            />
          );
        } else if (i == 10) {
          tiles.push(
            <Saturn position={position} scale={springs.legalTile1Scale} tile={i} key={i} device={device}/>
          );
        } else if (i == 15) {
          tiles.push(<Neptune position={position} tile={i} key={i} device={device}/>);
        } else {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].star.scale}
              device={device}
            />
          );
        }
      }
  
      //shortcuts
      const radiusShortcut1 = layout[device].tileRadius.shortcut1;
      const radiusShortcut2 = layout[device].tileRadius.shortcut2;
      for (let i = 0; i < NUM_STARS; i++) {
        let indexShortcut1;
        let indexShortcut2;
        if (i == 0) {
          indexShortcut1 = 24;
          indexShortcut2 = 23;
        } else if (i == 5) {
          indexShortcut1 = 28;
          indexShortcut2 = 27;
        } else if (i == 10) {
          indexShortcut1 = 20;
          indexShortcut2 = 21;
        } else if (i == 15) {
          indexShortcut1 = 25;
          indexShortcut2 = 26;
        }
        if (i == 0 || i == 5 || i == 10 || i == 15) {
          let position1 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
          ]
          tiles.push(
            <Star
              position={position1}
              tile={indexShortcut1}
              key={i + 30}
              scale={layout[device].star.scale}
              device={device}
            />
          );
          let position2 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
          ]
          tiles.push(
            <Star
              position={position2}
              tile={indexShortcut2}
              key={i + 41}
              scale={layout[device].star.scale}
              device={device}
            />
          );
        }
      }
      // center piece
      tiles.push(
        <Moon
          position={[0,0,0]}
          intensity={3}
          key={100}
          tile={22}
          device={device}
          scale={springs.legalTile0Scale}
        />
      );
      return <animated.group {...props}>
        {tiles}
        <animated.group name='rocket-0' position={springs.rocket0Pos}>
          <Rocket position={[0.8,0,0.5]} scale={springs.rocket0Scale} />
        </animated.group>
        <animated.group name='moon-arrow' scale={springs.pointer0Scale}>
          <ArrowBlender
            position={[0, 0.5, 1.5]}
            rotation={[0, -Math.PI/2, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group name='saturn-arrow' scale={springs.pointer1Scale}>
          <ArrowBlender
            position={[0, 0.5, -3.5]}
            rotation={[0, -Math.PI/2, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group name='mars-arrow-wrong' scale={springs.pointer2Scale}>
          <ArrowBlender
            position={[3.5, 0.5, 0]}
            rotation={[0, -Math.PI, 0]}
            scale={0.5}
            color='grey'
          />
        </animated.group>
        <animated.group name='mars-arrow-correct' scale={springs.pointer3Scale}>
          <ArrowBlender
            position={[4.6, 0.5, -1.5]}
            rotation={[0, -Math.PI/8 * 11, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json" 
            size={0.5} 
            height={0.01}
            position={[-1, 2, 4]}
            rotation={[-Math.PI/8, -Math.PI/16, 0]}
          >
            SCORE!
            <meshStandardMaterial color='green'/>
          </Text3D>
        </animated.group>
      </animated.group>;
    }

    return <group>
      <animated.group name='text' position={[-3.5,0,-7]} scale={springs.ruleTextScale}>
        <HtmlElement
          text='6. When you start a move'
          position={[0,0,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text=' from a planet or the Moon,'
          position={[0,-1,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text=' you can take a shortcut.'
          position={[0,-2,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
      </animated.group>
      <animated.group name='note-text' position={[2,0,2]} rotation={[-Math.PI/4, 0, 0]} scale={springs.noteTextScale}>
        <HtmlElement
          text='NOTE:'
          position={[0,0,0]}
          fontSize={20}
        />
        <HtmlElement
          text='You cannot bend in'
          position={[0,-0.5,0]}
          fontSize={20}
        />
        <HtmlElement
          text=' the middle of a move.'
          position={[0,-1,0]}
          fontSize={20}
        />
      </animated.group>
      <animated.group name='move-text' position={[-3,0,2.5]} rotation={[-Math.PI/4, 0, 0]} scale={springs.moveTextScale}>
        <HtmlElement
          text='move: 4'
          position={[0,-2,0]}
          fontSize={20}
          color='green'
        />
      </animated.group>
      <Cursor2
        position={springs.cursorPos}
        rotation={[0,0,0]}
        scale={springs.cursorScale}
        effectOpacity={springs.cursorEffectOpacity}
        effect={true}
      />
      <Tiles position={springs.tilesPos} rotation={springs.tilesRotation} scale={springs.tilesScale}/>
    </group>
  }

  // lay out outcomes on top
  // title
  // meaning
  // shape
  // bonus turn
  function Page6() {
    return <group>
      <animated.group name='text' position={[-3.5,0,-7]}>
        <HtmlElement
          text='7. How to read the yoot (dice) throw'
          position={[-1,0,0]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
      </animated.group>
      <group position={[-3.5, 0, -1]} scale={0.8}>        
        <HtmlElement
          text='"DO"'
          position={[-0.2,0,-3.8]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='1 Step'
          position={[-0.2,0,-2.8]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <YootSet points="do" scale={0.4}/>
      </group>
      <group position={[0, 0, -1]} scale={0.8}>        
        <HtmlElement
          text='"GE"'
          position={[-0.2,0,-3.8]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='2 steps'
          position={[-0.2,0,-2.8]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <YootSet points="ge" scale={0.4}/>
      </group>
      <group position={[3.5, 0, -1]} scale={0.8}>        
        <HtmlElement
          text='"GULL"'
          position={[-0.2,0,-3.8]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='3 steps'
          position={[-0.2,0,-2.8]}
          rotation={[-Math.PI/8, 0, 0]}
          fontSize={26}
        />
        <YootSet points="girl" scale={0.4}/>
      </group>
      <group position={[-3.5, 0, 4]} scale={0.7}>        
        <HtmlElement
          text='"YOOT"'
          position={[-0.2,0,-3.8]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='4 steps'
          position={[-0.2,0,-3.0]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='bonus turn'
          position={[-0.2,0,-2.2]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <YootSet points="yoot" scale={0.4}/>
      </group>
      <group position={[0, 0, 4]} scale={0.7}>        
        <HtmlElement
          text='"MO"'
          position={[-0.2,0,-3.8]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='5 steps'
          position={[-0.2,0,-3.0]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='bonus turn'
          position={[-0.2,0,-2.2]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <YootSet points="mo" scale={0.4}/>
      </group>
      <group position={[3.5, 0, 4]} scale={0.7}>        
        <HtmlElement
          text='"BACKDO"'
          position={[-0.2,0,-3.8]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='-1 step'
          position={[-0.2,0,-3.0]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='backward'
          position={[-0.2,0,-2.2]}
          rotation={[-Math.PI/4, 0, 0]}
          fontSize={26}
        />
        <YootSet points="backdo" scale={0.4}/>
      </group>
    </group>
  }

  function Pagination() {
    function handlePageLeft() {
      setPage(page => {
        if (page === 0) {
          return 2
        } else {
          return page-1
        }
      })
    }
    
    function handlePageRight() {
      setPage(page => {
        if (page === 2) {
          return 0
        } else {
          return page+1
        }
      })
    }

    function handlePage0() {
      setPage(0)
    }
    function handlePage1() {
      setPage(1)
    }
    function handlePage2() {
      setPage(2)
    }
    function handlePage3() {
      setPage(3)
    }
    function handlePage4() {
      setPage(4)
    }
    function handlePage5() {
      setPage(5)
    }
    function handlePage6() {
      setPage(6)
    }

    return <group name='pagination'>
      <mesh position={[-4, 0, 6]} rotation={[0, 0, Math.PI/2]} onPointerUp={handlePageLeft}>
        <coneGeometry args={[0.2, 0.4, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh position={[-3, 0, 6]} onPointerUp={handlePage0}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 0 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[-2, 0, 6]} onPointerUp={handlePage1}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 1 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[-1, 0, 6]} onPointerUp={handlePage2}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 2 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[-0, 0, 6]} onPointerUp={handlePage3}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 3 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[1, 0, 6]} onPointerUp={handlePage4}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 4 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[2, 0, 6]} onPointerUp={handlePage5}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 5 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[3, 0, 6]} onPointerUp={handlePage6}>
        <sphereGeometry args={[0.2, 32, 16]}/>
        <meshStandardMaterial color={ page === 6 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[4, 0, 6]} rotation={[0, 0, -Math.PI/2]} onPointerUp={handlePageRight}>
      <coneGeometry args={[0.2, 0.4, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
    </group>
  }

  const pages = [<Page0/>, <Page1/>, <Page2/>, <Page3/>, <Page4/>, <Page5/>, <Page6/>]

  return <>
    {pages[page]}
    <Pagination/>
  </>
}