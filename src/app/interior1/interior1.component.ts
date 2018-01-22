import { Component, OnInit } from '@angular/core';

declare let THREE: any;
declare let Detector: any;

@Component({
  selector: 'app-interior1',
  templateUrl: './interior1.component.html',
  styleUrls: ['./interior1.component.css']
})
export class Interior1Component implements OnInit {

  title = 'app';
  appModels: any = "";
  currentObject: any;
  currentScene: any;

  constructor() { }

  ngOnInit() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    this.initGUI();
  }

  initGUI() {
    let color = 0x000000;
    let backgroundMesh: any;
    let _mesh: any;

    let innerW = document.getElementById('rendererDiv').offsetWidth;
    let innerH = document.getElementById('rendererDiv').offsetHeight;

    let camera, controls, scene, renderer;
    /* Camera */
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;
    camera.position.x = 400;
    camera.position.y = 150;

    /* Scene */
    scene = new THREE.Scene();

    var light = new THREE.PointLight(0xEEEEEE);
    light.position.set(20, 0, 20);
    scene.add(light);

    var lightAmb = new THREE.AmbientLight(0x777777);
    scene.add(lightAmb);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(innerW, window.innerHeight);
    document.getElementById('renderHere').style.cssText = 'margin-right: 50px; border: 1px solid black;';
    document.getElementById('renderHere').appendChild(renderer.domElement);

    // Load the background texture
    backgroundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 10, 10),
      new THREE.MeshBasicMaterial({
        map: modelHouse()
      })
    );

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = true;

    // Create your background scene
    var backgroundScene = new THREE.Scene();
    var backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(backgroundMesh);

    window.addEventListener('resize', onWindowResize, false);



    var onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log('onProgress: ',Math.round(percentComplete) + '% downloaded');
      }
    };

    var onError = function (xhr) {
      console.error('onError: ',xhr);
    };

    function modelHouse() {
      const _textureLoader = new THREE.TextureLoader();
      _textureLoader.crossOrigin = "Anonymous";

      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.setBaseUrl('assets/models/house/');
      mtlLoader.setPath('assets/models/house/');
      mtlLoader.load('house interior.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('assets/models/house/');
        objLoader.load('house interior.obj', function (object) {
          object.position.x = 0;
          object.position.y = -40;
          object.position.z = 0;
          object.scale.set(1, 1, 1);

          console.log('object: ', object.children);    
          object.traverse(function (child) {
            if (child.material) {
              // console.log('chld', child);
              // console.log('chld', child.material);
              if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
                // Floor
                if (child.name === 'Plane001'){
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/floor_uv_texture.jpg");
                  material.map = texture;
                  child.material = material;
                }
                // 2nd Floor
                if (child.name === 'Plane002') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/wall.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Wall
                if (child.name === 'Plane003') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/wall texture.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Wall Edge
                if (child.name === 'Box037') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/wall edge.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Painting 1
                if (child.name === 'Box038') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/IN UV PAINTING TEXTURE.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Painting 2
                if (child.name === 'Box043') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/IN UV PAINTING texture 2.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Painting 3
                if (child.name === 'Box044') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/IN UV PAINTING texture 3.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Stairs Steps
                if (child.name === 'Box013' || child.name === 'Box012' || child.name === 'Box011' || child.name === 'Box010' || child.name === 'Box009' || child.name === 'Box008' ||
                  child.name === 'Box007' || child.name === 'Box006' || child.name === 'Box005' || child.name === 'Box004' || child.name === 'Box003') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/stairs.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Table
                if (child.name === 'Box032') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/teble wood uv texture.jpg");
                  material.map = texture;
                  child.material = material;
                }

                // Long Sofa
                if (child.name === 'Box017') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/double sopha wood base bace uv .jpg");
                  material.map = texture;
                  child.material = material;
                }

                if (child.name === 'Box046' || child.name === 'Box022') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/double sopha wood right uv texture .jpg");
                  material.map = texture;
                  child.material = material;
                }

                if (child.name === 'Box020') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/double sopha wood back uv texture .jpg");
                  material.map = texture;
                  child.material = material;
                }

                if (child.name === 'Box019' || child.name === 'Box023' || child.name === 'Box021' || child.name === 'Box024' || child.name === 'Box025' || child.name === 'Box026') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  material.map = _textureLoader.load('assets/models/house/fabricdenim/FabricDenim003_COL_VAR1_3K.jpg');
                  material.metalnessMap = _textureLoader.load('assets/models/house/fabricdenim/FabricDenim003_COL_VAR2_3K.jpg');
                  material.normalMap = _textureLoader.load('assets/models/house/FabricDenim003_NRM_3K.jpg');
                  child.material = material;
                }


                // 2 Small Sofa
                if (child.material.name === 'sopha_wood_texture') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var texture = _textureLoader.load("assets/models/house/sopha wood uv texture.jpg");
                  material.map = texture;
                  child.material = material;
                }

                if (child.name === 'Box029' || child.name === 'Box027') {
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  material.map = _textureLoader.load('assets/models/house/fabricdenim/FabricDenim003_COL_VAR1_3K.jpg');
                  material.metalnessMap = _textureLoader.load('assets/models/house/fabricdenim/FabricDenim003_COL_VAR2_3K.jpg');
                  material.normalMap = _textureLoader.load('assets/models/house/FabricDenim003_NRM_3K.jpg');
                  child.material = material;
                }
              }
              
              child.material.needsUpdate = true;
            }
          });
          scene.add(object);
        });
      },onProgress, onError);
    }

    modelHouse();

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

      camera.lookAt(scene.position);

      renderer.render(backgroundScene, backgroundCamera);
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
