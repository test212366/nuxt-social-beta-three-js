
uniform float time;
uniform float offset;
uniform float opacity;
uniform float progress;
uniform vec3 color;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926;

float qinticOut(float t ) {
	return 1.0 - (pow(t - 1.0, 5.0));
}

void main() {
	// vec3 color = vec3(1., 1.,1.);


	float localProgress = mod(time / 5. + offset * 2., 2.);

	localProgress = qinticOut(localProgress * 2.);

	if(vUv.x > localProgress || vUv.x + 1. < localProgress) discard;
	float dash = sin(vUv.x * 24. + time / 10.);
	vec4 brightEndColor = vec4(0.4, 0.0, 0.0, 1.);
	vec4 defaultColor = vec4(1.0, 1.0, 1.0, 1.);
	vec4 additionalColor = vec4(2.0, 0.1, 0.4, 1.);

	float blendFactor = step(0.005, abs(dash+ 0.8));
	vec4 mixedColor = mix(defaultColor, brightEndColor, blendFactor);

	float blendFactor1 = smoothstep(0.0, 0.6, abs(dash- 0.2));
	vec4 mixedColor1 = mix(additionalColor, brightEndColor, blendFactor1);

	vec4 finalColor = mix(mixedColor1, mixedColor, 0.5);

	gl_FragColor = finalColor ;



}