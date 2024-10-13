uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uProgress;

void main()
{
    float textureAlpha = texture(uTexture, gl_PointCoord).r;

    float progress = uProgress;
    vec3 newColor = uColor;
    newColor.r = sin(progress * 50.0) * 0.1 + newColor.r;
    newColor.g = sin(progress * 50.0) * 0.05 + newColor.g;

    // Final color
    gl_FragColor = vec4(newColor, textureAlpha);
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
    #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}