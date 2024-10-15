uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute float aIsRainbowFlag;

varying vec3 vColor;
varying float vAlpha;
varying float vIsRainbowFlag;
varying float vTime;
varying vec3 vPosition;
varying vec2 vUv;

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
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    /**
      * Color
      */
    vColor = color;

    /**
      * Alpha
      */
    if (aIsRainbowFlag == 0.0) {
      vAlpha = cos(uTime + position.y);
    } else {
      float time = mod(uTime, 1.0);
      float speed = 20.0;
      // float hue = mod(time * speed, 1.0);
      vAlpha = mod(time * speed, 1.0);
      // vAlpha = 1.0;
    }

    /**
      * Is Rainbow Flag
      */
    vIsRainbowFlag = aIsRainbowFlag;

    /**
      * Time
      */
    vTime = uTime;

    /**
      * Position (for randomness)
      */
    vPosition = position;

    /**
      * Uv
      */
    vUv = uv;
}