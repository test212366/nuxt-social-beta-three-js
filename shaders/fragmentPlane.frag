uniform float time;
uniform float progress;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
uniform float opacity;
float PI = 3.1415926;

varying float vDist;

void main() {
	vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
 
	gl_FragColor = vec4(1., 1., 1., opacity * vDist);
}