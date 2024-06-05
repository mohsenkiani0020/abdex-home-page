import * as THREE from "three";
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { loadModel } from './loadersGltf';
import img  from './original.avif';
import  * as dat from 'dat.gui'

const canvas = document.getElementById( "three-canvas" );
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  canvas.width / canvas.height,
  0.1,
  40
);
camera.position.set(0,3,0);
const renderer = new THREE.WebGLRenderer({canvas , antialias:true, alpha: true ,isWebGL2 : true});
renderer.setClearColor("#000000");
renderer.setClearAlpha(1);
// console.log(canvas.width, "canvas.width");
// console.log(canvas.height, "canvas.height");

renderer.setSize( canvas.width*4, canvas.height*4);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.3
renderer.gammaFactor = 2.2;
// renderer.domElement.setAttribute('style', 'position: absolute; top: 0; left: 0; z-index: -100')

// Light
const light2 = new THREE.HemisphereLight(0xffeeb1, 0x888888, 0.5)
scene.add(light2)

// SpotLight 1
const SpotLight1 = new THREE.SpotLight(0xffffff,4 ,0 , 400 , 0.2, 0.5);
SpotLight1.position.set( 4.6,5,4.9 );
SpotLight1.target.position.set(4.6,-1,4.9)
SpotLight1.castShadow=true
SpotLight1.shadow.camera.bottom = -7
scene.add( SpotLight1 );

// SpotLight 2
const SpotLight2 = new THREE.PointLight(0xfff4e5,1 ,8 , 0.5);
SpotLight2.position.set( -3.5,4.9,3.5 );
SpotLight2.castShadow=true
scene.add( SpotLight2 );

// SpotLight 3
const SpotLight3 = new THREE.PointLight(0xffd700,1 ,8 , 0.5);
SpotLight3.position.set( -3.2,4.9,-2.3 );
SpotLight3.castShadow=true
SpotLight3.shadow.camera.bottom = -7
scene.add( SpotLight3 );

// SpotLight 4
const SpotLight4 = new THREE.PointLight(0xfff4e5,1 ,8 , 0.5);
SpotLight4.position.set( -1.73,4.9,-2.3 );
SpotLight4.castShadow=true
SpotLight4.shadow.camera.bottom = -7
scene.add( SpotLight4 );

// SpotLight 5
const SpotLight5 = new THREE.PointLight(0xffd700,1 ,8 , 0.5);
SpotLight5.position.set( -0.3,4.9,-2.3 );
SpotLight5.castShadow=true
SpotLight5.shadow.camera.bottom = -7
scene.add( SpotLight5 );

// SpotLight 6
const SpotLight6 = new THREE.PointLight(0xfff4e5,0.5 ,8 , 0.5);
SpotLight6.position.set( -2.5,4.9,-7 );
SpotLight6.castShadow=true
scene.add( SpotLight6 );

// SpotLight 7d
const SpotLight7 = new THREE.PointLight(0xffd700,0.5 ,8 , 0.5);
SpotLight7.position.set( -3,4.9,-7 );
SpotLight7.castShadow=true
scene.add( SpotLight7 );

// SpotLight 8d
const SpotLight8 = new THREE.PointLight(0xffc9A9,1.5,10, 0.5);
SpotLight8.position.set( 8,1.9,8);
SpotLight8.castShadow=true
scene.add( SpotLight8 );

// SpotLight 9d
const SpotLight9 = new THREE.PointLight(0xffc9A9,1.5,10, 0.5);
SpotLight9.position.set( 1.5,1.9,8 );
SpotLight9.castShadow=true
scene.add( SpotLight9 );

// SpotLight 10d
const SpotLight10 = new THREE.PointLight(0xffc9A9,1.5,10, 0.5);
SpotLight10.position.set( -6.8,3,2.7 );
SpotLight10.castShadow=true
scene.add( SpotLight10 );
const SptLight10 = new THREE.PointLightHelper( SpotLight10 ,0.1);
scene.add( SptLight10 );


const texturLoader = new THREE.TextureLoader();
scene.background=texturLoader.load(img)

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('img.jpg');

// Set wrap mode to repeat
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// Create plane geometry
const geometry = new THREE.PlaneGeometry( 20, 20 );
const material = new THREE.MeshStandardMaterial( {map : texture, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -0.5 * Math.PI
plane.position.set(-3.2,0.005,-2.3 )
plane.receiveShadow=true
plane.material.map.repeat.set(30, 30);
scene.add( plane );

// const boxGeometry = new THREE.BoxGeometry()
// const boxMaterial = new THREE.MeshStandardMaterial({color:0x00ff00})
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box)
// box.castShadow = true
// box.position.set(-3.2,2,-2.3)

(async () => {
  console.log("start of async");
  const model = await loadModel('/OBJ/home1.glb');
  model.position.set(0,0.1,0)
  model.castShadow = true;
  model.receiveShadow = true
  model.scale.set(2,2,2)
  console.log(model)
  // model.material.color.set('red')
  scene.add(model);

  // Controls
  const controls = new FirstPersonControls( camera, renderer.domElement );
  controls.movementSpeed = 0;
  controls.lookSpeed = 0.03;
  controls.lookVertical = false
  controls.lookAt(4,1,6)
  const clock = new THREE.Clock();

  const loadingManager = new THREE.LoadingManager();

  const TextureLoader = new THREE.TextureLoader(loadingManager);
  TextureLoader.load('img.jpg', (texture) => {
    scene.add(texture)
  });
  loadingManager.onProgress = (item, loaded, total) => {
    const percentage = (loaded / total * 100).toFixed(2);
    document.getElementById('loading-container').innerText = `Loading... ${percentage}%`;
    if (loaded === total) {
      document.getElementById('loading-container').classList.add('hidden');
    }
  };


  // Animate Function
  const startPos = new THREE.Vector3(-4,4,-9 );
  const endPos = new THREE.Vector3(-1,3,0);
  let time = 0;
  const animationDuration = 10;

  let freeHead = false;
  const animate = function () {
    if(!freeHead) {
      time += clock.getDelta();
      const t = Math.min(1, time / animationDuration);
      camera.position.lerpVectors(startPos, endPos, t);
    }
    if(camera.position.y === endPos.y) {
      freeHead = true;
    }
    requestAnimationFrame(animate);
    controls.update(clock.getDelta() );
    renderer.render(scene, camera);
  };

  animate();

})();

