uniform sampler2D uTexture;
uniform float uTime;

varying float vAlpha;
varying float vIsRainbowFlag;
varying float vTime;
varying float vDelay;
varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;

// Function to convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
  float textureAlpha = texture(uTexture, gl_PointCoord).r;

  // Final color
  vec3 newColor;
  float finalAlpha;
  newColor = vColor;
  float timeFade = cos((uTime + vDelay) * 5.0) * 0.5 + 0.3;
  finalAlpha = textureAlpha * timeFade;

  // vec3 color = mix(vec3(0.0), newColor, strength);

  // gl_FragColor = vec4(color, vAlpha);

  gl_FragColor = vec4(newColor, finalAlpha);
  
  #include <colorspace_fragment>
}