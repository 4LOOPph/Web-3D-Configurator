import { Component, OnInit,NgZone } from '@angular/core';


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
  currentCamera: any;
  perspective: any = 'PerspectiveCamera';
  tableObject: any;

  functionModelSofa: any;
  functionModelBed_v1: any;


  constructor(public zone:NgZone) { }

  ngOnInit() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    this.initGUI();
  }

  initGUI() {
    let color = 0x000000;
    let backgroundMesh: any;
    let _mesh: any;
    let mouse = new THREE.Vector2();
    let rotSpeed = .01;
    let ctrl = this;
    let composer, effectFXAA, outlinePass, INTERSECTED;
    let selectedObjects = [];

    let innerW = document.getElementById('rendererDiv').offsetWidth;
    let innerH = document.getElementById('rendererDiv').offsetHeight;
    let appModel = localStorage.getItem('app.model');
    let appTextureTop = localStorage.getItem('app.texture.top');
    let appTextureLegs = localStorage.getItem('app.texture.legs');

    if (appModel) {
      this.appModels = appModel;
    }

    let camera, controls, scene, renderer, raycaster;
    let lighting, ambient, keyLight, fillLight, backLight;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    /* Camera */
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    // camera.position.z = 3;
    camera.position.set(0, 100, 3);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.currentCamera = camera;
    console.log('this.currentCamera', this.currentCamera);

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


    // renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerW, window.innerHeight);
    document.getElementById('renderHere').style.cssText = 'margin-right: 50px; border: 1px solid black;';
    document.getElementById('renderHere').appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();

    // postprocessing
    composer = new THREE.EffectComposer(renderer);

    var renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new THREE.OutlinePass(new THREE.Vector2(innerW, window.innerHeight), scene, camera);
    composer.addPass(outlinePass);

    effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / innerW, 1 / window.innerHeight);
    effectFXAA.renderToScreen = true;
    composer.addPass(effectFXAA);


    outlinePass.edgeStrength = 10;
    outlinePass.edgeGlow = 0.0;
    outlinePass.edgeThickness = 2;
    outlinePass.pulsePeriod = 0;
    outlinePass.usePatternTexture = false;
    outlinePass.visibleEdgeColor.set('#ffffff');
    outlinePass.hiddenEdgeColor.set('#190a05');


    if (appModel === 'sofa') {
      modelSofa();
    } else if (appModel === 'bed_v1') {
      modelBed_v1();
    } else {
      modelSofa();
    }

    setTimeout(() => {
      if (ctrl.currentCamera instanceof THREE.PerspectiveCamera) {
        ctrl.perspective = "CinematicCamera";
      } else {
        ctrl.perspective = "PerspectiveCamera";
      }
    }, 3000);


    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);


    function modelSofa() {
      const _textureLoader = new THREE.TextureLoader();
      var outlineMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.BackSide });

      let objLoaderOfficeChair = new THREE.OBJLoader();
      objLoaderOfficeChair.setPath('assets/models/Sofa_FBX/');
      objLoaderOfficeChair.load('Sofa.obj', function (object) {
        object.scale.set(200, 200, 200);
        center3DModel(object);
        camera.position.z = 600;

        var scale = 1.0;
        object.traverse(function (child) {
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

      let objLoaderOfficeChair = new THREE.OBJLoader();
      objLoaderOfficeChair.setPath('assets/models/Bed_v1/');
      objLoaderOfficeChair.load('Bed.obj', function (object) {
        object.scale.set(260, 260, 260);

        center3DModel(object);
        camera.position.z = 600;

        object.traverse(function (child) {
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
    }
    this.functionModelBed_v1 = modelBed_v1;


    function onWindowResize() {
      camera.aspect = innerW / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(innerW, window.innerHeight);
      composer.setSize(innerW, window.innerHeight);

      effectFXAA.uniforms['resolution'].value.set(1 / innerW, 1 / window.innerHeight);
    }

    function onTouchMove(event) {
      // console.log('onTouchMove: ', event.changedTouches)
      var x, y;
      if (event.changedTouches) {
        x = event.changedTouches[0].pageX;
        y = event.changedTouches[0].pageY;
      } else {
        x = event.clientX;
        y = event.clientY;
      }
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = - (y / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, ctrl.currentCamera);
      var intersects = raycaster.intersectObjects([scene], true);
      if (intersects.length > 0) {
        var selectedObject = intersects[0].object;
        addSelectedObject(selectedObject);
        outlinePass.selectedObjects = selectedObjects;
      } else {
        outlinePass.selectedObjects = [];
      }
    }

    function onMouseDown(event){
      if(event){
        ctrl.perspective = "PerspectiveCamera";
      }
    }

    function onMouseUp(event){
      if (event) {
        ctrl.perspective = "CinematicCamera";
      }
    }

    function addSelectedObject(object) {
      selectedObjects = [];
      selectedObjects.push(object);
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

    function animate() {
      requestAnimationFrame(animate);

      var x = ctrl.currentCamera.position.x,
        y = ctrl.currentCamera.position.y,
        z = ctrl.currentCamera.position.z;


      if (ctrl.perspective === 'PerspectiveCamera') {
        ctrl.currentCamera.lookAt(scene.position);
        renderer.render(scene, ctrl.currentCamera);
      } else{
        // RIGHT TO LEFT
        // ctrl.currentCamera.position.y = y * Math.cos(rotSpeed) + z * Math.sin(rotSpeed); // Enable this will rotate the object below
        ctrl.currentCamera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        ctrl.currentCamera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);

        // LEFT TO RIGHT
        /* ctrl.currentCamera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
        ctrl.currentCamera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed); */

        ctrl.currentCamera.lookAt(scene.position);
        ctrl.currentCamera.updateMatrixWorld();

        renderer.clear();
        renderer.render(scene, ctrl.currentCamera);
      }

      composer.render();
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
        this.functionModelSofa();
        break;
    }
  }

  setTextureTop(texture) {
    localStorage.setItem('app.texture.top', texture);
    location.reload();
  }

  setTextureLegs(texture) {
    localStorage.setItem('app.texture.legs', texture);
    location.reload()
  }

}
