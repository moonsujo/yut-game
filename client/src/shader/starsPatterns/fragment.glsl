uniform sampler2D uTexture;

varying vec3 vColor;
varying float vAlpha;
varying vec3 vPosition;
varying vec2 vUv;

void main()
{
  float textureAlpha = texture(uTexture, gl_PointCoord).r;
  float timeFade = cos(uTime) * 0.5 + 0.5;
  float finalAlpha = textureAlpha * timeFade;

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
  // if (vIsRainbowFlag == 1.0) {
  //   float time = mod(uTime, 360.0);
  //   float speed = 50.0;
  //   // float hue = mod(time * speed, 1.0);
  //   float hue = mod(time * speed, 1.0);
  //   vec3 hsvColor = vec3(hue, 1.0, 1.0);  // HSV (Hue, Saturation, Value)
  //   vec3 rgbColor = hsv2rgb(hsvColor);    // Convert to RGB
  //   newColor = rgbColor;
  // } else {
  //   newColor = vColor;
  // }
  newColor = vColor;

  vec3 color = mix(vec3(0.0), newColor, strength);

  gl_FragColor = vec4(color, vAlpha);

  // gl_FragColor = vec4(newColor, finalAlpha);
  // gl_FragColor = vec4(newColor, textureAlpha);
  
  #include <colorspace_fragment>
}