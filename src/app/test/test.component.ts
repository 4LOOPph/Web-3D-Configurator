import { Component, OnInit } from '@angular/core';

declare let THREE: any;
declare let Detector: any;

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


	constructor() { }

	ngOnInit() {
		if (!Detector.webgl) Detector.addGetWebGLMessage();

		this.initGUI();
	}

	initGUI() {
		if (!Detector.webgl) Detector.addGetWebGLMessage();

		let camera, scene, renderer, light, controls;
		let clock = new THREE.Clock();
		let mixers = [];

		let innerW = document.getElementById('rendererDiv').offsetWidth;
		let innerH = document.getElementById('rendererDiv').offsetHeight;

		init();

		function init() {
			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

			scene = new THREE.Scene();

			// grid
			let gridHelper = new THREE.GridHelper(28, 28, 0x303030, 0x303030);
			gridHelper.position.set(0, - 0.04, 0);
			scene.add(gridHelper);

			// model
			let manager = new THREE.LoadingManager();
			manager.onProgress = function (item, loaded, total) {
				console.log('onProgress: ', item, loaded, total);
			};

			let onProgress = function (xhr) {
				if (xhr.lengthComputable) {
					let percentComplete = xhr.loaded / xhr.total * 100;
					console.log('onProgress: ',Math.round(percentComplete) + '% downloaded');
				}
			};

			let onError = function (xhr) {
				console.error('onError: ',xhr);
			};

			let loader = new THREE.FBXLoader(manager);
			loader.load('assets/models/Musa_Chair_FBX/Musa_Chair.FBX', function (object) {
				object.mixer = new THREE.AnimationMixer(object);
				mixers.push(object.mixer);
				object.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
				let action = object.mixer.clipAction(object.animations[0]);
				action.play();
				scene.add(object);
			}, onProgress, onError);

			/* loader.load('models/fbx/nurbs.fbx', function (object) {
				scene.add(object);
			}, onProgress, onError); */

			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(innerW, window.innerHeight);
			document.getElementById('renderHere').style.cssText = 'margin-right: 50px; border: 1px solid black;';
			document.getElementById('renderHere').appendChild(renderer.domElement);

			// controls, camera
			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.target.set(0, 12, 0);
			camera.position.set(2, 18, 28);
			controls.update();

			window.addEventListener('resize', onWindowResize, false);

			light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
			light.position.set(0, 1, 0);
			scene.add(light);

			light = new THREE.DirectionalLight(0xffffff, 1.0);
			light.position.set(0, 1, 0);
			scene.add(light);

			animate();

		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		//
		function animate() {
			requestAnimationFrame(animate);
			if (mixers.length > 0) {
				for (let i = 0; i < mixers.length; i++) {
					mixers[i].update(clock.getDelta());
				}
			}
			render();
		}

		function render() {
			renderer.render(scene, camera);
		}
	}

}
