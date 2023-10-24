 

const DotScreenShader = {

	uniforms: {

		'tDiffuse': { value: .0 },
	 

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		
		void main() {
		
			float darkness = 0.6;
			vec2 uv = vUv;
			vec2 distanceToCenter = vec2(0.3, .7) - uv ;
		
			float distance = length(distanceToCenter);
			vec4 color = texture2D(tDiffuse, uv);
			color.rgb *= 1.0 - smoothstep(0., 0.8, distance) * darkness;
			gl_FragColor = color;
		}
 
 	`

};

export { DotScreenShader };
