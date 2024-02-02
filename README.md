## Download Folder
Download folder:
- Klik tombol "Code" di bagian atas halaman.
- Pilih opsi "Download ZIP".
- Ekstrak folder ZIP untuk mendapatkan salinan projek.

## Download Node Modules
Karena gak bisa langsung dijalankan, jadi perlu download file module dulu. Buka folder 'Project-Web-3D' (di dalam folder web-3d-main, Jangan salah) di VSCode, buka terminal, ikuti langkah berikut.
- di terminal, jalankan perintah:
  ```Shell
  npm init

- jalankan perintah install
  ```Shell
  npm install

- lalu install three.js
  ```Shell
  npm install three

- selanjutnya install vite
  ```Shell
  npm install vite

Maka ada folder node_modules yang muncul.

## Menjalankan Projek
Di terminal, jalankan perintah:
  ```Shell
  npm run dev
```
Buka link yang diberi, sorot link lalu `ctrl + klik kiri`.

## Penjelasan Code
- Import library.
  ```js
  // Kode ini memanggil library yang dibutuhkan untuk menjalankan projek.
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import * as dat from 'dat.gui';
  ```

- Mengambil element canvas, membuat renderer, dan membuat scene.
  ```js
    // memanggil canvas (dari file html)
  const canvas = document.getElementById('canvas');
  
  // membuat renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  // mengatur ukuran renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // membuat scene
  const scene = new THREE.Scene();
  ```
- Membuat object berupa kotak (box).
  ```js
  // membuat geometry
  const boxGeometry = new THREE.BoxGeometry();
  
  // membuat material, lalu menambahkan base color
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x720455,
  });
  
  // Mesh untuk menyatukan geometry dan material
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(0, 1, 0);

  // menampilkan box ke scene
  scene.add(box);
  ```

- Membuat plane (dataran).
  ```js
  // membuat geometry (mengatur ukuran plane)
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  
  // membuat material (mengatur warna dan sisi)
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x030637,
    side: THREE.DoubleSide,
  });
  
  // menggabungkan geometry dan material, lalu menampilkan plane ke scene
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
  
  // rotate plane agar menjadi horizontal
  plane.rotation.x = -0.5 * Math.PI;
  ```

- Membuat object berupa bola (sphere).
  ```js
  // membuat geometry sphere (atur radius bola)
  const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
  
  membuat material sphere (mengatur warna bola)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x3c0753,
  });
  
  // gabungkan geometry dan material (mesh)
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(3, 3, 0);
  scene.add(sphere);
  ```
