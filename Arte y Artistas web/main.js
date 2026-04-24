import * as THREE from 'three';


function createScene(elementId, colorObj, geometryType) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let geometry;
    if(geometryType === 'sphere') geometry = new THREE.SphereGeometry(1.5, 32, 32);
    else if(geometryType === 'torus') geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    else geometry = new THREE.BoxGeometry(2, 2, 2);

    const material = new THREE.MeshPhongMaterial({ color: colorObj, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

function createLandscape(elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);


    const geoFondo = new THREE.SphereGeometry(500, 60, 40);
    geoFondo.scale(-1, 1, 1); 

    const matFondo = new THREE.MeshBasicMaterial({
        color: 0x111122,
        wireframe: true 
    });


    const fondo = new THREE.Mesh(geoFondo, matFondo);
    scene.add(fondo);

    
    const vertices = [];
    for (let i = 0; i < 5000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(1000)); 
        vertices.push(THREE.MathUtils.randFloatSpread(1000)); 
        vertices.push(THREE.MathUtils.randFloatSpread(1000)); 
    }
    const estrellaGeo = new THREE.BufferGeometry();
    estrellaGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const estrellaMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const estrellas = new THREE.Points(estrellaGeo, estrellaMat);
    scene.add(estrellas);

    camera.position.z = 0.1; 

    
    let mouseX = 0;
    let mouseY = 0;

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = (event.clientX - rect.left - rect.width / 2) / 100;
        mouseY = (event.clientY - rect.top - rect.height / 2) / 100;
    });

    function animate() {
        requestAnimationFrame(animate);

       
        camera.rotation.y += (mouseX - camera.rotation.y) * 0.05;
        camera.rotation.x += (mouseY - camera.rotation.x) * 0.05;

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}


window.addEventListener('DOMContentLoaded', () => {
    createScene('canvas-hero', 0x00ffcc, 'torus');
    createScene('canvas-about', 0xff0055, 'box');

    createScene('canvas-carousel-1', 0x00ff88, 'sphere');
    createScene('canvas-carousel-2', 0xffaa00, 'torus');

    createLandscape('canvas-libre2');
});

const miCarousel = document.getElementById('carouselArtistas');
miCarousel.addEventListener('slid.bs.carousel', () => {
    window.dispatchEvent(new Event('resize'));
});
