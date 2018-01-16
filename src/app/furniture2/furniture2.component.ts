import { Component, OnInit } from '@angular/core';

declare let THREE: any;
declare let Detector: any;

@Component({
	selector: 'app-furniture2',
	templateUrl: './furniture2.component.html',
	styleUrls: ['./furniture2.component.css']
})
export class Furniture2Component implements OnInit {

	constructor() { }

	ngOnInit() {

		if (!Detector.webgl) Detector.addGetWebGLMessage();

		this.initGUI();
	}

	initGUI() {
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
		lighting = false;

		ambient = new THREE.AmbientLight(0xffffff, 1.0);
		scene.add(ambient);

		keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
		keyLight.position.set(-100, 0, 100);

		fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
		fillLight.position.set(100, 0, 100);

		backLight = new THREE.DirectionalLight(0xffffff, 1.0);
		backLight.position.set(100, 0, -100).normalize();

		// scene.add(keyLight);
		// scene.add(fillLight);
		// scene.add(backLight);


		/* Model */

		/*let mtlLoaderBed = new THREE.MTLLoader();
		mtlLoaderBed.setBaseUrl('assets/models/bed/');
		mtlLoaderBed.setPath('assets/models/bed/');
		mtlLoaderBed.load('juniorBed.mtl', function(materials) {
			materials.preload();

			let objLoaderBed = new THREE.OBJLoader();
			objLoaderBed.setMaterials(materials);
			objLoaderBed.setPath('assets/models/bed/');
			objLoaderBed.load('juniorBed.obj', function(object) {
				object.rotation.x = .01;
				object.rotation.y = -4.7;
				scene.add(object);
			});
		});*/

		let mtlLoaderOfficeChair = new THREE.MTLLoader();
		mtlLoaderOfficeChair.setBaseUrl('assets/models/office_chair/');
		mtlLoaderOfficeChair.setPath('assets/models/office_chair/');
		mtlLoaderOfficeChair.load('office_chair.mtl', function(materials) {
			materials.preload();

			let objLoaderOfficeChair = new THREE.OBJLoader();
			objLoaderOfficeChair.setMaterials(materials);
			objLoaderOfficeChair.setPath('assets/models/office_chair/');
			objLoaderOfficeChair.load('office_chair.obj', function(object) {
				// object.scale.set(70, 70, 70);
				// object.position.y = -40;
				// object.position.z = 270;
				// object.rotation.x = .01;
				// object.rotation.y = -4.7;
				// object.updateMatrix();
				scene.add(object);
			});
		});


		// let mtlLoaderBed = new THREE.MTLLoader();
		// mtlLoaderBed.setBaseUrl('assets/models/female/');
		// mtlLoaderBed.setPath('assets/models/female/');
		// mtlLoaderBed.load('female-croupier-2013-03-26.mtl', function(materials) {
		// 	materials.preload();
		// 	console.log('materials: ', materials);
		// 	materials.materials.default.map.magFilter = THREE.NearestFilter;
		// 	materials.materials.default.map.minFilter = THREE.LinearFilter;

		// 	let objLoaderBed = new THREE.OBJLoader();
		// 	objLoaderBed.setMaterials(materials);
		// 	objLoaderBed.setPath('assets/models/female/');
		// 	objLoaderBed.load('female-croupier-2013-03-26.obj', function(object) {
		// 		scene.add(object);
		// 	});
		// });

		/* Renderer */
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

		document.getElementById('renderHere').appendChild(renderer.domElement);


		/* Controls */
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.25;
		controls.enableZoom = false;

		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('keydown', onKeyboardEvent, false);

		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function onKeyboardEvent(e) {
			if (e.code === 'KeyL') {
				lighting = !lighting;
				if (lighting) {
					ambient.intensity = 0.25;
					scene.add(keyLight);
					scene.add(fillLight);
					scene.add(backLight);
				} else {
					ambient.intensity = 1.0;
					scene.remove(keyLight);
					scene.remove(fillLight);
					scene.remove(backLight);
				}
			}
		}


		function render() {
			requestAnimationFrame(render);
			controls.update();
			renderer.render(scene, camera);
		}

		render();
	}

}
