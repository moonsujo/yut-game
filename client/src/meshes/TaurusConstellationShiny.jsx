import React, {useRef, useMemo} from 'react'
import {useFrame, useLoader, useThree} from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import System from 'three-nebula'
import { TextureLoader } from 'three/src/loaders/TextureLoader'



const vertexShader = `
  varying vec2 vUv;
  varying vec3 Position;
  varying vec3 EyeVector;
  varying vec3 Normal;
  varying vec3 vNN;

  uniform float extrudeVal;

  void main() {
    vUv = uv;
    Normal = normal;
    
    EyeVector = normalize(vec3(modelViewMatrix * vec4(position,1.0)).xyz);
    vNN = normalize(normalMatrix*normal);
    Position = vec3(modelViewMatrix * vec4(position+(normal*extrudeVal), 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position+(normal*extrudeVal), 1.0);
  }
`;

const lightVertexShader = `
  varying vec3 Normal;
  varying vec3 Position;

  void main() {
    Normal = normalize(normalMatrix * normal);
    Position = position; //vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const lightFragmentShader = `
  varying vec3 Normal;
  varying vec3 Position;

  uniform float time;
  uniform vec3 baseColor;
  uniform float glistenSpeed;
  uniform float glistenColorMultiplier;
  uniform float glistenScale;
  uniform sampler2D lightTexture;
  uniform float colorMultiplier;
  uniform sampler2D maskTexture;
  uniform float scale;

  void main(){
    vec2 uv = Position.xy;
    vec2 texUV = uv;
    texUV.x = (uv.x+1.0)/2.0;
    texUV.y = (uv.y+1.0)/2.0;
    
    float glistenColor = ((sin(((Position.x * glistenScale)/67.0)-time*glistenSpeed*2.1)+1.0)/2.0);
    float glistenColor2 = ((cos(((Position.y * glistenScale)/140.0)-time*glistenSpeed*1.0)+1.0)/2.0);
    float glistenColor3 = ((sin(((Position.x * glistenScale)/76.0)+time*glistenSpeed*1.9)+1.0)/2.0);
    float glistenColor4 = ((cos(((Position.y * glistenScale)/80.0)+time*glistenSpeed*0.9)+1.0)/2.0);
    glistenColor = (glistenColor+glistenColor2+glistenColor3+glistenColor4)/20.0;
    float alpha = texture2D(maskTexture,texUV).a;
    float multiplier = max(1.0,colorMultiplier);
    float r = (1.-length(uv))* multiplier;
    vec3 result = vec3(baseColor.r + glistenColor, baseColor.g + glistenColor, baseColor.b + glistenColor);
    gl_FragColor = vec4((result*multiplier),alpha);
  }

`

const fragmentFreshnellShader =  `

  varying vec2 vUv;
  varying vec3 Position;
  varying vec3 EyeVector;
  varying vec3 Normal;
  varying vec3 vNN;

  float Freshnel(vec3 eyeVector, vec3 worldNormal){
    return pow(-min(dot(eyeVector,normalize(worldNormal)),0.0),5.0);
  }

  void main(){
    float brightness = Freshnel(EyeVector, vNN) * 1.2;
    float mask = Freshnel(EyeVector,vNN) * 0.7;
    mask = 1.-mask;
    //brightness += pow(brightness,1.);
    gl_FragColor = vec4(brightness * 0.5,brightness*0.5,brightness,brightness * mask * 2.);
  }

`;

const fragmentShader = `

  uniform float time;
  uniform vec4 baseColor;
  uniform float glistenSpeed;
  uniform float glistenColorMultiplier;
  uniform float glistenScale;
  uniform sampler2D lightTexture;
  varying vec2 vUv;
  varying vec3 Position;
  varying vec3 EyeVector;
  varying vec3 Normal;
  varying vec3 vNN;

  
  float Freshnel(vec3 eyeVector, vec3 worldNormal){
    return pow(-min(dot(eyeVector,normalize(worldNormal)),0.0),2.0);
  }

  void main() {
    float glistenColor = ((sin(((Position.x * glistenScale)/30.0)-time*glistenSpeed)+1.0)/2.0);
    float glistenColor2 = ((cos(((Position.y * glistenScale)/30.0)-time*glistenSpeed)+1.0)/2.0);
    float brightness = Freshnel(EyeVector, vNN) * 0.02;
    glistenColor = (glistenColor+glistenColor2)/2.0;
    float alpha = texture2D(lightTexture,vUv+glistenColor).r;
    gl_FragColor= (baseColor + alpha* glistenColorMultiplier) ;
  }
