#ifdef GL_ES
precision highp float;
#endif
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d) 

uniform float time;
uniform vec2 resolution;
uniform sampler2D tDiffuse;
varying vec2 vUv;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

float orb(float light, vec2 p, vec2 translate){
	vec2 v = p - translate;
	float c = light / length(v);
    return pow(c,2.0);
}

void main(){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float t = time*0.5;
    float o1 = orb(0.1, p, vec2(cos(t * 2.0) * 0.7, sin(t * 1.2) * 0.3));
    float o2 = orb(0.1, p, vec2(cos(t * 1.5) * 1.2, sin(t * 1.5) * 0.5));
    float o3 = orb(0.1, p, vec2(cos(t * 1.8) * 0.8, sin(t * 1.8) * 1.0));
    float o4 = orb(0.2, p, vec2(cos(t * 1.2) * 0.7, sin(t * 1.2) * 0.0));
    float o5 = orb(0.15, p, vec2(cos(t * 1.1) * 0.1, sin(t * 1.4) * 0.3));
    float o6 = orb(0.17, p, vec2(cos(t * 1.4) * 0.3, sin(t * 1.1) * 1.0));
    float o7 = orb(0.15, p, vec2(cos(t * 1.7) * 1.3, sin(t * 1.2) * 0.2));
    float o8 = orb(0.2, p, vec2(cos(t * 1.1) * 0.1, sin(t * 1.1) * 0.1));
    float o9 = orb(0.05, p, vec2(cos(t * 1.5) * 0.1, sin(t * 1.5) * 1.0));
    float o10 = orb(0.1, p, vec2(cos(t * 1.5) * 1.4, sin(t * 1.5) * 0.1));
    float o11 = orb(0.1, p, vec2(cos(t * 0.1) * 0.5, sin(t * 1.2) * 0.8));
    float o12 = orb(0.2, p, vec2(cos(t * 1.1) * 1.3, sin(t * 1.1) * 0.5));
    float o13 = orb(0.25, p, vec2(cos(t * 2.2) * 0.1, sin(t * 0.3) * 0.7));
    float o14 = orb(0.15, p, vec2(cos(t * 0.6) * 1.2, sin(t * 1.8) * 0.5));
    float o15 = orb(0.27, p, vec2(cos(t * 1.7) * 0.5, sin(t * 1.5) * 1.0));
    float o16 = orb(0.05, p, vec2(cos(t * 1.2) * 0.4, sin(t * 0.5) * 0.9));
    float o17 = orb(0.2, p, vec2(cos(t * 1.1) * 1.4, sin(t * 0.2) * 0.1));
    float o18 = orb(0.05, p, vec2(cos(t * 1.5) * 1.1, sin(t * 1.7) * 0.2));

    
	vec3 destColor = vec3(0.0);
    destColor += o1 ;
    destColor += o2 ;
    destColor += o3 ;
    destColor += o4 ;
    destColor += o5 ;
    destColor += o6 ;
    destColor += o7 ;
    destColor += o8 ;
    destColor += o9 ;
    destColor += o10 ;
    destColor += o11 ;
    destColor += o12 ;
    destColor += o13 ;
    destColor += o14 ;
    destColor += o15 ;
    destColor += o16 ;
    destColor += o17 ;
    destColor += o18  ;
    destColor = vec3(pow(destColor.r,5.0),pow(destColor.g,5.0),pow(destColor.b,5.0));

    float scanLine =abs(sin(p.y * 400.0)) * 0.1;
    vec3 color = hsv(sin(t*0.05),1.0,1.0);
    destColor = destColor * color;

   gl_FragColor = vec4(vec3(destColor) + scanLine , 1.0);
}