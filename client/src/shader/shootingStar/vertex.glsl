uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uSparkDuration;

attribute float aSize;
attribute float aTiming;
attribute vec3 aDirection;

varying float vTiming;

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

    float life = 0.1;
    // Sparking
    float sparkingProgress = remap(progress, aTiming, aTiming + life, 0.0, 1.0);
    newPosition.x += aDirection.x * sparkingProgress;
    newPosition.z += aDirection.z * sparkingProgress;
    
    // Scaling
    float sizeOpeningProgress = remap(progress, aTiming, aTiming + life, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, aTiming + life, aTiming + life * 2.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final size
    gl_PointSize = 500.0 * sizeProgress;
    gl_PointSize *= 1.0 / - viewPosition.z;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }

    vTiming = aTiming;
}