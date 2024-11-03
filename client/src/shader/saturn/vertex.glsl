uniform float uSize;
uniform float uTime;

attribute float aScale;

varying vec3 vColor;
varying float vAlpha;
varying float vRandom;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(121.9898, 7.233)))*43752.23435);
}

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
    gl_PointSize = 10.0;
    gl_PointSize *= (1.0 / - viewPosition.z);
    
    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }

    /**
      * Color
      */
    vColor = color;

    /**
      * Alpha
      */
    vAlpha = cos(uTime + random(vec2(position.x*400.0, position.y*300.0)) * 50.0) * 0.5 + 0.5;
}