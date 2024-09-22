uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;

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

    // Joining
    float fallingProgress = remap(progress, 0.0, 0.12, 0.0, 1.0);
    fallingProgress = (-pow(10.0, -fallingProgress)) * 2.0;
    newPosition *= fallingProgress;

    // Scaling
    float sizeOpeningProgress = remap(progress, 0.0, 0.3, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.7, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final size
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress;
    gl_PointSize *= 1.0 / - viewPosition.z;

}