uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uPosition;
uniform float uSpeed;

varying vec3 vColor;
varying float vAlpha;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

float remapLog(float value) {
    return value * 5.0 / (1.0 + value);
}

// fade: 1 to 0 over 0 to 1
// position: -3 to 3 over 0 to 1
void main()
{
    float progress = uProgress;
    vec3 newPosition = position;

    // Rising
    float risingProgress = remap(progress, 0.0, 1.0, 0.0, 1.0);
    risingProgress = (pow(risingProgress, 2.0)) / 2.0;
    newPosition.z -= risingProgress * uSpeed;

    // Centering
    float centeringProgress;
    centeringProgress = remap(progress, 0.0, 1.0, newPosition.x, 0.0);
    newPosition.x = centeringProgress;

    // Fading
    float fadingProgress = remap(progress, 0.0, 1.0, 1.0, 0.0);
    vAlpha = fadingProgress;
    // vAlpha = 1.0;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final size
    gl_PointSize = uSize;
    gl_PointSize *= 1.0 / - viewPosition.z;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }
}