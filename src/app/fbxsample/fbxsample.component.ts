import { Component, OnInit } from '@angular/core';


declare let THREE: any;
declare let Detector: any;

@Component({
  selector: 'app-fbxsample',
  templateUrl: './fbxsample.component.html',
  styleUrls: ['./fbxsample.component.css']
})
export class FbxsampleComponent implements OnInit {

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

    modelSofa()

    window.addEventListener('resize', onWindowResize, false);

    function modelSofa() {
      const _textureLoader = new THREE.TextureLoader();

      let objLoaderOfficeChair = new THREE.OBJLoader();
      objLoaderOfficeChair.setPath('assets/models/Sofa_FBX/');
      objLoaderOfficeChair.load('Sofa.obj', function (object) {
        object.scale.set(200, 200, 200);
        center3DModel(object);
        camera.position.z = 600;
        object.traverse(function (child) {
          if (child.material) {
            if (child instanceof THREE.Mesh) {
              console.log('THREE.Mesh');              
            }
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

}
