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

		let innerW = document.getElementById('rendererDiv').offsetWidth;
		let innerH = document.getElementById('rendererDiv').offsetHeight;
		let appModel = localStorage.getItem('app.model');
		console.log('appModel: ', appModel);
		if (appModel) {
			this.appModels = appModel;
		}

		let scene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera(75, innerW / window.innerHeight, 0.1, 1000);
		camera.position.z = 100;
		camera.position.x = 400;
		camera.position.y = 150;
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		let light = new THREE.PointLight(0xEEEEEE);
		light.position.set(20, 0, 20);
		scene.add(light);

		let lightAmb = new THREE.AmbientLight(0x777777);
		scene.add(lightAmb);

		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(innerW, window.innerHeight);
		document.getElementById('renderHere').appendChild(renderer.domElement);

		if (appModel === 'chair') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelChair()
				})
			);
		} else if (appModel === 'officechair') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelOfficeChair()
				})
			);
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
					// object.rotation.x = Math.PI / 2;
					// object.rotation.y = Math.PI / 2;
					// object.rotation.x = .01;

					// <position object>
					object.position.x = 140;
					object.position.y = -100;
					object.position.z = 70;

					scene.add(object);
				});
			});
				
		};

		function modelBed() {
			let mtlLoaderBed = new THREE.MTLLoader();
			mtlLoaderBed.setBaseUrl('assets/models/bed/');
			mtlLoaderBed.setPath('assets/models/bed/');
			mtlLoaderBed.load('juniorBed.mtl', function(materials) {

				materials.preload();
				materials.materials.Wood.map.magFilter = THREE.NearestFilter;
				materials.materials.Wood.map.minFilter = THREE.LinearFilter;

				let objLoaderBed = new THREE.OBJLoader();
				objLoaderBed.setMaterials(materials);
				objLoaderBed.setPath('assets/models/bed/');
				objLoaderBed.load('juniorBed.obj', function(object) {
					object.position.x = 35;
					object.position.y = -43;
					object.position.z = 230;
					object.scale.set(1, 1, 1);
					object.rotation.x = .01;
					object.rotation.y = -4.7;
					scene.add(object);
				});
			});
		};

		function modelCycle() {
			let mtlLoaderBed = new THREE.MTLLoader();
			mtlLoaderBed.setBaseUrl('assets/models/cycle/');
			mtlLoaderBed.setPath('assets/models/cycle/');
			mtlLoaderBed.load('cycle_model_01.mtl', function(materials) {
				materials.preload();
				let objLoaderBed = new THREE.OBJLoader();
				objLoaderBed.setMaterials(materials);
				objLoaderBed.setPath('assets/models/cycle/');
				objLoaderBed.load('cycle_model_01.obj', function(object) {
					object.position.x = 35;
					object.position.y = 112;
					object.scale.set(15, 15, 15);
					scene.add(object);
				});

			});
		};

		function modelHouse() {
			let mtlLoader = new THREE.MTLLoader();
			mtlLoader.setBaseUrl('assets/models/house/');
			mtlLoader.setPath('assets/models/house/');
			mtlLoader.load('house interior.mtl', function(materials) {
				materials.preload();
				let objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath('assets/models/house/');
				objLoader.load('house interior.obj', function(object) {
					object.position.x = 0;
					object.position.y = -40;
					object.position.z = 0;
					object.scale.set(1, 1, 1);
					scene.add(object);
				});

			});
		};

		function modelOfficeChair() {
			let mtlLoaderOfficeChair = new THREE.MTLLoader();
			mtlLoaderOfficeChair.setBaseUrl('assets/models/office_chair/');
			mtlLoaderOfficeChair.setPath('assets/models/office_chair/');
			mtlLoaderOfficeChair.load('office_chair.mtl', function(materials) {
				materials.preload();
				let objLoaderOfficeChair = new THREE.OBJLoader();
				objLoaderOfficeChair.setMaterials(materials);
				objLoaderOfficeChair.setPath('assets/models/office_chair/');
				objLoaderOfficeChair.load('office_chair.obj', function(object) {
					// object.position.x = -10;
					object.scale.set(400, 400, 400);
					// object.position.y = -40;
					// object.position.z = 270;
					// object.rotation.x = .01;
					// object.rotation.y = -4.7;
					scene.add(object);
				});
			});
		};


		function onWindowResize() {
			camera.aspect = innerW / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(innerW, window.innerHeight);
		}


		function control() {
			let controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = true;

			// controls.enableDamping = true;
			// controls.dampingFactor = 0.25;
			// controls.enableZoom = true;
			// controls.minPolarAngle = 0; // radians
			// controls.maxPolarAngle = Math.PI; // radians
			// controls.minAzimuthAngle = 0; // radians
			// controls.maxAzimuthAngle = Math.PI; // radians
		};

		control();

		let animate = function() {
			requestAnimationFrame(animate);

			if (color < 0xdddddd) color += 0x0000ff;
			renderer.autoClear = false;
			renderer.clear();

			if (appModel) {
				renderer.render(backgroundScene, backgroundCamera);
			}

			renderer.render(scene, camera);
		};

		animate();		
	}

	selectModel() {
		console.log('selectModel: ', this.appModels);
		localStorage.setItem('app.model', this.appModels);
		location.reload()
	}	

}
