uniform float uTime;

varying vec3 vColor;
varying float vAlpha;

void main()
{
  // Light point
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength * 1.1, 10.0);

  // Final color
  vec3 newColor = vColor;
  newColor.r = 0.0;
  newColor.g = 0.3;
  newColor.b = 0.5 + cos(uTime) * 0.5;
  vec3 color = mix(vec3(0.0), newColor, strength);

  gl_FragColor = vec4(color, vAlpha);
  
  // #include <colorspace_fragment>
}