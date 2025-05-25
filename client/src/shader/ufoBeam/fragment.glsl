precision mediump float;
uniform float uOpacity;
uniform vec3 uColor;
uniform float uProgress;
varying vec2 vUv;
varying vec3 vPosition;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

void main()
{
    float progress = uProgress;
    float strengthOpeningProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    float strengthClosingProgress = remap(progress, 0.5, 0.6, 1.0, 0.0);
    float strengthProgress = min(strengthOpeningProgress, strengthClosingProgress);
    float strengthProgressHeight = 1.0 - strengthProgress;
    float strengthProgressWidth = strengthProgress / 4.0;
    float opacity;
    if (vUv.y > strengthProgressHeight && (abs(0.5 - vUv.x) < (strengthProgressWidth))) {
        opacity = 1.0;
    } else {
        opacity = 0.0;
    }

    gl_FragColor = vec4(
        vec3(
            uColor.x, 
            uColor.y, 
            uColor.z
        ), 
        1.0 * uOpacity * opacity * vUv.y
    );
}