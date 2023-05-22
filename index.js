/* global THREE */

let scene;
let camera;
let renderer;
let cube;
let plane1;
let font;

function setup() {
  setupScene();
  setupRenderer();
  setupEventListeners();
  setupCamera();
  setupLights();

  let video1 = setUpVideo(
    "https://cdn.glitch.global/39b7ba95-a96e-44aa-9110-0d917a3046ad/wiggleCrop.mp4?v=1671834113835"
  );


  let texture1 = createTextureFromVideoElement(video1);

  // texture.crossOrigin = "anonymous";

  plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(.5, .5),
    new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide })

  );

  scene.add(plane1);



  // // https://threejs.org/docs/#api/en/textures/VideoTexture
  //let element = setUpVideo()
  //setupCube(texture);
  draw();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.z = 1;
}

// https://stackoverflow.com/questions/19251983/dynamically-create-a-html5-video-element-without-it-being-shown-in-the-page/20611625
function setUpVideo(inSrc) {
  var videlem = document.createElement("video");
  /// ... some setup like poster image, size, position etc. goes here...
  /// now, add sources:
  var sourceMP4 = document.createElement("source");
  sourceMP4.type = "video/mp4";
  sourceMP4.src = inSrc;
  // performance

  videlem.appendChild(sourceMP4);

  videlem.autoplay = true;
  videlem.muted = true;
  videlem.loop = true;
  videlem.setAttribute("crossorigin", "anonymous");
  // i think this will not be not be needed if you have a server

  videlem.style.display = "none"; // this makes it so the html element isnt there

  videlem.load();
  videlem.play();
  return videlem;
}

function createTextureFromVideoElement(video) {
  let texture = new THREE.VideoTexture(video);
  texture.crossOrigin = "anonymous";
  texture.needsUpdate;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  return texture;
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupCube(texture) {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 1,
    side: THREE.DoubleSide
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
  requestAnimationFrame(draw);

  renderer.render(scene, camera);
}

setup();
