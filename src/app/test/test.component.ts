import { Component, OnInit } from '@angular/core';

declare let THREE: any;
declare let Detector: any;

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

	title = 'app';
	appModels: any = "";
	currentObject: any;
	currentScene: any;

	tableObject: any;

	functionModelSofa: any;
	functionModelBed_v1: any;


	constructor() { }

	ngOnInit() {
		if (!Detector.webgl) Detector.addGetWebGLMessage();

		this.initGUI();
	}

	initGUI() {
		let color = 0x000000;
		let backgroundMesh: any;
		let texturePainting: any;
		let texturePainting2: any;
		let texturePainting_Table: any;
		let _mesh: any;

		let tableObject = this;

		let innerW = document.getElementById('rendererDiv').offsetWidth;
		let innerH = document.getElementById('rendererDiv').offsetHeight;
		let appModel = localStorage.getItem('app.model');
		let appTextureTop = localStorage.getItem('app.texture.top');
		let appTextureLegs = localStorage.getItem('app.texture.legs');

		if (appModel) {
			this.appModels = appModel;
		}

		let camera, controls, scene, renderer;
		let lighting, ambient, keyLight, fillLight, backLight;
		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;

		/* Camera */
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 3;
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		/* Scene */
		scene = new THREE.Scene();
		this.currentScene = scene;
		lighting = false;

		ambient = new THREE.AmbientLight(0xffffff, 1.0);
		scene.add(ambient);

		keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
		keyLight.position.set(-100, 0, 100);

		fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
		fillLight.position.set(100, 0, 100);

		backLight = new THREE.DirectionalLight(0xffffff, 1.0);
		backLight.position.set(100, 0, -100).normalize();

		scene.add(keyLight);
		scene.add(fillLight);
		scene.add(backLight);


		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(innerW, window.innerHeight);
		document.getElementById('renderHere').style.cssText = 'margin-right: 50px; border: 1px solid black;';
		document.getElementById('renderHere').appendChild(renderer.domElement);

		if (appModel === 'sofa') {
			modelSofa()
		} else if (appModel === 'bed_v1') {
			modelBed_v1()
		}

		window.addEventListener('resize', onWindowResize, false);

		function modelSofa() {
			const _textureLoader = new THREE.TextureLoader();
			let objLoaderOfficeChair = new THREE.OBJLoader();
			objLoaderOfficeChair.setPath('assets/models/Sofa_FBX/');
			objLoaderOfficeChair.load('Sofa.obj', function(object) {
				object.scale.set(200, 200, 200);
				center3DModel(object);
				camera.position.z = 600;
				object.traverse(function(child) {
					if (child.material) {
						if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
							console.log('MeshPhongMaterial');
							child.material.map = _textureLoader.load('assets/models/Sofa_FBX/Sofa_AlbedoTransparency.png');
							child.material.aoMap = _textureLoader.load('assets/models/Sofa_FBX/Sofa_AO.png');
							child.material.metalnessMap = _textureLoader.load('assets/models/Sofa_FBX/Sofa_MetallicSmoothness.png');
							child.material.normalMap = _textureLoader.load('assets/models/Sofa_FBX/Sofa_Normal.png');
						}
						console.log('chld', child.material);
						child.material.needsUpdate = true;
					}
				});

				object.updateMatrix();
				scene.add(object);
			});
		}
		this.functionModelSofa = modelSofa;

		function modelBed_v1() {
			const _textureLoader = new THREE.TextureLoader();

			let mtlLoaderSofa = new THREE.MTLLoader();
			mtlLoaderSofa.setBaseUrl('assets/models/Bed_v1/');
			mtlLoaderSofa.setPath('assets/models/Bed_v1/');
			mtlLoaderSofa.load('Bed.mtl', function(materials) {
				materials.preload();
				console.log('materials', materials);

				let objLoaderOfficeChair = new THREE.OBJLoader();
				objLoaderOfficeChair.setMaterials(materials);
				objLoaderOfficeChair.setPath('assets/models/Bed_v1/');
				objLoaderOfficeChair.load('Bed.obj', function(object) {
					object.scale.set(260, 260, 260);

					center3DModel(object);
					camera.position.z = 600;

					object.traverse(function(child) {
						if (child.material) {
							if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
								console.log('MeshPhongMaterial');

								if (child.material.name === "Base") {
									child.material.map = _textureLoader.load('assets/models/Bed_v1/Bed_Base_AlbedoTransparency.jpg');
									child.material.aoMap = _textureLoader.load('assets/models/Bed_v1/Bed_Base_AO.jpg');
									child.material.metalnessMap = _textureLoader.load('assets/models/Bed_v1/Bed_Base_MetallicSmoothness.png');
									child.material.normalMap = _textureLoader.load('assets/models/Bed_v1/Bed_Base_Normal.jpg');
								}

								if (child.material.name === "Pillows") {
									child.material.map = _textureLoader.load('assets/models/Bed_v1/Bed_Pillows_AlbedoTransparency.jpg');
									child.material.metalnessMap = _textureLoader.load('assets/models/Bed_v1/Bed_Pillows_MetallicSmoothness.png');
									child.material.normalMap = _textureLoader.load('assets/models/Bed_v1/Bed_Pillows_Normal.jpg');
								}

								if (child.material.name === "Covers") {
									child.material.map = _textureLoader.load('assets/models/Bed_v1/Bed_Covers_AlbedoTransparency.jpg');
									child.material.aoMap = _textureLoader.load('assets/models/Bed_v1/Bed_Covers_AO.jpg');
									child.material.metalnessMap = _textureLoader.load('assets/models/Bed_v1/Bed_Covers_MetallicSmoothness.png');
									child.material.normalMap = _textureLoader.load('assets/models/Bed_v1/Bed_Covers_Normal.jpg');
								}
							}
							console.log('chld', child.material);
							child.material.needsUpdate = true;
						}
					});

					object.updateMatrix();
					scene.add(object);
				});
			});
		}
		this.functionModelBed_v1 = modelBed_v1;


		function onWindowResize() {
			camera.aspect = innerW / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(innerW, window.innerHeight);
		}

		function control() {
			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = true;

			controls.minDistance = 0;
			//controls.maxDistance = 3;
			controls.minPolarAngle = 0; // radians
			controls.maxPolarAngle = Math.PI; // radians
			controls.maxPolarAngle = Math.PI / 2;
		};

		control();

		let animate = function() {
			requestAnimationFrame(animate);

			// renderer.setClearColorHex(0xffffff, 1);
			renderer.autoClear = false;
			renderer.clear();

			if (appModel) {
				// renderer.render(backgroundScene, backgroundCamera);
			}
			camera.lookAt(scene.position);
			renderer.render(scene, camera);
		};

		animate();

		function center3DModel(object) {
			var thsOBJ = new THREE.Box3().setFromObject(object);
			var valX = (thsOBJ.getSize().x);
			var valY = (thsOBJ.getSize().y);
			var valZ = (thsOBJ.getSize().z);

			return object.position.set(((thsOBJ.getCenter().x) * -1), (valY * -1) / 2, ((thsOBJ.getCenter().z) * -1));
		}
	}

	selectModel() {
		localStorage.setItem('app.model', this.appModels);
		//this.showModel(this.appModels);
		//location.reload();
		console.log(this.appModels);
		for (let i = 0; i < this.currentScene.children.length; i++) {
			let child = this.currentScene.children[i];
			console.log(child);
			if (child.type === 'Group') {
				this.currentScene.remove(child);
				this.showModel(this.appModels);
				break;
			}
		}
	}

	showModel(model) {
		switch (model) {
			case "sofa":
				this.functionModelSofa();
				break;
			case "bed_v1":
				this.functionModelBed_v1();
				break;
			default:

				break;
		}
	}

	setTextureTop(texture) {
		if (texture == "tableture") {
			let url: string = "assets/models/Table/Gio_Normal.jpn";
			console.log(this.tableObject);
			const textureLoader = new THREE.TextureLoader();
			textureLoader.crossOrigin = "Anonymous";
			let texturePainting = textureLoader.load(url);

			this.tableObject.traverse(function(child) {
				if (child.material) {
					if (child.material.name == "MeshPhongMaterial") {
						if (texturePainting) {
							child.material.map = texturePainting;
							child.material.needsUpdate = true;
						}
					}
				}
			});
		} else {
			localStorage.setItem('app.texture.top', texture);
			location.reload()
		}
	}

	setTextureLegs(texture) {
		localStorage.setItem('app.texture.legs', texture);
		location.reload()
	}

}
