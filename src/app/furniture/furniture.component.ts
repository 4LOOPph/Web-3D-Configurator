import { Component, OnInit } from '@angular/core';

declare let THREE: any;
declare let Detector: any;

@Component({
	selector: 'app-furniture',
	templateUrl: './furniture.component.html',
	styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {
	title = 'app';
	appModels: any = "";
	currentObject: any;
	currentScene: any;

	functionModalChair: any;
	functionModelOfficeChair: any;
	functionModelBed: any;

	constructor() {

	}

	ngOnInit() {
		console.log('ngInit')
		if (!Detector.webgl) Detector.addGetWebGLMessage();

		this.initGUI();
	}

	initGUI() {
		let color = 0x000000;
		let group = new THREE.Group();
		let objects: any[] = [];
		let backgroundMesh: any;
		let texturePainting: any;
		let controls: any;

		let innerW = document.getElementById('rendererDiv').offsetWidth;
		let innerH = document.getElementById('rendererDiv').offsetHeight;
		let appModel = localStorage.getItem('app.model');
		let appTextureTop = localStorage.getItem('app.texture.top');
		let appTextureLegs = localStorage.getItem('app.texture.legs');
		console.log('appModel: ', appModel);
		console.log('appTextureTop: ', appTextureTop);
		console.log('appTextureLegs: ', appTextureLegs);

		if (appModel) {
			this.appModels = appModel;
		}

		let scene = new THREE.Scene();
		this.currentScene = scene;
		let camera = new THREE.PerspectiveCamera(75, innerW / window.innerHeight, 0.1, 1000);
		camera.position.z = 250;
		// camera.position.x = 400;
		// camera.position.y = 150;
		camera.lookAt(new THREE.Vector3(10, 10, 50));

		let light = new THREE.PointLight(0xEEEEEE);
		light.position.set(20, 0, 20);
		scene.add(light);

		let lightAmb = new THREE.AmbientLight(0x777777);
		scene.add(lightAmb);

		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(innerW, window.innerHeight);
		document.getElementById('renderHere').style.cssText = 'margin-right: 50px; border: 1px solid black;';
		document.getElementById('renderHere').appendChild(renderer.domElement);

		let boundingBox = new THREE.Box3();

		if (appModel === 'chair') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelChair()
				})
			);

			if (appTextureTop === '1') {
				texturePainting = new THREE.TextureLoader().load("textures/water.jpg");
				texturePainting.wrapS = THREE.RepeatWrapping;
				texturePainting.wrapT = THREE.RepeatWrapping;
				texturePainting.repeat.set(4, 4);
			}
		} else if (appModel === 'officechair') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelOfficeChair()
				})
			);

			if (appTextureTop === '1') {
				texturePainting = new THREE.TextureLoader().load("assets/img/table/top/1.jpg");
				texturePainting.wrapS = THREE.RepeatWrapping;
				texturePainting.wrapT = THREE.RepeatWrapping;
				texturePainting.repeat.set(4, 4);

			} else if (appTextureTop === '2') {
				texturePainting = new THREE.TextureLoader().load("assets/img/table/top/1.jpg");
				texturePainting.wrapS = THREE.RepeatWrapping;
				texturePainting.wrapT = THREE.RepeatWrapping;
				texturePainting.repeat.set(4, 4);
			}
		} else if (appModel === 'bed') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelBed()
				})
			);
		} else {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10)
			);
		}

		backgroundMesh.material.depthTest = false;
		backgroundMesh.material.depthWrite = true;

		this.currentObject = backgroundMesh;

		let backgroundScene = new THREE.Scene();
		let backgroundCamera = new THREE.Camera();
		backgroundScene.add(backgroundCamera);
		backgroundScene.add(backgroundMesh);

		window.addEventListener('resize', onWindowResize, false);

		function modelChair() {
			let mtlLoaderChair = new THREE.MTLLoader();
			mtlLoaderChair.setBaseUrl('assets/models/chair/');
			mtlLoaderChair.setPath('assets/models/chair/');
			mtlLoaderChair.load('chair.mtl', function (materials) {
				materials.preload();
				materials.materials.fusta_taula.map.magFilter = THREE.NearestFilter;
				materials.materials.fusta_taula.map.minFilter = THREE.LinearFilter;

				let objLoaderChair = new THREE.OBJLoader();
				objLoaderChair.setMaterials(materials);
				objLoaderChair.setPath('assets/models/chair/');
				objLoaderChair.load('chair.obj', function (object) {
					object.scale.set(400, 400, 400);
					// <position object>
					object.position.x = 140;
					object.position.y = -100;
					object.position.z = 70;
					object.rotation.y = 0;

					boundingBox.setFromObject(object);
					var center = boundingBox.getCenter();
					controls.target = center;

					scene.add(object);
					camera.position.z = 500;
				});

			});
			// ---------------BOX GUIDE HERE
			var geometry = new THREE.BoxGeometry(50, 50, 50);
			var material = new THREE.MeshBasicMaterial({
				color: '#c0c0c0',
			});
			var mesh = new THREE.Mesh(
				geometry,
				material
			);
			scene.add(mesh);
			// ---------------	
		};
		this.functionModalChair = modelChair;

		function modelBed() {
			let mtlLoaderBed = new THREE.MTLLoader();
			mtlLoaderBed.setBaseUrl('assets/models/bed/');
			mtlLoaderBed.setPath('assets/models/bed/');
			mtlLoaderBed.load('juniorBed.mtl', function (materials) {

				materials.preload();
				// materials.materials.Wood.map.magFilter = THREE.NearestFilter;
				// materials.materials.Wood.map.minFilter = THREE.LinearFilter;

				let objLoaderBed = new THREE.OBJLoader();
				objLoaderBed.setMaterials(materials);
				objLoaderBed.setPath('assets/models/bed/');
				objLoaderBed.load('juniorBed.obj', function (object) {
					object.scale.set(1, 1, 1);
					// object.position.x = -15;
					// object.position.y = -150;
					// object.position.z = 10;

					object.rotation.y = -4.7;
					scene.add(object);
				});
			});

			// ---------------BOX GUIDE HERE
			var geometry = new THREE.BoxGeometry(50, 50, 50);
			var material = new THREE.MeshBasicMaterial({
				color: '#c0c0c0',
			});
			var mesh = new THREE.Mesh(
				geometry,
				material
			);
			scene.add(mesh);
			// ---------------	
		};
		this.functionModelBed = modelBed;

		function modelOfficeChair() {
			let mtlLoaderOfficeChair = new THREE.MTLLoader();
			mtlLoaderOfficeChair.setBaseUrl('assets/models/office_chair/');
			mtlLoaderOfficeChair.setPath('assets/models/office_chair/');
			mtlLoaderOfficeChair.load('office_chair.mtl', function (materials) {
				materials.preload();

				if (texturePainting) {
					console.log('texturePainting: ', texturePainting);
					materials.map = texturePainting;
				}

				let objLoaderOfficeChair = new THREE.OBJLoader();
				objLoaderOfficeChair.setMaterials(materials);
				objLoaderOfficeChair.setPath('assets/models/office_chair/');
				objLoaderOfficeChair.load('office_chair.obj', function (object) {
					object.scale.set(260, 260, 260);
					object.position.x = 120;
					object.position.y = -50;
					object.position.z = 95;
					scene.add(object);
					camera.position.z = 600;
				});
			});

			// ---------------BOX GUIDE HERE
			var geometry = new THREE.BoxGeometry(50, 50, 50);
			var material = new THREE.MeshBasicMaterial({
				color: '#c0c0c0',
			});
			var mesh = new THREE.Mesh(
				geometry,
				material
			);
			scene.add(mesh);
			// ---------------	
		};
		this.functionModelOfficeChair = modelOfficeChair;

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

		let animate = function () {
			requestAnimationFrame(animate);

			if (color < 0xdddddd) color += 0x0000ff;
			renderer.autoClear = false;
			renderer.clear();

			if (appModel) {
				renderer.render(backgroundScene, backgroundCamera);
			}
			camera.lookAt(scene.position);
			renderer.render(scene, camera);
		};

		animate();
	}

	selectModel() {
		localStorage.setItem('app.model', this.appModels);
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
			case "chair":
				this.functionModalChair();
				break;
			case "officechair":
				this.functionModelOfficeChair();
				break;
			default:
				this.functionModelBed();
				break;
		}
	}

	setTextureTop(texture) {
		localStorage.setItem('app.texture.top', texture);
		location.reload()
	}

	setTextureLegs(texture) {
		localStorage.setItem('app.texture.legs', texture);
		location.reload()
	}
}
