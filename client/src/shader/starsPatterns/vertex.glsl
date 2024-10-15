uniform float uSize;

attribute float aScale;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;
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
    vColor = aColor;
    
    /**
      * Alpha
      */
    vAlpha = 1.0;

    /**
      * Position (for randomness)
      */
    vPosition = position;

    /**
      * Uv
      */
    vUv = uv;
}