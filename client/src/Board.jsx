import React from 'react';
import Tile from './components/Tile'
import { animated } from '@react-spring/three';
import Star from './meshes/Star';
import Earth from './meshes/Earth';
import Mars from './meshes/Mars';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import Moon from './meshes/Moon';
import layout from './layout';
import { Text3D } from '@react-three/drei';
import { WolfConstellation } from './meshes/WolfConstellation';
import { RhinoConstellation } from './meshes/RhinoConstellation';
import { TaurusConstellation } from './meshes/TaurusConstellation';
import { AriesConstellation } from './meshes/AriesConstellation';
import CurvedArrow from './meshes/CurvedArrow';



export default function Board({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tiles=[], // Must be defined
  legalTiles={},
  helperTiles={},
  showStart=false, 
  interactive=false,
  device="landscapeDesktop",
  constellations=true,
  omit=false,
  showTiles=[],
  showArrows=true,
  starColor='yellow',
  highlightShortcuts=false
}) {
  const tileRadius = 5
  const NUM_STARS = 20;
  let tileComponents = [];

  function getMeshByTile(tile) {
    if (tile == 0) {
      return <Earth scale={0.45}/>
    } else if (tile == 5) {
      return <Mars scale={!highlightShortcuts ? 0.4 : 0.55}/>
    } else if (tile == 10) {
      return <Saturn scale={!highlightShortcuts ? 0.4 : 0.55}/>
    } else if (tile == 15) {
      return <Neptune scale={0.4}/>
    } else if (tile == 22) {
      return <Moon scale={!highlightShortcuts ? 0.35 : 0.42} shiny/>
    } else if (tile == 1) {
      return <Star scale={0.4} color={starColor}/>
      // return <Star scale={0.4} color='limegreen'/>
    } else {
      return <Star scale={0.4} color={starColor}/>
    }
  }

  // Circle
  for (let i = 0; i < NUM_STARS; i++) {
    let position = [
      -Math.cos(((i + 5) * (Math.PI * 2)) / NUM_STARS) * tileRadius,
      0,
      Math.sin(((i + 5) * (Math.PI * 2)) / NUM_STARS) * tileRadius,
    ];
    tileComponents.push(
      <Tile 
        position={position} 
        tile={i} 
        pieces={tiles[i]}
        legalTileInfo={legalTiles[i]}
        pathNum={helperTiles[i]}
        key={i} 
        mesh={getMeshByTile(i)}
        interactive={interactive}
      />
    );
  }

  // Shortcuts
  const radiusShortcut1 = 3.4;
  const radiusShortcut2 = 1.7;

  let position20 = [
    Math.sin(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position20} 
      scale={1} 
      tile={20} 
      pieces={tiles[20]}
      legalTileInfo={legalTiles[20]}
      pathNum={helperTiles[20]}
      key={20} 
      mesh={getMeshByTile(20)}
      interactive={interactive}
    />
  );
  let position21 = [
    Math.sin(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position21} 
      scale={1} 
      tile={21} 
      pieces={tiles[21]}
      legalTileInfo={legalTiles[21]}
      pathNum={helperTiles[21]}
      key={21} 
      mesh={getMeshByTile(21)}
      interactive={interactive}
    />
  );

  // center piece
  const centerTile = 22
  tileComponents.push(
    <Tile 
      position={[0,0,0]} 
      scale={1} 
      tile={centerTile} 
      pieces={tiles[centerTile]}
      legalTileInfo={legalTiles[centerTile]}
      pathNum={helperTiles[centerTile]}
      key={centerTile} 
      mesh={getMeshByTile(centerTile)}
      interactive={interactive}
    />
  );

  let position23 = [
    Math.sin(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position23} 
      scale={1} 
      tile={23} 
      pieces={tiles[23]}
      legalTileInfo={legalTiles[23]}
      pathNum={helperTiles[23]}
      key={23} 
      mesh={getMeshByTile(23)}
      interactive={interactive}
    />
  );
  let position24 = [
    Math.sin(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position24} 
      scale={1} 
      tile={24} 
      pieces={tiles[24]}
      legalTileInfo={legalTiles[24]}
      pathNum={helperTiles[24]}
      key={24} 
      mesh={getMeshByTile(24)}
      interactive={interactive}
    />
  );
  let position25 = [
    Math.sin(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position25} 
      scale={1} 
      tile={25} 
      pieces={tiles[25]}
      legalTileInfo={legalTiles[25]}
      pathNum={helperTiles[25]}
      key={25} 
      mesh={getMeshByTile(25)}
      interactive={interactive}
    />
  );
  let position26 = [
    Math.sin(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position26} 
      scale={1} 
      tile={26} 
      pieces={tiles[26]}
      legalTileInfo={legalTiles[26]}
      pathNum={helperTiles[26]}
      key={26} 
      mesh={getMeshByTile(26)}
      interactive={interactive}
    />
  );
  let position27 = [
    Math.sin(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position27} 
      scale={1} 
      tile={27} 
      pieces={tiles[27]}
      legalTileInfo={legalTiles[27]}
      pathNum={helperTiles[27]}
      key={27} 
      mesh={getMeshByTile(27)}
      interactive={interactive}
    />
  );
  let position28 = [
    Math.sin(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position28} 
      scale={1} 
      tile={28} 
      pieces={tiles[28]}
      legalTileInfo={legalTiles[28]}
      pathNum={helperTiles[28]}
      key={28} 
      mesh={getMeshByTile(28)}
      interactive={interactive}
    />
  );
  // position 29
  const finishMarkerRadius = 3.5
  tileComponents.push(
    <group name='finish-marker' key={29} scale={1.67}>
      { /* <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (20/32)), 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (20/32)), 
        ]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (21/32)), 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (21/32)), 
        ]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (22/32)), 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (22/32)), 
        ]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (23/32)), 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (23/32)), 
        ]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh> */}
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (24/32))+0.19, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (24/32)), 
        ]}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (25/32))+0.17, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (25/32))-0.04, 
        ]}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (26/32))+0.13, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (26/32))-0.05, 
        ]}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (27/32))+0.08, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (27/32))-0.02, 
        ]}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (28/32))+0.02, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (28/32))+0.03, 
        ]}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (29/32))-0.05, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (29/32))+0.1, 
        ]}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
      <mesh name='arrow' rotation={[0, Math.PI * 2 * 4/32, 0]}
        position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (30/32))-0.1, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (30/32))+0.2, 
        ]}>
        <cylinderGeometry args={[0, 0.1, 0.01, 3]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh >
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].board.finish.text.position}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.25}
        height={0.01}
      >
        FINISH
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <group name='finish-pad'>
        <mesh name='finish-pad-background-inner' position={[0, 0, 3.9]}>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh name='finish-pad-background-outer' position={[0, 0, 3.9]}>
          <cylinderGeometry args={[0.28, 0.28, 0.011, 32]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Star scale={0.22} color='limegreen' position={[0, -0.03, 3.9]}/>
      </group>
    </group>)

  const selectTileComponents = []
  if (omit) {
    for (const i of showTiles) {
      selectTileComponents.push(tileComponents[i])
    }
  }

  // arrow: sphere geometries
  // add a star after Earth
  // color the 'start' star in info-green
  return <animated.group position={position} rotation={rotation} scale={scale}>
    {!omit && tileComponents}
    {omit && selectTileComponents}
    {showStart && <group 
      position={layout[device].board.startEarth.position} 
      scale={1.67}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].board.startEarth.text.position}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.25}
        height={0.01}
      >
        Start
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <mesh scale={[0.07, 0.25, 0.07]} position={[-0.15, 0, -0.65]} rotation={[Math.PI/2, 0, -Math.PI/2 - Math.PI/32 * 6]}>
        <coneGeometry args={[1, 1, 3]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
    </group>}
    { showArrows && <group name='helper-arrows'>
      <mesh name='mars-top' position={[4.8, 0, -1]} rotation={[Math.PI/2, 0, Math.PI - Math.PI/32]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='mars-left' position={[4, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='saturn-left' position={[-1, 0, -4.9]} rotation={[Math.PI/2, 0, Math.PI/2 - Math.PI/32]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='saturn-bottom' position={[0, 0, -4]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='neptune-bottom' position={[-4.9, 0, 0.9]} rotation={[Math.PI/2, 0, -Math.PI/32]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='moon-bottom' position={[0, 0, 1.1]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='moon-left' position={[-1.1, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
    </group>}
    { constellations && <WolfConstellation position={[-2.1,0,-1.2]} rotation={[-Math.PI/2, 0, 0]} scale={0.85}/> }
    { constellations && <RhinoConstellation position={[2.1,0,-1.3]} rotation={[-Math.PI/2, 0, 0]} scale={0.8}/> }
    { constellations && <AriesConstellation position={[-2.3,0,4.1]} rotation={[-Math.PI/2, 0, 0]} scale={0.75}/> }
    { constellations && <TaurusConstellation position={[2.3, 0, 3.5]} scale={0.8} rotation={[-Math.PI/2, 0, Math.PI/16]}/> }
  </animated.group>;
}