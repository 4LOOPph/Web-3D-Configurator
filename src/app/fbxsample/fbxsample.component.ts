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



    let url: string = "assets/img/table/top/" + appTextureTop + ".jpg";
    let url2: string = "assets/img/table/" + appTextureLegs + ".jpg";

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "Anonymous";
    texturePainting = textureLoader.load(url);
    texturePainting2 = textureLoader.load(url2);

    texturePainting.wrapS = THREE.RepeatWrapping;
    texturePainting.wrapT = THREE.RepeatWrapping;
    texturePainting.repeat.set(4, 4, 4);

    texturePainting2.wrapS = THREE.RepeatWrapping;
    texturePainting2.wrapT = THREE.RepeatWrapping;
    texturePainting2.repeat.set(4, 4, 4);


    if (appModel === 'chair') {
      modelChair();
    } else if (appModel === 'officechair') {
      modelOfficeChair()
    } else if (appModel === 'bed') {
      backgroundMesh = new THREE.Mesh(
        modelBed()
      );
    } else if (appModel === 'table') {
      modelNewTable()
    } else if (appModel === 'sofa') {
      modelSofa()
    }

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
          center3DModel(object);

          object.rotation.y = 0;
          camera.position.z = 500;

          object.traverse(function (child) {
            // console.log('chld', child.material);
            if (child.material) {
              // SEAT
              if (child.material.name === 'coixi_cadira') {
                if (texturePainting) {
                  child.material.map = texturePainting;
                }
              }
              // LEGS
              if (child.material.name === 'fusta_taula') {
                if (texturePainting2) {
                  child.material.map = texturePainting2;
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
      mtlLoaderBed.load('juniorBed.mtl', function (materials) {

        materials.preload();
        materials.materials.Wood.map.magFilter = THREE.NearestFilter;
        materials.materials.Wood.map.minFilter = THREE.LinearFilter;

        let objLoaderBed = new THREE.OBJLoader();
        objLoaderBed.setMaterials(materials);
        objLoaderBed.setPath('assets/models/bed/');
        objLoaderBed.load('juniorBed.obj', function (object) {
          object.scale.set(2, 2, 2);
          // <position object>
          center3DModel(object);
          object.rotation.y = -4.7;

          object.traverse(function (child) {
            if (child.material) {
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
      mtlLoaderOfficeChair.load('office_chair.mtl', function (materials) {
        materials.preload();

        let objLoaderOfficeChair = new THREE.OBJLoader();
        objLoaderOfficeChair.setMaterials(materials);
        objLoaderOfficeChair.setPath('assets/models/office_chair/');
        objLoaderOfficeChair.load('office_chair.obj', function (object) {
          object.scale.set(260, 260, 260);
          // <position object>
          center3DModel(object);
          camera.position.z = 600;

          object.traverse(function (child) {
            if (child.material) {
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
      mtlLoaderOfficeChair.load('table.mtl', function (materials) {
        materials.preload();

        let objLoaderOfficeChair = new THREE.OBJLoader();
        objLoaderOfficeChair.setMaterials(materials);
        objLoaderOfficeChair.setPath('assets/models/Table/');
        objLoaderOfficeChair.load('table.obj', function (object) {
          object.scale.set(260, 260, 260);
          // <position object>
          center3DModel(object);
          camera.position.z = 600;
          object.traverse(function (child) {
            if (child.material) {
              if (texturePainting2) {
                child.material.map = texturePainting2;
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

  selectModel() {
    localStorage.setItem('app.model', this.appModels);
    // this.showModel(this.appModels);
    //location.reload();
    for (let i = 0; i < this.currentScene.children.length; i++) {
      let child = this.currentScene.children[i];
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

      this.tableObject.traverse(function (child) {
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
