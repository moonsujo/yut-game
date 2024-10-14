uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uProgress;

varying float vSetOffTime;
varying float vTrailDuration;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

void main()
{
    float textureAlpha = texture(uTexture, gl_PointCoord).r;
    float progress = uProgress;
    vec3 newColor = uColor;

    // float burnProgressR = remap(progress, vSetOffTime, vSetOffTime+vTrailDuration, 0.5, 0.1);
    // float burnProgressG = remap(progress, vSetOffTime, vSetOffTime+vTrailDuration, 0.4, 0.2);
    // float burnProgressB = remap(progress, vSetOffTime, vSetOffTime+vTrailDuration, 0.1, 0.0);
    // newColor.x = burnProgressR;
    // newColor.y = burnProgressG;
    // newColor.z = burnProgressB;
    // Final color
    gl_FragColor = vec4(newColor, textureAlpha);
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
    #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}