void main() {
    // Set the color of the fragment
    vec4 color = vec4(1.0, 1.0, 1.0, 1.0); // Default white color

    // Sample the texture
    vec2 uv = gl_FragCoord.xy / resolution.xy; // Normalize coordinates
    vec4 textureColor = texture2D(u_texture, uv);

    // Combine the texture color with the fragment color
    gl_FragColor = textureColor * color;
}