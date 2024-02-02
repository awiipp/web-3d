## Download Folder
Download folder.
- Klik tombol "Code" di bagian atas halaman.
- Pilih opsi "Download ZIP".
- Ekstrak folder ZIP untuk mendapatkan salinan projek.

## Download Node Modules
Karena gak bisa ngirim folder node_module ke github, jadi perlu download file-file module dulu. Buka folder 'Project-Web-3D' (awas salah) di VSCode, buka terminal, terus...
- di terminal, jalankan npm init.
  ```Shell
  npm init

- jalankan perintah install.
  ```Shell
  npm install

- lalu install three.js.
  ```Shell
  npm install three

- Terus install vite.
  ```Shell
  npm install vite

Nanti bakal ada folder node_modules yang muncul.

## Menjalankan Projek
tulis perintah running project di terminal.
  ```Shell
  npm run dev
```
Buka link yang dikasih, sorot link terus `ctrl + klik kiri`

> Bang kok error? Coba cek [di sini](#bang-kok-kode-aku-error-bang).

## Penjelasan Code
Di source code udah dikasih comment penjelasan, tapi di sini dijelasin lagi bagian per bagian biar jelas.
- Import library.
  ```js
  // Kode ini memanggil library yang dibutuhkan untuk menjalankan projek.
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import * as dat from 'dat.gui';
  ```

- Mengambil element canvas, membuat renderer, dan membuat scene.
  ```js
  // memanggil canvas (dari file html).
  const canvas = document.getElementById('canvas');
  
  // membuat renderer.
  // renderer berfungsi untuk me-render adegan 3D ke dalam elemen canvas.
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  // Menetapkan ukuran viewport rendering.
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // membuat scene.
  const scene = new THREE.Scene();
  ```
- Membuat object berupa kotak (box).
  ```js
  // membuat geometry.
  const boxGeometry = new THREE.BoxGeometry();
  
  // membuat material, lalu menambahkan base color.
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x720455,
  });
  
  // Mesh untuk menyatukan geometry dan material.
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(0, 1, 0);

  // menampilkan box ke scene.
  scene.add(box);
  ```

- Membuat object berupa bola (sphere).
  ```js
  // membuat geometry sphere (lalu atur radius bola).
  const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
  
  // membuat material sphere (mengatur warna bola).
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x3c0753,
  });
  
  // gabungkan geometry dan material (mesh).
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(3, 3, 0);
  scene.add(sphere);
  ```

- Membuat plane (dataran).
  ```js
  // membuat geometry (mengatur ukuran plane).
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  
  // membuat material (mengatur warna dan sisi).
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x030637,
    side: THREE.DoubleSide,
  });
  
  // menggabungkan geometry dan material, lalu menampilkan plane ke scene.
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
  
  // rotate plane agar menjadi horizontal.
  plane.rotation.x = -0.5 * Math.PI;
  ```

- Membuat helper.
  ```js
  // Membuat helper (fungsi helper untuk membantu melihat posisi object).
  // sumbu x = merah
  // sumbu y = biru
  // sumbu z = hijau
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);
  const gridHelper = new THREE.GridHelper(20);
  scene.add(gridHelper);
  ```

- Membuat orbit control.
  ```js
  // Membuat perspektif camera dan orbit control.
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  // set posisi camera
  camera.position.set(-10, 30, 30);
  
  // buat orbit control (untuk mengendalikan kamera)
  const orbit = new OrbitControls(camera, canvas);
  
  orbit.update();
  ```

- Memberikan animasi pada object.
  ```js
  let step = 0;
  
  // Fungsi untuk memberikan animasi.
  function animate(time) {
    // memberikan animasi rotation pada object box.
    box.rotation.x = time / 500;
    box.rotation.y = time / 500;
    renderer.render(scene, camera);
  
    // Menggerakkan objek sphere secara vertikal (membuat sphere/bola memantul) dan mengatur kecepatan pantulan.
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
  }
  
  // menjalankan/menggerakan object sesuai isi function animate.
  renderer.setAnimationLoop(animate);
  ```

- Membuat control panel.
  ```js
  // buat UI control panel.
  const gui = new dat.GUI();
  
  // beberapa properti yang bisa diatur.
  const options = {
    sphereColor: '#3c0753',
    wireframe: false,
    speed: 0.05,
  };
  
  // menambahkan control untuk mengubah warna.
  gui.addColor(options, 'sphereColor').onChange(function (e) {
    sphere.material.color.set(e);
  });
  
  // menambahkan control checkbox untuk mengubah ke mode wireframe.
  gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
  });
  
  // menambahkan control untuk mengatur kecepatan pantulan bola.
  gui.add(options, 'speed', 0, 0.1);
  ```
<br>

## Bang kok kode aku error bang?
Kalo error, KEMUNGKINAN karena:
- Belum download node.js. Coba cek udah install node atau belum. Buka command prompt/power shell, ketik 'node -v'. Kalau tampil versi node.js, berarti udah diinstall.
- Salah buka folder. Abis download repositor ini, nanti ada folder 'web-3d-main.zip' terus di dalamnya ada folder 'web-3d-main'. Buka foldernya, nanti ada folder 'Project-Web-3D', ini folder yang harus dibuka.
