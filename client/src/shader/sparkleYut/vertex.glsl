uniform float uSize;
uniform float uTime;
uniform vec2 uResolution;

attribute float aScale;
attribute float aIsRainbowFlag;
attribute float aDelay;

varying float vAlpha;
varying float vIsRainbowFlag;
varying float vTime;
varying float vDelay;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;

void main()
{
    /**
      * Position
      */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.x += uTime;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
      * Size
      */
    gl_PointSize = uSize * aScale * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    /**
      * Color
      */
    vColor = color;

    /**
      * Alpha
      */
    vAlpha = 1.0;

    /**
      * Time
      */
    vTime = uTime;

    /**
      * Position (for randomness)
      */
    vPosition = position;

    /**
      * Delay (for randomness)
      */
    vDelay = aDelay;

    /**
      * Uv
      */
    vUv = uv;
}