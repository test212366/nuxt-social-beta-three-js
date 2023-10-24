	
	import * as THREE from 'three'
	// import * as TWEEN from 'tween.js';

	//@ts-ignore
	import { MSDFTextGeometry, MSDFTextMaterial, uniforms } from "three-msdf-text-utils";

	import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
	import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader' 
	// import GUI from 'lil-gui'
	import gsap from 'gsap'
	//@ts-ignore
	import fragmentShaderTubes from '../shaders/fragmentTubes.frag';
 	//@ts-ignore
	import vertexShaderTubes from '../shaders/vertexTubes.vert'


		//@ts-ignore
		import vertexShaderPlanes from '../shaders/vertexPlanes.vert';
		//@ts-ignore
	  import fragmentShaderPlanes from '../shaders/fragmentPlane.frag'

	//@ts-ignore
	import vertexParticlesPoints from '../shaders/vertexParticles.vert';

	//@ts-ignore
	import fragmentTornado from '../shaders/fragmentTornado.frag'

	//@ts-ignore
	import vertexTornado from '../shaders/vertexTornado.vert'

	
	import { createNoise3D } from 'simplex-noise';
	import alea from 'alea';
	import {DotScreenShader} from '../shaders/postProcessing'

 
	
	import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
	import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
	import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
	// import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'

 

	import atlasURL from '../3d-font/FontsFree-Net-SF-Pro-Rounded-Regular.png'
	import fnt from '../3d-font/FontsFree-Net-SF-Pro-Rounded-Regular-msdf.json'

	const noise3D:any = createNoise3D(alea('seed'))


 


 	export class WebGLScene {
		scene: any
		container: any
		width: any
		height: any
		renderer: any
		renderTarget: any
		camera: any
		controls: any
		time: number
		dracoLoader: any
		gltf: any
		isPlaying: boolean
		//@ts-ignore
		gui: GUI 
		imageAspect!: number
		tubesGeometryGroup: any
		materialTubes: any
		composer: any
		effect1: any
		mouse: any
		prevMouse: any
		materialText:any
		store: any
		mesh: any
		mesh1: any
		mesh2: any
		mesh3: any
		mesh5: any
		mesh6: any
		mesh7: any
		mesh8: any
		mesh9: any
		mesh10: any
		mesh11: any
		mesh12: any
		mesh13: any
		mesh14: any
		materialSquares: any
		count: number
		geometrySquares: any
		squares: any
		lines: any
		pointsGeo: any
		materialPoints:any
		particles:any

		materialTornado: any
		animated:any
		number: any
		localtime: number
		groupTornado:any

		input: any


		constructor(options: any) {
			
			this.scene = new THREE.Scene()
			
			this.container = options.dom
			this.localtime = 0
	

			this.groupTornado = new THREE.Group()

			this.tubesGeometryGroup = new THREE.Group()
		
			
			this.width = this.container.offsetWidth
			this.height = this.container.offsetHeight
			
			this.renderer = new THREE.WebGLRenderer({ antialias: true })
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
			this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height)
			this.renderer.setSize(this.width ,this.height )

	


			this.renderer.setClearColor(0x280908, 1)
			this.renderer.useLegacyLights = true
			this.renderer.outputEncoding = THREE.sRGBEncoding
	

			
			this.renderer.setSize( window.innerWidth, window.innerHeight )

			this.container.appendChild(this.renderer.domElement)
 


			this.camera = new THREE.PerspectiveCamera( 70,
				this.width / this.height,
				0.01,
				10
			)
	
			this.camera.position.set(0, 0, 1) 
			// this.controls = new OrbitControls(this.camera, this.renderer.domElement)
			this.time = 0


			this.dracoLoader = new DRACOLoader()
			this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
			this.gltf = new GLTFLoader()
			this.gltf.setDRACOLoader(this.dracoLoader)

			this.isPlaying = true
			this.mouse = new THREE.Vector2()
			this.prevMouse = new THREE.Vector2()
			// this.elasticMouseVel = new THREE.Vector2(0,0)
			this.count = 40

			this.input = document.getElementById('loadingInput')

		 

			this.initPostProcessing()
 
			this.addTubes()		 
			this.resize()
			this.render()
			this.setupResize()
			this.mouseMove()
			// this.settings()
			this.addText()
			this.addPlanes()
			this.createCircleTornado()
			
		}
		errorRegister(error: string) {
			this.scene.remove(this.mesh7)
			console.log(error)
			const geometry2 = this.createTextGeometry(`${error}`, 42, true)
			this.mesh7 = new THREE.Mesh(geometry2, this.materialText);
			let s1 = 0.0006
			this.mesh7.scale.set(s1,-s1, s1)
			this.mesh7.position.y = 0.24
			this.mesh7.position.x = -0.14

			if(this.width <= 480) {
				let s2 = 0.0005
				this.mesh7.position.x = -.12
				this.mesh7.scale.set(s2, -s2, s2)
			}
			if(this.width <= 350) {
				let s2 = 0.00043
				this.mesh7.scale.set(s2, -s2, s2)
			}
			console.log(this.mesh7)
			this.scene.add(this.mesh7)
			this.eraseOrAddText(4, 2)
		}
		eraseOrAddText(duration: number, value: number) {
			gsap.to(this.materialText.uniforms.uProgress1, {
				duration,
				value,
			})
		}

		backChat() {
			// this.mesh14.position.y = 4
			this.mesh12.position.y = 0.43
			this.mesh13.position.y = .4
		 

			if(this.width <= 450) {
				this.mesh12.position.y = .475

				this.mesh13.position.y = .43
			}
			this.eraseOrAddText(4, 2)
			gsap.to(this.tubesGeometryGroup.position, {
				duration:   3,
				y: -1.2,
				ease: "power1.out"
			})
			gsap.to(this.groupTornado.position, {
				duration:   3,
				y: 4,
				ease: "power1.out"
			})
			gsap.to(this.tubesGeometryGroup.position, {
				duration:   3,
				x: -1.7,
				ease: "power1.out"
			})
			gsap.to(this.tubesGeometryGroup.position, {
				duration:   3,
				z: -.2,
				ease: "power1.out"
			})
			
		}
		createChatsLettersHi(isConfirm: boolean = false, userName: string) {
			let s = 0.0015
			let s1 = 0.0007

		
			gsap.to(this.squares.rotation, {
				duration:   3,
				x: this.width <= 1000 ? -Math.PI / 7 : -Math.PI / 15,
				ease: "power1.out"
			})


			const geometry = this.createTextGeometry(isConfirm ? 'Your account' : 'Choose Chat', 37)
		  	this.mesh10 = new THREE.Mesh(geometry, this.materialText);
			this.mesh10.scale.set(s,-s,s)
			this.mesh10.position.y = .392
			this.mesh10.position.x = -.3

			const geometry1 = this.createTextGeometry(isConfirm ? 'is not confirm' : 'And Start Chattings', 37)
			this.mesh11 = new THREE.Mesh(geometry1, this.materialText);
			this.mesh11.scale.set(s1,-s1,s1)
			this.mesh11.position.y = .355
			this.mesh11.position.x = 0

			if(this.width <= 370) {
				let s2 = 0.0013
				let s3 = 0.0005
				
				this.mesh10.position.x = -.26
				this.mesh10.scale.set(s2,-s2,s2)

				this.mesh11.position.x = .01
				this.mesh11.scale.set(s3,-s3,s3)

			}
			if(this.width <= 450) {
				this.mesh10.position.y = .475

				this.mesh11.position.y = .43
			}

			this.scene.add(this.mesh10)
			this.scene.add(this.mesh11)
			this.eraseOrAddText(4, 2)
			if(isConfirm) return
			setTimeout(() => {
				this.eraseOrAddText(2, 0)
				setTimeout(() => {
					this.createChatsLetters(userName)
					this.scene.remove(this.mesh10)
					this.scene.remove(this.mesh11)
				}, 2000)
		 
			}, 2500) 
		
			gsap.to(this.tubesGeometryGroup.position, {
				duration:   3,
				z: 1,
				ease: "power1.out"
			})
			
		}
		createCircleTornado() {
			this.materialTornado = new THREE.ShaderMaterial({
				extensions: {
					derivatives: '#extension GL_OES_standard_derivatives : enable'
				},
				side: THREE.DoubleSide,
				uniforms: {
					time: {value: 0},
					opacity: {value: 0},
					resolution: {value: new THREE.Vector4()},
					color: {value: new THREE.Color('#000000')},
					offset: {value: 0}
				},
				vertexShader: vertexTornado,
				fragmentShader: fragmentTornado
			})
			this.animated = []
			function range(min: any, max: any) {
				return min + Math.random() * (max - min)
			}
	
			this.number = 100
	
			// this.scene.rotation.z = Math.PI / 9
			for (let i = 0; i < this.number; i++) {
				let precision = 100
				
				let spline = []
				let level = range(-300, 300)
				let zero = (level) / 300
				// let rad = 130 * (Math.sin(zero * 4) + Math.sin(zero * 10)) + Math.random() * 10
				
				let rad = 130 * zero + Math.random() * 10
				
				let offset = Math.abs(zero)
				let angle = range(0, 2 * Math.PI)
				let width = Math.random() * 0.5 + 0.5
	
				let center = {
					x: range(-10, 10),
					y: range(-10, 10)
				}
	
				for (let j = 0; j <= precision * width; j++) {
					let x =   center.x +  zero +  rad * Math.sin(Math.PI * 2 * j / precision)
					let z =   center.y + zero +  rad * Math.cos(Math.PI * 2 * j / precision)
					spline.push(
						new THREE.Vector3(x, level, z)
					)
					
				}
	
				let sampleClosedSpline = new THREE.CatmullRomCurve3(spline)
	
				const params = {
					scale: 0.1,
					extrusionSegments: 100,
					radiusSegments: 16,
					closed: false
				}
	
				let TubeGeometry = new THREE.TubeGeometry(sampleClosedSpline, params.extrusionSegments, 0.5, params.radiusSegments, params.closed)
				let TubeGeometry1 = new THREE.TubeGeometry(sampleClosedSpline, params.extrusionSegments, 0.5 + 0.5, params.radiusSegments, params.closed)
				
				
				let m  = this.materialTornado.clone()
				let m1  = this.materialTornado.clone()
				m.uniforms.color.value = new THREE.Color('#ffffff')
				// m.uniforms.color.value = new THREE.Color(palette[Math.floor(Math.random() * 5)])
	
				m.uniforms.offset.value = offset
				m1.uniforms.offset.value = offset
	
				m1.side = THREE.BackSide
	
				let mesh = new THREE.Mesh(TubeGeometry, m)
				let mesh1 = new THREE.Mesh(TubeGeometry1, m1)
	
				mesh.scale.set(0.003, 0.003,0.003)
				mesh1.scale.set(0.003, 0.003,0.003)
	
				mesh.rotation.y = mesh1.rotation.y = angle
					
				mesh.position.z = -1
				mesh1.position.z = -1

				mesh.rotation.y = - 1.5
				mesh1.rotation.z = 1



				this.groupTornado.add(mesh)
				this.groupTornado.add(mesh1)
				this.groupTornado.position.z = -.2
				this.groupTornado.position.x = -.4
				this.groupTornado.position.y = 4


				this.scene.add(this.groupTornado)
	
				this.animated.push({
					mesh,
					material: m,
					material1: m1
	
				})
			
			}
		
		
			
				
			gsap.to(this.input, {
				duration:   2.5,
				value: 100,
				ease: "power1.out"
			})
			setTimeout(() => {
				let loading = document.getElementById('loading')
				loading?.classList.add('loading__hidden')
				document.body.style.backgroundColor = '#1a0606'
			}, 2500)
	
		}
		hideChatsLetters() {
			this.mesh12.position.y = 5
			this.mesh13.position.y = 5

			gsap.to(this.tubesGeometryGroup.position, {
				duration:   3,
				x: .3,
				ease: "power1.out"
			})
			gsap.to(this.groupTornado.position, {
				duration:   3,
				y: .2,
				ease: "power1.out"
			})
			gsap.to(this.tubesGeometryGroup.position, {
				duration:   3,
				z: 0,
				ease: "power1.out"
			})
 
		}
		createChatsLetters(userName: string) {
			
			let s = 0.0015
			let s1 = 0.0007

			const geometry = this.createTextGeometry(`Chats`, 37)
		  	this.mesh12 = new THREE.Mesh(geometry, this.materialText);
			this.mesh12.scale.set(s,-s,s)
			this.mesh12.position.y = 0.45
			this.mesh12.position.x = -.3

			const geometry1 = this.createTextGeometry(userName.toUpperCase(), 37)
			this.mesh13 = new THREE.Mesh(geometry1, this.materialText);
			this.mesh13.scale.set(s1,-s1,s1)
			this.mesh13.position.y = 0.4
			this.mesh13.position.x = -0.294


			if(this.width <= 370) {
				let s2 = 0.0013
				let s3 = 0.0005
				
				this.mesh12.position.x = -.26
				this.mesh12.scale.set(s2,-s2,s2)

				this.mesh13.position.x = -.2
				this.mesh13.scale.set(s3,-s3,s3)

			}
			if(this.width <= 450) {
				this.mesh12.position.y = .475

				this.mesh13.position.y = .43
			}

			this.scene.add(this.mesh12)
			this.scene.add(this.mesh13)
			this.eraseOrAddText(4, 2)

		}

		createTextGeometry(text: string, lineHeight: number, centerText?: boolean) {
			const geometry = new MSDFTextGeometry({
				text: text.toUpperCase(),
				font: fnt,
				lineHeight
		   })
			geometry.computeBoundingBox()
			return geometry
		}
		responsiveText() {
			if(this.width <= 1750) {
				this.mesh.position.x = -.8
				this.mesh1.position.x = - .6
				this.mesh2.position.x = -.7
				this.tubesGeometryGroup.position.x = -2.5
			}
			if(this.width <= 1450) {
				let s2 = 0.0006
				let s3 = 0.003
				this.mesh.scale.set(s3,-s3,s3)
				this.mesh1.scale.set(s3,-s3,s3)
				this.mesh1.position.y = .09
				this.mesh2.scale.set(s3,-s3,s3)
				this.mesh2.position.y = -0.02
				this.mesh3.scale.set(s2,-s2,s2)
				this.mesh3.position.y = -0.3					
			}
			if(this.width <= 1200) {
				this.mesh.position.x = -.7
				this.mesh1.position.x = - .5
				this.mesh2.position.x = -.6
			}
			if(this.width <= 1050) {
				this.mesh.position.x = -.6
				this.mesh1.position.x = - .4
				this.mesh2.position.x = -.5
				
			}
			if(this.width <= 950) {
				this.mesh.position.x = -.4
				this.mesh1.position.x = - .2
				this.mesh2.position.x = -.3
				this.mesh.position.y = .3
				this.mesh1.position.y = .19
				this.mesh2.position.y = .09
				this.mesh3.position.y = -0.55
				this.tubesGeometryGroup.position.x = -3
			}
			if(this.width <= 670) {
				this.mesh.position.y = .39
				this.mesh1.position.y = .28

				this.mesh2.position.y = .18
			}
			if(this.width <= 600) {
				let s3 = 0.0025
				let s2 = 0.00047

			 


				this.tubesGeometryGroup.position.x = -3.4

				this.mesh.scale.set(s3,-s3,s3)
				this.mesh1.scale.set(s3,-s3,s3)
				this.mesh2.scale.set(s3,-s3,s3)

				this.mesh.position.x = -.35
				this.mesh1.position.x = -.15

				this.mesh2.position.x = -.25
				this.mesh3.geometry = this.createTextGeometry(`Lorem lskd o rel kjdkjfsl dslkfjsaj aljk djl 
				jfkds jsdk jdkfjldfkjd  `, 45)
				this.mesh3.position.x = -0.225
				this.mesh3.scale.set(s2, -s2, s2)
				
			}
			if(this.width <= 480) {
				let s3 = 0.002

				this.mesh.scale.set(s3,-s3,s3)
				this.mesh.position.x = -.27
				this.mesh1.position.x = -.14
				this.mesh1.position.y = .305
				this.mesh2.position.x = -.2
				this.mesh2.position.y = .22


				this.mesh1.scale.set(s3,-s3,s3)
				this.mesh2.scale.set(s3,-s3,s3)
			}
			if(this.width <= 440) {
				let s3 = 0.0024

				this.mesh.scale.set(s3,-s3,s3)
				this.mesh.position.x = -.3
				this.mesh.position.y = .411

				this.mesh1.position.x = -.18
				this.mesh1.position.y = .315
				this.mesh2.position.x = -.24
				this.mesh2.position.y = .22


				this.mesh1.scale.set(s3,-s3,s3)
				this.mesh2.scale.set(s3,-s3,s3)
			}
			if(this.width <= 350) {
				let s3 = 0.002

				this.mesh.scale.set(s3,-s3,s3)
				this.mesh.position.x = -.27
				this.mesh.position.y = .39

				this.mesh1.position.x = -.14
				this.mesh1.position.y = .305
				this.mesh2.position.x = -.2
				this.mesh2.position.y = .22
				let s2 = 0.0005

				this.mesh3.geometry = this.createTextGeometry(`Lorem lskd o rel kjdkjfsl dslkfjsaj
				aljk djl jfkds jsdk jdkfjldfkjd`, 45)
				this.mesh3.scale.set(s2, -s2, s2)

				this.mesh3.position.x = -0.19
				this.mesh1.scale.set(s3,-s3,s3)
				this.mesh2.scale.set(s3,-s3,s3)
			}
		}
		removeFletters() {
			this.scene.remove(this.mesh)
			this.scene.remove(this.mesh1)
			this.scene.remove(this.mesh2)
			this.scene.remove(this.mesh3)
		}
		eraseRegLogLetters(isConfirm: boolean = false, userName: string) {
	 

			this.scene.remove(this.mesh5)
			this.scene.remove(this.mesh6)
			this.scene.remove(this.mesh7)
			this.scene.remove(this.mesh8)
			this.scene.remove(this.mesh9)
			this.createChatsLettersHi(isConfirm, userName)
			

		}
		addText() {
			this.materialText = new THREE.ShaderMaterial({
				side: THREE.DoubleSide,
				transparent: true,
				defines: {
					 IS_SMALL: false,
				},
				extensions: {
					 derivatives: true,
				},
				uniforms: {
					 // Common
					 ...uniforms.common,
					 
					 // Rendering
					 ...uniforms.rendering,
					 
					 // Strokes
					 ...uniforms.strokes,
					 ...{
						uStrokeColor: {value: new THREE.Color(0x00ff00)},
						uProgress1: {value: 0},
						time: {value: 0},
						
					 }
				},
				vertexShader: `
					 // Attribute
					 attribute vec2 layoutUv;
		  
					 attribute float lineIndex;
		  
					 attribute float lineLettersTotal;
					 attribute float lineLetterIndex;
		  
					 attribute float lineWordsTotal;
					 attribute float lineWordIndex;
		  
					 attribute float wordIndex;
		  
					 attribute float letterIndex;
		  
					 // Varyings
					 varying vec2 vUv;
					 varying vec2 vLayoutUv;
					 varying vec3 vViewPosition;
					 varying vec3 vNormal;
		  
					 varying float vLineIndex;
		  
					 varying float vLineLettersTotal;
					 varying float vLineLetterIndex;
		  
					 varying float vLineWordsTotal;
					 varying float vLineWordIndex;
		  
					 varying float vWordIndex;
		  
					 varying float vLetterIndex;
		  
					 void main() {
						  // Output
						  vec4 mvPosition = vec4(position, 1.0);
						  mvPosition = modelViewMatrix * mvPosition;
						  gl_Position = projectionMatrix * mvPosition;
		  
						  // Varyings
						  vUv = uv;
						  vLayoutUv = layoutUv;
						  vViewPosition = -mvPosition.xyz;
						  vNormal = normal;
		  
						  vLineIndex = lineIndex;
		  
						  vLineLettersTotal = lineLettersTotal;
						  vLineLetterIndex = lineLetterIndex;
		  
						  vLineWordsTotal = lineWordsTotal;
						  vLineWordIndex = lineWordIndex;
		  
						  vWordIndex = wordIndex;
		  
						  vLetterIndex = letterIndex;
					 }
				`,
				fragmentShader: `
					 // Varyings
					 varying vec2 vUv;
					 varying vec2 vLayoutUv;
					 // Uniforms: Common
					 uniform float uProgress1;
					 uniform float uProgress2;
					 uniform float uProgress3;
					 uniform float uProgress4;
	
					 uniform float time;
					 uniform float uOpacity;
					 uniform float uThreshold;
					 uniform float uAlphaTest;
					 uniform vec3 uColor;
					 uniform sampler2D uMap;
		  
					 // Uniforms: Strokes
					 uniform vec3 uStrokeColor;
					 uniform float uStrokeOutsetWidth;
					 uniform float uStrokeInsetWidth;
		  
					 // Utils: Median
					 float median(float r, float g, float b) {
						  return max(min(r, g), min(max(r, g), b));
					 }
	
					 
					float rand(vec2 n) { 
						return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
					}
	
	
					float rand(float n){return fract(sin(n) * 43758.5453123);}
	
					float noise(float p){
						float fl = floor(p);
					float fc = fract(p);
						return mix(rand(fl), rand(fl + 1.0), fc);
					}
						
					float noise(vec2 n) {
						const vec2 d = vec2(0.0, 1.0);
					vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
						return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
					}
					float map(float value, float min1, float max1, float min2, float max2) {
					return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
					}
	
		  
					 void main() {
						  // Common
						  // Texture sample
						  vec3 s = texture2D(uMap, vUv).rgb;
		  
						  // Signed distance
						  float sigDist = median(s.r, s.g, s.b) - 0.5;
		  
						  float afwidth = 1.4142135623730951 / 2.0;
		  
						  #ifdef IS_SMALL
								float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
						  #else
								float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
						  #endif
		  
						  // Strokes
						  // Outset
						  float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;
		  
						  // Inset
						  float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;
		  
						  #ifdef IS_SMALL
								float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
								float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
						  #else
								float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
								float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
						  #endif
		  
						  // Border
						  float border = outset * inset;
		  
						  // Alpha Test
						  if (alpha < uAlphaTest) discard;
		  
						  // Some animation
						  //alpha *= sin(uTime);
		  
						  // Output: Common
		  
						  vec4 filledFragColor = vec4(uColor, uOpacity * alpha);
					
						  //i might use border for border text => vec4 l1 = vec4(0., 0., 0., border);
	
						  vec3 pink = vec3(2.0, 0.1, 0.4);
					
						  vec4 l1 = vec4(1., 1., 1., border );
						vec4 l2 = vec4(pink, border);
						vec4 l3 = vec4(pink, outset);
						vec4 l4 = vec4(vec3(1.), outset);
	
	
						float x = floor(vLayoutUv.x * 10. * 3.8);
						float y = floor(vLayoutUv.y * 10.);
	
						float pattern = noise(vec2(x,y));
	
						float w = 1.;
						
	
						float p1 = uProgress1;
						p1 = map(p1, 0., 1., -w, 1.);
						p1 = smoothstep(p1, p1 + w, vLayoutUv.x);
					
						float mix1 =2. * p1 -pattern;
	
						mix1 = clamp(mix1, 0., 1.);
	
	
	
	
	
						float p2 = uProgress1 - 0.4 ;
						p2 = map(p2, 0., 1., -w, 1.);
						p2 = smoothstep(p2, p2 + w, vLayoutUv.x);
					
						float mix2 =2. * p2 -pattern;
	
						mix2 = clamp(mix2, 0., 1.);
	
	
	
						float p3 = uProgress1 - 0.6;
						p3 = map(p3, 0., 1., -w, 1.);
						p3 = smoothstep(p3, p3 + w, vLayoutUv.x);
					
						float mix3 =2. * p3 -pattern;
	
						mix3 = clamp(mix3, 0., 1.);
	
	
	
	
						float p4 = uProgress1 - .8;
						p4 = map(p4, 0., 1., -w, 1.);
						p4 = smoothstep(p4, p4 + w, vLayoutUv.x);
					
						float mix4 =2. * p4 -pattern;
	
						mix4 = clamp(mix4, 0., 1.);
	
	
	
						vec4 layer0 = mix(vec4(0.), l1, 1. - mix1);
						vec4 layer1 = mix(layer0, l2, 1. - mix2);
						vec4 layer2 = mix(layer1, l3, 1. - mix3);
						vec4 layer3 = mix(layer2, l4, 1. - mix4);
	
				 
	
						//   gl_FragColor = filledFragColor;
						//   gl_FragColor = vec4(uProgress1 * 1.0, 0., 0., 1.0);
						//   gl_FragColor = l1;
						//   gl_FragColor = vec4(vec3(pattern), 1.);
						//   /gl_FragColor = vec4(vec3(p0_), 1.);
						  gl_FragColor = layer3;
	
						 // gl_FragColor = vec4(vLayoutUv, 0., 1.);
				 
	
					 }
				`,
		  });
	 
	
			Promise.all([
				loadFontAtlas(atlasURL),
			 
		  ]).then(([atlas, font]:any) => {
				this.materialText.uniforms.uMap.value = atlas;
				let s = 0.004


				const geometry = this.createTextGeometry('social', 37)	
		  		this.mesh = new THREE.Mesh(geometry, this.materialText);
			   this.mesh.scale.set(s,-s,s)
				this.mesh.position.x = -1
				this.mesh.position.y = .2

	 
				const geometry1 = this.createTextGeometry('network', 37)
			   this.mesh1 = new THREE.Mesh(geometry1, this.materialText);
			   this.mesh1.scale.set(s,-s,s)
				this.mesh1.position.x = -.85
				this.mesh1.position.y = .05
				 

				const geometry2 = this.createTextGeometry('company', 37)
			   this.mesh2 = new THREE.Mesh(geometry2, this.materialText);
			   this.mesh2.scale.set(s,-s,s)
				this.mesh2.position.x = -.95
				this.mesh2.position.y = -0.1


				const geometry3 = this.createTextGeometry('Lorem lskd o rel kjdkjfsl dslkfjsaj aljk djl jfkds jsdk jdkfjldfkjd', 37)
			   this.mesh3 = new THREE.Mesh(geometry3, this.materialText);
			   let s1 = 0.0007
			   this.mesh3.scale.set(s1,-s1,s1)
				this.mesh3.geometry.center()
				this.mesh3.position.y = -0.4
				this.mesh3.position.z = .12


				this.responsiveText()

				
	
				this.scene.add(this.mesh)
				this.scene.add(this.mesh1)
				this.scene.add(this.mesh2)
				this.scene.add(this.mesh3)
				
				this.eraseOrAddText(4, 1.8)
		  });
		  
		  function loadFontAtlas(path:any) {
				const promise = new Promise((resolve, reject) => {
					 const loader = new THREE.TextureLoader();
					 loader.load(path, resolve);
				});
		  
				return promise;
		  }

	
 
		}
		confirmAccount() {
			
			this.scene.remove(this.mesh5)
			this.scene.remove(this.mesh6)
			this.scene.remove(this.mesh7)
			this.mesh5 = null
			this.mesh6 = null
			this.mesh7 = null

			this.addRegisterText(true)

		}
		addRegisterText(isConfirm = false) {
			 
			// if letters already created then we just set positions for this letters
			if(this.mesh5) {
				this.mesh5.position.y = 0.4
				this.mesh6.position.y = 0.32
				if(this.width <= 480 || this.height < 730) {
					this.mesh7.position.y = .24
				} else {
					this.mesh7.position.y = 0.2
				} 
				return
			}
			
			
			gsap.to(this.tubesGeometryGroup.rotation, {
				duration:   3,
				x: this.width <= 1000 ? Math.PI / 7 : Math.PI / 15,
				ease: "power1.out"
			})

			this.scene.remove(this.mesh)
			this.scene.remove(this.mesh1)
			this.scene.remove(this.mesh2)
			this.scene.remove(this.mesh3)
			let s = 0.0018

			const geometry = this.createTextGeometry(isConfirm ? 'confirm' : 'registration', 37)
		  	this.mesh5 = new THREE.Mesh(geometry, this.materialText);
			this.mesh5.scale.set(s,-s,s)
			this.mesh5.position.y = 0.4
			this.mesh5.position.x = -.4

			const geometry1 = this.createTextGeometry('account', 37)
			this.mesh6 = new THREE.Mesh(geometry1, this.materialText);
			this.mesh6.scale.set(s,-s,s)
			this.mesh6.position.y = 0.32
			this.mesh6.position.x = 0

			const geometry2 = this.createTextGeometry(isConfirm ? `we are send the message in 
			your gmail` : `create account and and jlskd jd 
			kfjslkdfjs ldkfja; slkdjf`, 42, true)
			this.mesh7 = new THREE.Mesh(geometry2, this.materialText);
			let s1 = 0.0006
			this.mesh7.scale.set(s1,-s1, s1)
			this.mesh7.position.y = 0.24
			this.mesh7.position.x = -0.25

			if(this.width < 550) {
				let s3 = 0.002
			
				///CREATE RESPONSIVE
				this.mesh5.scale.set(s3, -s3, s3)
				this.mesh6.scale.set(s3, -s3, s3)
				// this.mesh7.scale.set(s3, -s3, s3)
			}
			if(this.width <= 480) {
				let s3 = 0.0016
				let s2 = 0.0005
				///CREATE RESPONSIVE
				this.mesh5.position.x = -.27
				this.mesh6.position.x += -.02
				this.mesh7.position.x = -.18


				this.mesh5.scale.set(s3, -s3, s3)
				this.mesh6.scale.set(s3, -s3, s3)
				this.mesh7.scale.set(s2, -s2, s2)
			}
			if(this.width <= 350) {
				let s3 = 0.0013
				let s2 = 0.00043
				///CREATE RESPONSIVE
				this.mesh5.position.x = -.23
				this.mesh5.position.y = 0.38			
				// this.mesh6.position.x += -.02
				// this.mesh7.position.x = -.18


				this.mesh5.scale.set(s3, -s3, s3)
				this.mesh6.scale.set(s3, -s3, s3)
				this.mesh7.scale.set(s2, -s2, s2)
			}
			this.scene.add(this.mesh5)
			this.scene.add(this.mesh6)
			this.scene.add(this.mesh7)

			this.eraseOrAddText(4, 2)

		}
		addLoginText(err: any, err2: any) {
			// if letters already created then we just set positions for this letters
			
			if(err ) {
				this.scene.remove(this.mesh8)
				this.scene.remove(this.mesh9)
				this.mesh8 = ''
				this.mesh9 = ''


			}

			
			if(this.mesh8) {
				this.mesh8.position.y = 0.4
				this.mesh9.position.y = 0.32
				this.eraseOrAddText(4, 2)
				return
			}
			if(!err) {
				gsap.to(this.tubesGeometryGroup.rotation, {
					duration: 3,
					z: this.width <= 1000 ? Math.PI / 5 : Math.PI / 10,
					ease: "power1.out"
				})
			}
		 

			let s = 0.0018

			const geometry = this.createTextGeometry(err ? err : 'Login To', 37)
		  	this.mesh8 = new THREE.Mesh(geometry, this.materialText);
			this.mesh8.scale.set(s,-s,s)
			this.mesh8.position.y = 0.4
			this.mesh8.position.x = -.32

			const geometry1 = this.createTextGeometry(err2 ? err2 :'Account', 37)
			this.mesh9 = new THREE.Mesh(geometry1, this.materialText);
			this.mesh9.scale.set(s,-s,s)
			this.mesh9.position.y = 0.32
			this.mesh9.position.x = -0.02

			if(this.width <= 550) {
				let s3 = 0.0018
			
				///CREATE RESPONSIVE
				this.mesh8.scale.set(s3, -s3, s3)
				this.mesh9.scale.set(s3, -s3, s3)
				// this.mesh7.scale.set(s3, -s3, s3)
			}
			if(this.width <= 420) {
				this.mesh8.position.x = -.25
				this.mesh9.position.x = -.09
				
			}

			this.scene.add(this.mesh8)
			this.scene.add(this.mesh9)


			this.eraseOrAddText(4, 2)

		}
		showLettersRegister() {

			
			this.mesh6.position.y = 0.32
			this.mesh5.position.y = 0.4
			this.eraseOrAddText(4, 2)

		}
		hideLettersLogin() {
			
			
			
			this.eraseOrAddText(2, 0)
			setTimeout(() => {
				this.mesh8.position.y = 2
				this.mesh9.position.y = 2
			 
				this.showLettersRegister()
			 
			}, 2000)
			 

		}
		hideLettersRegister() {
			this.eraseOrAddText(2, 0)
			setTimeout(() => {
				this.mesh5.position.y = 2
				this.mesh6.position.y = 2
				this.mesh7.position.y = 2
				this.addLoginText()
			}, 2000)
		}

		mouseMove() {
			document.addEventListener('mousemove', event => {
				this.mouse.x = (event.clientX / this.width) * 2 - 1;
				this.mouse.y = - (event.clientY / this.height) * 2 + 1;
				if(this.materialSquares) this.materialSquares.uniforms.mouse.value = new THREE.Vector3(this.mouse.x, this.mouse.y, 0)
			});

	 
		}


		initPostProcessing() {
			this.composer = new EffectComposer(this.renderer)
			this.composer.addPass(new RenderPass(this.scene, this.camera))
		
			// DotScreenShader.uniforms.tMask = new THREE.TextureLoader().load(mask)
	
			this.effect1 = new ShaderPass(DotScreenShader)
			
			this.composer.addPass(this.effect1)
	


		}
		settings() {
			let that = this
		 
			this.settings = {
					//@ts-ignore
				progress: 0
			}
			//@ts-ignore
			this.gui = new GUI()
			this.gui.add(this.settings, 'progress', 0, 1, 0.01)
		}

		setupResize() {
			window.addEventListener('resize', this.resize.bind(this))
		}

		resize() {
			this.width = this.container.offsetWidth
			this.height = this.container.offsetHeight
			this.renderer.setSize(this.width, this.height)
			this.camera.aspect = this.width / this.height


			this.imageAspect = 853/1280
			let a1, a2
			if(this.height / this.width > this.imageAspect) {
				a1 = (this.width / this.height) * this.imageAspect
				a2 = 1
			} else {
				a1 = 1
				a2 = (this.height / this.width) / this.imageAspect
			} 


			this.materialTubes.uniforms.resolution.value.x = this.width
			this.materialTubes.uniforms.resolution.value.y = this.height
			this.materialTubes.uniforms.resolution.value.z = a1
			this.materialTubes.uniforms.resolution.value.w = a2


		 

			this.camera.updateProjectionMatrix()



		}
		
		getCurve(start: any):Array<any> {
			let scale = 10,
				points = []

			points.push(start)
			
			const currentPoint = start.clone()
			
			for (let i = 0; i < 3000; i++) {
				let v = this.computeCurl(currentPoint.x / scale, currentPoint.y / scale, currentPoint.z / scale) 
				currentPoint.addScaledVector(v, 0.001)
				points.push(currentPoint.clone())
			}
			return points
		}
		computeCurl(x: number,y: number,z: number) {
			const eps = 0.0001
			let curl = new THREE.Vector3()
		
		
			var n1 = noise3D(x, y + eps, z),
				n2 = noise3D(x, y - eps, z)
		
			let a = (n1 - n2) / (2 * eps)
			var n2 = noise3D(x, y, z + eps),
				n2 = noise3D(x, y, z - eps)
		
			let b = (n1 - n2) / (2 * eps)
			curl.x = a - b
		
			n1 = noise3D(x, y, z + eps)
			n2 = noise3D(x, y, z - eps)
			a = (n1 - n2) / (2 * eps)
			n1 = noise3D(x + eps, y,z)
			n2 = noise3D(x + eps, y,z)
			b = (n1 - n2) / (2 * eps)
			curl.y = a - b
		
			n1 = noise3D(x + eps, y,z)
			n2 = noise3D(x - eps, y,z)
			a = (n1 - n2) / (2 * eps)
			n1 = noise3D(x, y + eps, z)
			n2 = noise3D(x, y - eps, z)
			b = (n1 - n2) / (2 * eps)
			curl.z = a - b
 
			return curl
		
		
		}



		addTubes() {
			let that = this
			this.materialTubes = new THREE.ShaderMaterial({
				extensions: {
					derivatives: '#extension GL_OES_standard_derivatives : enable'
				},
				side: THREE.DoubleSide,
				uniforms: {
					time: {value: 0},
					resolution: {value: new THREE.Vector4()}
				},
				vertexShader: vertexShaderTubes,
				fragmentShader: fragmentShaderTubes
			})
			

			for (let i = 0; i < 40; i++) {
				const path = new THREE.CatmullRomCurve3(this.getCurve(new THREE.Vector3(
					 0 ,
					Math.random() - 0.5 ,
					Math.random() - 0.5,

				))),
					geometry = new THREE.TubeGeometry(path, 1000, 0.005, 8, false),
					curve = new THREE.Mesh(geometry, this.materialTubes)
					this.tubesGeometryGroup.add(curve)
					i === 39 &&	this.scene.add(this.tubesGeometryGroup)
					
			}

			this.tubesGeometryGroup.position.set(-1.7, -1.2, 0)
			// this.tubesGeometryGroup.rotateX(.4)
			// this.tubesGeometryGroup.rotateZ(-.5)
			this.tubesGeometryGroup.rotateY(-1.255)


			

		}
		addPlanes() {
			this.materialSquares = new THREE.ShaderMaterial({
				extensions: {
					derivatives: '#extension GL_OES_standard_derivatives : enable'
				},
				side: THREE.DoubleSide,
				uniforms: {
					time: {value: 0},
					mouse: {value: new THREE.Vector3() },
					opacity: {value: this.width < 1000 ? .3 : 0.2},
					resolution: {value: new THREE.Vector4()}
				},
				vertexShader: vertexShaderPlanes,
				transparent: true,
				fragmentShader: fragmentShaderPlanes
			})

			this.geometrySquares = new THREE.PlaneGeometry(0.1,.1)
			this.squares = new THREE.InstancedMesh(this.geometrySquares, this.materialSquares, this.count ** 2)
			let dummy = new THREE.Object3D()
			let counter = 0
			for (let i = -this.count/ 2; i < this.count / 2; i++) {
				for (let j = -this.count/ 2; j < this.count/ 2; j++) {
					dummy.position.set(i/10, j/ 10, 0)
					dummy.updateMatrix()
					this.squares.setMatrixAt(counter++, dummy.matrix)
					
				}
				
			}
			this.squares.position.z = 0.01
			this.scene.add(this.squares)
	

		}
	


	addLights() {
		const light1 = new THREE.AmbientLight(0xeeeeee, 0.5)
		this.scene.add(light1)
	
	
		const light2 = new THREE.DirectionalLight(0xeeeeee, 0.5)
		light2.position.set(0.5,0,0.866)
		this.scene.add(light2)
	}

	stop() {
		this.isPlaying = false
	}

	play() {
		if(!this.isPlaying) {
			this.isPlaying = true
			this.render()
		}
	}

	rotateObject() {

 

		const deltaX = this.mouse.x - this.prevMouse.x,
			deltaY = this.mouse.y - this.prevMouse.y

		this.tubesGeometryGroup.rotation.y += deltaX * 0.01
		this.tubesGeometryGroup.rotation.x += deltaY * 0.01

		this.prevMouse.x = this.mouse.x
		this.prevMouse.y = this.mouse.y



	}



	render() {
			if(!this.isPlaying) return
			this.rotateObject()
			this.time += 0.05
			this.materialTubes.uniforms.time.value = this.time * 3
			if(this.materialSquares ) this.materialSquares.uniforms.time.value = this.time / 2
			if(this.materialTornado) this.materialTornado.uniforms.time.value = this.time 
			if(this.groupTornado) this.groupTornado.rotation.z = this.time / 30


		
			if(this.animated) {

				this.animated.forEach((o:any) => {

					o.material.uniforms.time.value = this.time / 2
					o.material1.uniforms.time.value = this.time / 2
	
				
				})
			}


			// if(this.changeBGIsStart) this.changeBG()
			// const colorStart = new THREE.Color(0x000000); // Starting color
			// const colorEnd = new THREE.Color(0xff0000); // Ending color
			// const duration = 1000; // Duration of the color transition in milliseconds
			// const progress = Math.sin(this.time / duration); // Calculate progress using sine function
			
			// // Interpolate the colors based on the progress
			// const colorInterpolated = new THREE.Color();
			// colorInterpolated.copy(colorStart).lerp(colorEnd, progress);
			
			// this.scene.background = colorInterpolated;
			//this.renderer.setRenderTarget(this.renderTarget)
			// this.renderer.render(this.scene, this.camera)
			this.composer.render()

			//this.renderer.setRenderTarget(null)
	
			requestAnimationFrame(this.render.bind(this))
		}
 
	}
 
 