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

	tableObject: any;

	functionModalChair: any;
	functionModelOfficeChair: any;
	functionModelBed: any;
	functionModelTest: any;
	functionModelSofa: any;

	constructor() {

	}

	ngOnInit() {
		if (!Detector.webgl) Detector.addGetWebGLMessage();

		this.initGUI();
	}

	initGUI() {
		let color = 0x000000;
		let group = new THREE.Group();
		let objects: any[] = [];
		let backgroundMesh: any;
		let texturePainting: any;
		let texturePainting2: any;
		let texturePainting_Table: any;

		let controls: any;
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

		let scene = new THREE.Scene();
		this.currentScene = scene;
		let camera = new THREE.PerspectiveCamera(75, innerW / window.innerHeight, 0.1, 1000);
		camera.position.z = 250;
		// camera.position.x = 400;
		// camera.position.y = 150;
		camera.lookAt(new THREE.Vector3(10, 10, 50));

		let light = new THREE.PointLight(0xEEEEEE);
		//light.position.set(20, 0, 20);
		light.position.y = 300;
		scene.add(light);

		let lightAmb = new THREE.AmbientLight(0x777777);
		scene.add(lightAmb);

		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(innerW, window.innerHeight);
		document.getElementById('renderHere').style.cssText = 'margin-right: 50px; border: 1px solid black;';
		document.getElementById('renderHere').appendChild(renderer.domElement);

		let url: string = "assets/img/table/top/" + appTextureTop + ".jpg";
		let url2: string = "assets/img/table/" + appTextureLegs + ".jpg";


		const textureLoader = new THREE.TextureLoader();
		textureLoader.crossOrigin = "Anonymous";
		texturePainting = textureLoader.load(url);
		texturePainting2 = textureLoader.load(url2);


		/* texturePainting = THREE.ImageUtils.loadTexture(url);
		texturePainting2 = THREE.ImageUtils.loadTexture(url2); */

		texturePainting.wrapS = THREE.RepeatWrapping;
		texturePainting.wrapT = THREE.RepeatWrapping;
		texturePainting.repeat.set(4, 4, 4);

		texturePainting2.wrapS = THREE.RepeatWrapping;
		texturePainting2.wrapT = THREE.RepeatWrapping;
		texturePainting2.repeat.set(4, 4, 4);


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
		} else if (appModel === 'table') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelNewTable()
				})
			);
		} else if (appModel === 'sofa') {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10),
				new THREE.MeshBasicMaterial({
					map: modelSofa()
				})
			);
		} else {
			backgroundMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(10, 10, 10, 10)
			);
		}
		backgroundMesh.material.depthTest = false;
		backgroundMesh.material.depthWrite = true;
		console.log('backgroundMesh: ', backgroundMesh);

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
			mtlLoaderChair.load('chair.mtl', function(materials) {
				materials.preload();

				materials.materials.fusta_taula.map.magFilter = THREE.NearestFilter;
				materials.materials.fusta_taula.map.minFilter = THREE.LinearFilter;


				let objLoaderChair = new THREE.OBJLoader();
				objLoaderChair.setMaterials(materials);
				objLoaderChair.setPath('assets/models/chair/');
				objLoaderChair.load('chair.obj', function(object) {
					object.scale.set(400, 400, 400);
					// <position object>
					center3DModel(object);

					object.rotation.y = 0;
					camera.position.z = 500;

					object.traverse(function(child) {
						console.log('chld', child.material);
						if (child.material) {
							// SEAT
							if (child.material.name === 'coixi_cadira') {
								if (texturePainting) {
									child.material.map = texturePainting;
									child.material.needsUpdate = true;
								}
							}

							// LEGS
							if (child.material.name === 'fusta_taula') {
								if (texturePainting2) {
									child.material.map = texturePainting2;
									child.material.needsUpdate = true;
								}
							}
							child.material.needsUpdate = true;
						}
					});
					object.updateMatrix();


					scene.add(object);
				});
			});

		};
		this.functionModalChair = modelChair;

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
					object.scale.set(2, 2, 2);
					// <position object>
					center3DModel(object);
					object.rotation.y = -4.7;

					object.traverse(function(child) {
						console.log('chld', child.material);
						if (child.material) {
							console.log('chld', child.material);
							// PILLOW
							if (child.material.name === 'pillow') {
								if (texturePainting) {
									child.material.map = texturePainting;
									child.material.needsUpdate = true;
									// child.material.color.setRGB(0, 54, 135);
								}
							}

							if (child.material.name === 'couch') {
								if (texturePainting) {
									child.material.map = texturePainting;
									// child.material.color.setRGB(0, 54, 135);
								}
							}

							// WOOD
							if (child.material.name === 'Wood') {
								if (texturePainting2) {
									child.material.map = texturePainting2;
									child.material.needsUpdate = true;
								}
							}
							child.material.needsUpdate = true;
						}
					});


					scene.add(object);
				});
			});
		};
		this.functionModelBed = modelBed;

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
					object.scale.set(260, 260, 260);
					// <position object>
					center3DModel(object);
					camera.position.z = 600;

					object.traverse(function(child) {
						if (child.material) {
							console.log('chld', child.material);
							// SEAT
							if (child.material.name === 'tela_sillon_azul') {
								if (texturePainting) {
									child.material.map = texturePainting;
									child.material.needsUpdate = true;
								}
							}

							if (child.material.name === 'plastico_gris') {
								if (texturePainting2) {
									// child.material.map = texturePainting2;
									// child.material.color.setRGB(0, 54, 135);
								}
							}
							child.material.needsUpdate = true;
						}
					});

					scene.add(object);
				});
			});
		};
		this.functionModelOfficeChair = modelOfficeChair;

		function modelNewTable() {
			let mtlLoaderOfficeChair = new THREE.MTLLoader();
			mtlLoaderOfficeChair.setBaseUrl('assets/models/Table/');
			mtlLoaderOfficeChair.setPath('assets/models/Table/');
			mtlLoaderOfficeChair.load('table.mtl', function(materials) {
				materials.preload();

				let objLoaderOfficeChair = new THREE.OBJLoader();
				objLoaderOfficeChair.setMaterials(materials);
				objLoaderOfficeChair.setPath('assets/models/Table/');
				objLoaderOfficeChair.load('table.obj', function(object) {
					object.scale.set(260, 260, 260);
					// <position object>
					center3DModel(object);
					camera.position.z = 600;

					// tableObject = object;
					object.traverse(function(child) {
						if (child.material) {
							console.log('chld', child.material);
							if (texturePainting2) {
								child.material.map = texturePainting2;
								// child.material.color.setRGB(0, 54, 135);
							}
							child.material.needsUpdate = true;
						}
					});

					object.updateMatrix();
					scene.add(object);
				});
			});
		};
		this.tableObject = tableObject;

		function modelSofa() {
			const _textureLoader = new THREE.TextureLoader();
			let objLoaderOfficeChair = new THREE.OBJLoader();
			objLoaderOfficeChair.setPath('assets/models/Sofa_FBX/');
			objLoaderOfficeChair.load('Sofa.obj', function(object) {
				object.scale.set(260, 260, 260);

				center3DModel(object);
				camera.position.z = 600;

				object.traverse(function(child) {
					if (child.material) {
						if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {							
							child.material.map = _textureLoader.load('assets/models/Sofa_FBX/Sofa_AlbedoTransparency.png');
							child.material.aoMap = _textureLoader.load('assets/models/Sofa_FBX/Sofa_AO.png');
							child.material.metalnessMap = _textureLoader.load('assets/models/Sofa_FBX/Sofa_MetallicSmoothness.png');
							child.material.normalMap = _textureLoader.load('assets/models/Sofa_FBX/Sofa_Normal.png');
						}
						child.material.needsUpdate = true;
					}
				});

				object.updateMatrix();
				scene.add(object);
			});
		}
		this.functionModelSofa = modelSofa;

		this.functionModelTest = modelNewTable;

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
		this.showModel(this.appModels);
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
			case "bed":
				this.functionModelBed();
				break;
			case "table":
				this.functionModelTest();
				break;
			case "sofa":
				this.functionModelSofa();
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
