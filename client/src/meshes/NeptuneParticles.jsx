import React from "react";
import * as THREE from "three";

function randomNumberBetween(min, max) {
  return min + Math.random() * (max - min);
}

const countNeptune1 = 350;
const countNeptune2 = 470;
const sizeNeptune = 0.07;
const radius1MinNeptune = 1.54;
const radius1MaxNeptune = 2.1;
const countSparkles1 = 50;
const radius2MinNeptune = 2.34;
const radius2MaxNeptune = 2.78;
const countSparkles2 = 100;
const colorOneHex = "#3289FF";
const colorTwoHex = "#6EF2FE";
const positions1 = new Float32Array(countNeptune1 * 3);
const positionsSparkles1 = new Float32Array(countSparkles1 * 3);
const positions2 = new Float32Array(countNeptune2 * 3);
const positionsSparkles2 = new Float32Array(countSparkles2 * 3);
const colors1 = new Float32Array(countNeptune1 * 3);
const colors2 = new Float32Array(countNeptune2 * 3);
const colorInitial = new THREE.Color(colorOneHex);
const colorFinal = new THREE.Color(colorTwoHex);
const textureLoader = new THREE.TextureLoader();
const pointsMap = textureLoader.load("/textures/particles/1.png");

for (let i = 0; i < countNeptune1; i++) {
  const i3 = i * 3;
  let radius1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);

  let angle = Math.random() * (Math.PI * 2);

  const randomX1 = Math.sin(angle) * radius1;
  const randomY1 = 0;
  const randomZ1 = Math.cos(angle) * radius1;

  positions1[i3] = randomX1;
  positions1[i3 + 1] = randomY1;
  positions1[i3 + 2] = randomZ1;

  if (i < countSparkles1) {
    positionsSparkles1[i3] = randomX1;
    positionsSparkles1[i3 + 1] = randomY1;
    positionsSparkles1[i3 + 2] = randomZ1;
  }
  const mixedColor = colorInitial.clone();
  mixedColor.lerp(colorFinal, Math.random());

  colors1[i3] = mixedColor.r;
  colors1[i3 + 1] = mixedColor.g;
  colors1[i3 + 2] = mixedColor.b;
}

for (let i = 0; i < countNeptune2; i++) {
  const i3 = i * 3;
  let radius2 = randomNumberBetween(radius2MinNeptune, radius2MaxNeptune);

  let angle = Math.random() * (Math.PI * 2);

  const randomX2 = Math.sin(angle) * radius2;
  const randomY2 = 0;
  const randomZ2 = Math.cos(angle) * radius2;

  positions2[i3] = randomX2;
  positions2[i3 + 1] = randomY2;
  positions2[i3 + 2] = randomZ2;

  if (i < countSparkles2) {
    positionsSparkles2[i3] = randomX2;
    positionsSparkles2[i3 + 1] = randomY2;
    positionsSparkles2[i3 + 2] = randomZ2;
  }

  const mixedColor = colorInitial.clone();
  mixedColor.lerp(colorFinal, Math.random());

  colors2[i3] = mixedColor.r;
  colors2[i3 + 1] = mixedColor.g;
  colors2[i3 + 2] = mixedColor.b;
}

function NeptuneParticles2() {
  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions1.length / 3}
            array={positions1}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors1.length / 3}
            array={colors1}
            itemSize={3}
            normalized
          />
        </bufferGeometry>
        <pointsMaterial
          color="white"
          size={sizeNeptune}
          sizeAttenuation
          transparent
          blending={THREE.AdditiveBlending}
          depthTest={false}
          alphaTest={0}
          map={pointsMap}
          vertexColors={true}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions2.length / 3}
            array={positions2}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors2.length / 3}
            array={colors2}
            itemSize={3}
            normalized
          />
        </bufferGeometry>
        <pointsMaterial
          color="white"
          size={sizeNeptune}
          sizeAttenuation
          transparent
          blending={THREE.AdditiveBlending}
          map={pointsMap}
          vertexColors={true}
          depthWrite={false}
          // depthTest={false}
          alphaTest={0}
        />
      </points>
    </group>
  );
}

export default function NeptuneParticles() {

  return NeptuneParticles2();
}
