uniform float uTime;

varying vec3 vColor;
varying float vAlpha;
varying float vRandom;

void main()
{
  // Light point
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength * 1.1, 10.0);

  // Final color
  vec3 newColor = vColor;
  vec3 color = mix(vec3(0.0), newColor, strength);

  gl_FragColor = vec4(color, vAlpha);
  
  // #include <colorspace_fragment>
}