import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// LIGHTS
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 3);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// LOAD TEXTURES
const loader = new THREE.TextureLoader();

const colorMap = loader.load('textures/color.jpg');
const normalMap = loader.load('textures/normal.jpg');
const roughnessMap = loader.load('textures/roughness.jpg');
const displacementMap = loader.load('textures/displacement.jpg');

// MATERIAL
const material = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    displacementMap: displacementMap,
    displacementScale: 0.05,   // ulle/rrite nëse duhet
    roughness: 1,
});

// HIGH-DETAIL SPHERE (e rëndësishme për displacement)
const sphereGeometry = new THREE.SphereGeometry(
    1,
    256,   // high subdivisions
    256
);

const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// ANIMATION
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.005;

    renderer.render(scene, camera);
}

animate();
