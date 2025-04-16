import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/loaders/GLTFLoader.js';

// Escena principal
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Ajuste responsive
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Modelo principal
const loader = new GLTFLoader();
loader.load(
    '../Modelos/spyder.glb',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(1000, 1000, 1000);
        model.position.set(0, 0, 0);
        scene.add(model);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        function animateModel() {
            requestAnimationFrame(animateModel);
            model.rotation.y += 0.008;
        }

        animateModel();
    },
);

//Animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

//Cards modelos

function loadCardModel(containerId, modelPath, scale = 75, rotationSpeed = 0.02) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(scale, scale, scale);
            model.position.set(0, -0.5, 0);
            scene.add(model);

            const ambientLight = new THREE.AmbientLight(0xffffff, 2);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
            directionalLight.position.set(3, 3, 3);
            scene.add(directionalLight);

            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += rotationSpeed;
                renderer.render(scene, camera);
            }

            animate();
            //Ajuste responsive cards
            const resizeObserver = new ResizeObserver(() => {
                const width = container.clientWidth;
                const height = container.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            });

            resizeObserver.observe(container);
        },
    );
};

//Modelos
loadCardModel('model-container-1', '../Modelos/fkp37.glb', 75, 0.03);
loadCardModel('model-container-2', '../Modelos/invencible.glb', 75, 0.03);
loadCardModel('model-container-3', '../Modelos/murcielago.glb', 75, 0.03);
loadCardModel('model-container-4', '../Modelos/roadster.glb', 75, 0.03);
loadCardModel('model-container-5', '../Modelos/sc20.glb', 75, 0.03);
loadCardModel('model-container-6', '../Modelos/gt3.glb', 75, 0.03);
loadCardModel('model-container-7', '../Modelos/lanzador.glb', 75, 0.03);
loadCardModel('model-container-8', '../Modelos/urus.glb', 75, 0.03);