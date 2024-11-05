uniform float uTime;

attribute float aRandom;

varying vec3 vColor;
varying float vAlpha;
varying float vRandom;


void main()
{
    vRandom = aRandom;
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
      
    vec2 st = vec2(position.x * 100.0, position.y * 100.0);
    // gl_PointSize = 10.0 * (cos(uTime * 0.05 + random(st) * 1000.0) * 0.5 + 0.5);
    // gl_PointSize = clamp(gl_PointSize, 5.0, 100.0);
    gl_PointSize = 3.0 * (cos(uTime + aRandom) * 0.5 + 0.5);
    // gl_PointSize = clamp(gl_PointSize, 3.0, 10.0);
    // gl_PointSize *= (1.0 / - viewPosition.z);
    
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
    vAlpha = cos(uTime + aRandom) * 0.2 + 0.2;
    // vAlpha = clamp(vAlpha, 0.3, 1.0);
}