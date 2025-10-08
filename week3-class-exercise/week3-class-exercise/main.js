import * as THREE from 'three';

// Skena dhe kamera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(6, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Toka
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;
scene.add(floor);

// 🔶 1. Torus Knot (zëvendëson kubin)
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
const torusKnotMaterial = new THREE.MeshStandardMaterial({
  color: 0xff6600,
  metalness: 0.8,
  roughness: 0.2,
});
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.set(-4, 0, 0);
torusKnot.castShadow = true;
scene.add(torusKnot);

// 🔷 2. Dodecahedron (zëvendëson sferën)
const dodecahedronGeometry = new THREE.DodecahedronGeometry(1.5);
const dodecahedronMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x00aaff,
  metalness: 0.5,
  roughness: 0.1,
  transmission: 0.3, // efekt xhami
  thickness: 1.5,
});
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
dodecahedron.position.set(4, 0, 0);
dodecahedron.castShadow = true;
scene.add(dodecahedron);

// 🔺 3. Tetrahedron (zëvendëson konin)
const tetraGeometry = new THREE.TetrahedronGeometry(1.7);
const tetraMaterial = new THREE.MeshStandardMaterial({
  color: 0x44ff88,
  metalness: 0.3,
  roughness: 0.4,
  wireframe: false,
});
const tetrahedron = new THREE.Mesh(tetraGeometry, tetraMaterial);
tetrahedron.position.set(0, 0, -4);
tetrahedron.castShadow = true;
scene.add(tetrahedron);

// 💡 Drita
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xff0099, 0.7, 50);
pointLight.position.set(-6, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// 🌈 Animacioni
function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.02;
  torusKnot.rotation.y += 0.015;

  dodecahedron.rotation.y += 0.01;
  dodecahedron.rotation.x += 0.005;

  tetrahedron.rotation.y -= 0.013;
  tetrahedron.rotation.z += 0.02;

  renderer.render(scene, camera);
}

animate();

// 📏 Resize event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
