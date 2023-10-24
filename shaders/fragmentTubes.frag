uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926;

varying vec3 vNormal;
varying vec3 v_wordPosition;

float getScatter(vec3 cameraPos, vec3 dir, float d) {
	vec3 q = cameraPos ;


	float b = dot(dir, q);
	float c = dot(q, q);

	float t = c - b * b;
	float s = 1.0 / sqrt(max(0.0001, t));
	float l = s * (atan((d + b) * s) - atan(b * s));



	return pow(max(0.0, l / 15.0), 0.4);

}



void main() {
 
	float dash = sin(vUv.x * 24. + time / 10.);


	if(dash < 0.2) {
		vec4 brightEndColor = vec4(0.4, 0.0, 0.0, 1.0);
		vec4 defaultColor = vec4(1.0, 1.0, 1.0, 1.0);
		vec4 additionalColor = vec4(2.0, 0.1, 0.4, 1.0);

		float blendFactor = step(0.005, abs(dash + 0.8));
		vec4 mixedColor = mix(defaultColor, brightEndColor, blendFactor);

		float blendFactor1 = smoothstep(0.0, 0.6, abs(dash - 0.2));
		vec4 mixedColor1 = mix(additionalColor, brightEndColor, blendFactor1);

		vec4 finalColor = mix(mixedColor1, mixedColor, 0.5);

		gl_FragColor = finalColor;
		return;
			


	} else {
		discard;
	}


	vec3 cameraToWorld = v_wordPosition - cameraPosition;
	vec3 cameraToWorldDir = normalize(cameraToWorld);

	float cameraToWorldDistance = length(cameraToWorld);



	// vec3 lightToWorld = normalize(uLight - v_wordPosition);


	// float diffusion = max(0.,dot(vNormal, lightToWorld));
	// float dist = length(uLight - vPosition);
 
 



	// float scatter = getScatter(cameraPosition, cameraToWorldDir, cameraToWorldDistance);


	// float final = diffusion ;

 
	// gl_FragColor = vec4( 1. - dist, 0., 0., 1.);
	gl_FragColor = vec4( 1., 0., 0., 1.);
}