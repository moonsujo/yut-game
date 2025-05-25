uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uDuration;
uniform float uSpeedX;
uniform float uSpeedY;

attribute float aSize;
attribute float aDirection;
attribute float aTimeMultiplier;
attribute float aTrailDuration;
attribute float aSetOffTime;

varying float vSetOffTime;
varying float vTrailDuration;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

float remapLog(float value) {
    return value * 5.0 / (1.0 + value);
}

void main()
{
    float progress = uProgress;
    vec3 newPosition = position;

    vSetOffTime = aSetOffTime;
    vTrailDuration = aTrailDuration;
    
    // path = -2, -1
    newPosition.x -= (aSetOffTime * uDuration * uSpeedX);
    newPosition.y -= (aSetOffTime * uDuration * uSpeedY);

    // shift by time instead of position from center

    // Scaling
    float sizeProgress;
    if (progress < aSetOffTime) {
        sizeProgress = 0.0;
    } else if (progress > aSetOffTime) {
        sizeProgress = remap(progress, aSetOffTime, aSetOffTime+aTrailDuration, 1.0, 0.0);
        sizeProgress = clamp(sizeProgress, 0.0, 1.0);
    }

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final size
    // gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress;
    gl_PointSize *= 1.0 / - viewPosition.z;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }
}