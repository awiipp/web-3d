// main library for MySQL
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// canvas
const canvas = document.getElementById('canvas');

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

// Membuat object geometry (membuat box)
const boxGeometry = new THREE.BoxGeometry();

// Material untuk style object geometry
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x720455,
});

// Mesh untuk menyatukan geometry dan material
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 1, 0);
scene.add(box);

// membuat dataran (plane)
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x030637,
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// rotate plane agar horizontal
plane.rotation.x = -0.5 * Math.PI;

// membuat geometry sphere
const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x3c0753,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(3, 3, 0);
scene.add(sphere);

// Membuat helper (membantu melihat posisi object)
// x = merah
// y = biru
// z = hijau
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Menampilkan grid helper
const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);

//  -- Membuat perspektif camera dan orbit control
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// set posisi camera
camera.position.set(-10, 30, 30);

// untuk control secara orbit
const orbit = new OrbitControls(camera, canvas);

//  untuk posisi orbit
orbit.update();

// kontrol warna bola
const gui = new dat.GUI();

const options = {
  sphereColor: '#3c0753',
  wireframe: false,
  speed: 0.05,
};

gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange((e) => {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

let step = 0;
function animate(time) {
  // memberikan animasi pada object yang sudah dibuat
  box.rotation.x = time / 500;
  box.rotation.y = time / 500;
  renderer.render(scene, camera);

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
}

// menjalankan/menggerakan object sesuai isi func animate
renderer.setAnimationLoop(animate);