`;



function TaurusConstellationShiny(props){
    const meshRef = useRef();
    const freshnellMesh = useRef();
    const lightRef = useRef();
    const {scene} = useThree();
    const {nodes} = useGLTF('models/'+props.meshDir);
    const lightTexture = useLoader(TextureLoader, 'textures/'+props.lightTexDir);
    const caustic = useLoader(TextureLoader, 'textures/caustics/caust00.png');
    
    var baseColor = new THREE.Vector4(0.5,0.5,0.5,1.0);
    var lightColor;
    var glistenSpeed = 4.0;
    var glistenColorMultiplier = 0.75;
    var glistenScale = 1.0;
    var extrudeVal = 0.0;
    var lightMultiplier = 1.0;

    if (props.baseColor!=null){
      baseColor = props.baseColor;
    }
    lightColor = baseColor;
    if (props.lightColor!=null){
      lightColor = props.lightColor;
    }

    if (props.lightMultiplier!=null){
      lightMultiplier = props.lightMultiplier;
    }

    if (props.glistenSpeed!=null){
        glistenSpeed = props.glistenSpeed;
    }

    if (props.glistenScale!=null){
      glistenScale = props.glistenScale;
    }
    
    if (props.glistenColorMultiplier!=null){
      glistenColorMultiplier = props.glistenColorMultiplier;
    }

    if (props.extrudeVal!=null){
      extrudeVal = props.extrudeVal;
    }

    useFrame((state, delta)=>{
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
      lightRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    });

    const ConstelationUniform = useMemo(()=>({
      time :{value : 0},
      baseColor:{value : baseColor},
      glistenSpeed : {type : 'f', value: glistenSpeed},
      glistenColorMultiplier : {type : 'f', value: glistenColorMultiplier},
      glistenScale : {type : 'f', value: glistenScale * props.scale},
      extrudeVal : {type : 'f', value : 0},
      lightTexture : {type:"t", value : caustic}
    }), []);

    var MaterialConstelation = new THREE.ShaderMaterial({
      extensions:{
        derivatives: "extension GL_OES_standard_derivatives : enable"
      },
      side : THREE.FrontSide,
      transparent:false,
      uniforms:ConstelationUniform,
      vertexShader:vertexShader,
      fragmentShader:fragmentShader,
    });

    var MaterialConstelationFreshnell = new THREE.ShaderMaterial({
      extensions:{
        derivatives: "extension GL_OES_standard_derivatives : enable"
      },
      uniforms:{
        extrudeVal : {type : 'f', value : extrudeVal}
      },
      blending : THREE.NormalBlending,
      side : THREE.FrontSide,
      transparent: true,
      vertexShader:vertexShader,
      fragmentShader:fragmentFreshnellShader
    })

    const MaterialLightUniform = useMemo(()=>({
      time :{value : 0},
      baseColor : {value: lightColor},
      colorMultiplier : {value : lightMultiplier},
      glistenSpeed : {type : 'f', value: glistenSpeed/2.0},
      glistenColorMultiplier : {type : 'f', value: glistenColorMultiplier},
      glistenScale : {type : 'f', value: glistenScale * props.scale},
      scale : {value : props.lightScale},
      maskTexture : {type:"t", value : lightTexture},
      lightTexture : {type:"t", value : caustic}
    }), []);

    var MaterialLightSphere = new THREE.ShaderMaterial({
      extensions:{
        derivatives: "extension GL_OES_standard_derivatives : enable"
      },
      
      transparent : true,
      side : THREE.DoubleSide,
      uniforms:MaterialLightUniform,
      vertexShader : lightVertexShader,
      fragmentShader : lightFragmentShader
    });
    return(
        <group {...props} dispose={null}>
            <mesh
                ref = {meshRef}
                geometry={nodes.Scene.children[props.meshIndex].geometry}
                position={props.position}
                rotation={props.rotation}
                scale={props.scale}
            >
                <shaderMaterial attach="material"{...MaterialConstelation}/>
                <mesh
                  ref = {lightRef}
                  scale={props.lightScale}
                  position={props.lightPosition}
                  rotation={props.lightRotation}
                >
                  <planeGeometry args={[2.5,2.5,32]} />
                  <shaderMaterial attach="material"{...MaterialLightSphere}/>
                  
                </mesh>
            </mesh>
        </group>
    )
}


export default TaurusConstellationShiny;