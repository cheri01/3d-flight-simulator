const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let airplane;

const loader = new THREE.GLTFLoader();
loader.load('assets/models/airplane.glb', function (gltf) {
    airplane = gltf.scene;
    scene.add(airplane);
    airplane.position.set(0, 0, 0);
}, undefined, function (error) {
    console.error(error);
});

const textureLoader = new THREE.TextureLoader();
const skyboxTexture = textureLoader.load('assets/textures/skybox.jpg');
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMaterial = new THREE.MeshBasicMaterial({ map: skyboxTexture, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

camera.position.z = 5;

function setAirplaneColor(hex) {
    if (!airplane) return;
    airplane.traverse(child => {
        if (child.isMesh && child.material) {
            child.material = child.material.clone();
            if (child.material.color) {
                child.material.color.set(hex);
                child.material.needsUpdate = true;
            }
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

const colorInput = document.getElementById('colorPicker');
if (colorInput) {
    colorInput.addEventListener('input', event => {
        setAirplaneColor(event.target.value);
    });
}

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            camera.position.z -= 0.1;
            break;
        case 'ArrowDown':
            camera.position.z += 0.1;
            break;
        case 'ArrowLeft':
            camera.position.x -= 0.1;
            break;
        case 'ArrowRight':
            camera.position.x += 0.1;
            break;
    }
});