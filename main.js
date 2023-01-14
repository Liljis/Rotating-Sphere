import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    
// Sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Create shpere
const geometry = new THREE.SphereGeometry(3, 50, 50);

// Materials
const material = new THREE.MeshStandardMaterial({ color: "#e6eaf0" }); 
material.roughness = 0.6
material.metalness = 0.68
material.flatShading = true
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//Light
const light = new THREE.PointLight("#dde6eb", 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.pixelRatio = 2;
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false; /* for disabling sphere movements while dragging */
controls.enableZoom = false; /* for disabling sphere zooming */
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Updata camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline animations
const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline.fromTo(sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
timeline.fromTo("p", { opacity: 0 }, { opacity: 1 });

// Mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    rgb = [
        randomBetween(0, 255),
        randomBetween(0, 255),
        randomBetween(0, 255)
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(sphere.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
