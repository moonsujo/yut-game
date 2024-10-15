uniform sampler2D uTexture;
uniform float uTime;

varying vec3 vColor;
varying float vAlpha;
varying float vIsRainbowFlag;
varying float vTime;
varying vec3 vPosition;
varying vec2 vUv;

// Function to convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
  float textureAlpha = texture(uTexture, gl_PointCoord).r;

  // Light point
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength = 1.0 - strength;
  // strength = pow(strength, 10.0);

  // // Disc
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength = step(0.5, strength);
  // strength = 1.0 - strength;

  // // Diffuse point
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength *= 2.0;
  // strength = 1.0 - strength;

  // Final color
  vec3 newColor;
  float finalAlpha;
  if (vIsRainbowFlag == 1.0) {
    float timeColor = mod(vTime, 360.0);
    float speedColor = 50.0;
    // float hue = mod(time * speed, 1.0);
    float hue = mod(timeColor * speedColor, 1.0);
    vec3 hsvColor = vec3(hue, 1.0, 1.0);  // HSV (Hue, Saturation, Value)
    vec3 rgbColor = hsv2rgb(hsvColor);    // Convert to RGB
    newColor = rgbColor;

    float timeAlpha = mod(uTime, 1.0);
    float speedAlpha = 20.0;
    finalAlpha = textureAlpha * mod(timeAlpha * speedAlpha, 1.0);
  } else {
    newColor = vColor;
    float timeFade = cos(uTime + vPosition.y) * 0.5 + 0.5;
    finalAlpha = textureAlpha * timeFade;
  }

  // vec3 color = mix(vec3(0.0), newColor, strength);

  // gl_FragColor = vec4(color, vAlpha);

  gl_FragColor = vec4(newColor, finalAlpha);
  
  #include <colorspace_fragment>
}