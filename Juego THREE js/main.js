import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Luz ambiental del cielo (azulada) y suelo (café)
const hemiLight = new THREE.HemisphereLight(0xffd6ff, 0x443322, 0.6);
scene.add(hemiLight);

const sol = new THREE.DirectionalLight(0xffffff, 1.5);
sol.position.set(50, 100, 50);
sol.intensity = 2.0; // Más potencia para que resalten los colores
// Esto ayuda a que la sombra no se corte:
sol.shadow.camera.left = -200;
sol.shadow.camera.right = 200;
sol.shadow.camera.top = 200;
sol.shadow.camera.bottom = -200;

// Ponla ladeada para que cree sombras en las curvas
scene.add(sol);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // opcional pero mejora calidad
document.body.appendChild( renderer.domElement );



//geometria
const sueloGeo = new THREE.PlaneGeometry(300, 600, 40, 40);
const troncoGeo = new THREE.CylinderGeometry(3, 10, 200, 6);
const hojasGeo = new THREE.ConeGeometry(25,30,6);
const hongoTalloGeo = new THREE.CylinderGeometry(2.5, 4.5, 50, 6);
const hongoSombreroGeo = new THREE.SphereGeometry(25,23, 35, 12);
const pintaGeo = new THREE.CylinderGeometry(2, 2, 0.5, 6); 
const rocaGeo = new THREE.DodecahedronGeometry(40,0);
const montañaGeo = new THREE.DodecahedronGeometry(50,0);

//suelo vertices
const vertices = sueloGeo.attributes.position.array;

const ancho = 0.05;
const altura = 5;

for(let i=0; i < vertices.length; i+=3){
  const x = vertices[i];
  const y = vertices[i+1];

  vertices[i+2] = Math.sin(x*ancho) * Math.cos(y * ancho) * altura;
}
sueloGeo.attributes.position.needsUpdate = true;
sueloGeo.computeVertexNormals();

//materiales
const sueloMaterial = new THREE.MeshLambertMaterial({
  color : 0x556b2f,  flatShading: true});

const troncoMaterial = new THREE.MeshPhysicalMaterial({
  color:0x8B4513, flatShading: true })  

const hojasMateriales = new THREE.MeshPhysicalMaterial({
  color: 0x2d4c1e, flatShading: true});
  
const hongotalloMaterial = new THREE.MeshPhysicalMaterial({ 
  color: 0xF5F5DC, flatShading: true });

const hongosombreroMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFF4500, flatShading: true });

const pintaMat = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF });

const rocaMaterial = new THREE.MeshStandardMaterial({
  color: 0x888888 });

const montañaMaterial =new THREE.MeshStandardMaterial({
  color:0x888888 })


//objetos
const suelo = new THREE.Mesh(sueloGeo, sueloMaterial,);
suelo.rotation.x = -Math.PI/2;
suelo.position.set(0,0,-150)
suelo.receiveShadow = true;

const tronco0 =new THREE.Mesh(troncoGeo, troncoMaterial);

const hoja0 = new THREE.Mesh(hojasGeo, hojasMateriales);
hoja0.position.y =88;
const hoja1 = new THREE.Mesh(hojasGeo, hojasMateriales);
hoja1.scale.set(0.63, 0.63, 0.63);
hoja1.position.y =100;
const hoja2 = new THREE.Mesh(hojasGeo, hojasMateriales);
hoja2.scale.set(0.33, 0.33, 0.33)
hoja2.position.y = 108;

const hongoTallo = new THREE.Mesh(hongoTalloGeo, hongotalloMaterial);
const hongoSombrero = new THREE.Mesh(hongoSombreroGeo, hongosombreroMaterial)
hongoSombrero.scale.set(1, 0.2, 1);
hongoSombrero.position.y = 30;

const roca = new THREE.Mesh(rocaGeo, rocaMaterial);
roca.position.set(100, 20, -100)

const montaña = new THREE.Mesh(montañaGeo, montañaMaterial);
montaña.scale.set(2.5,2,1)
montaña.position.set(0, 25, -400);

//sombras
tronco0.castShadow = true;
tronco0.receiveShadow = true; // Opcional, para que reciba sombra de las hojas

hoja0.castShadow = true;
hoja0.receiveShadow = true;

hoja1.castShadow = true;
hoja1.receiveShadow = true;

hoja2.castShadow = true;
hoja2.receiveShadow = true;

hongoTallo.castShadow = true;
hongoTallo.receiveShadow = true;
hongoSombrero.castShadow = true;
hongoSombrero.receiveShadow = true;

//arbol
const arbol0 = new THREE.Group();
arbol0.add(tronco0)
arbol0.add(hoja0);
arbol0.add(hoja1);
arbol0.add(hoja2);
arbol0.position.set(-25,100,0);

const nuevoArbol1 = arbol0.clone();
nuevoArbol1.position.set(-100,100,-80);
const nuevoArbol2 = arbol0.clone();
nuevoArbol2.position.set(40,100,-100);
const nuevoArbol3 = arbol0.clone();
nuevoArbol3.position.set(100,100,-300)
const nuevoArbol4 = arbol0.clone();
nuevoArbol4.position.set(-80,100,-250)
const nuevoArbol5 = arbol0.clone();
nuevoArbol5.position.set(90,100,5)



//hongo
const hongo = new THREE.Group();
hongo.add(hongoTallo);
hongo.add(hongoSombrero);
hongo.position.set(9,25,-300);

function crearPinta(x, z) {
  const pinta = new THREE.Mesh(pintaGeo, pintaMat);
  pinta.position.set(x, 33, z); 
  hongo.add(pinta);
}
crearPinta(0, 0);
crearPinta(15, 10);
crearPinta(-15, -10);
crearPinta(-12, 15);

const nuevoHongo = hongo.clone();
nuevoHongo.scale.set(1.5,2,1.5);
nuevoHongo.position.set(-9,50,-320);

//roca
const nuevaRoca1 = roca.clone();
nuevaRoca1.scale.set(0.5,0.5,0.5);
nuevaRoca1.position.set(60,10,-70);
const nuevaRoca2 = roca.clone();
nuevaRoca2.scale.set(1,0.8, 1);
nuevaRoca2.position.set(-60,16,-200);
const nuevaRoca3 = roca.clone();
nuevaRoca3.scale.set(0.6,0.6,0.6);
nuevaRoca3.position.set(-70,5,-170);
const nuevaRoca4 = roca.clone();
nuevaRoca4.scale.set(0.28,0.2,0.3);
nuevaRoca4.position.set(-40,3,-170);
const nuevaRoca5 = roca.clone();
nuevaRoca5.scale.set(1,0.5,1.3);
nuevaRoca5.position.set(-110,10,-180);


//montaña
const nuevaMontaña1 = montaña.clone();
nuevaMontaña1.scale.set(1,1.1,1);
nuevaMontaña1.position.set(-100, 25, -400);
const nuevaMontaña2 = montaña.clone();
nuevaMontaña2.scale.set(0.7,0.5,1);
nuevaMontaña2.position.set(-80, 12.5, -350);

//add scene
scene.add(suelo);
scene.add(arbol0);
scene.add(nuevoArbol1);
scene.add(nuevoArbol2);
scene.add(nuevoArbol3);
scene.add(nuevoArbol4);
scene.add(nuevoArbol5);
scene.add(hongo);
scene.add(nuevoHongo)
scene.add(roca)
scene.add(nuevaRoca1);
scene.add(nuevaRoca2);
scene.add(nuevaRoca3);
scene.add(nuevaRoca4);
scene.add(nuevaRoca5);
scene.add(montaña);
scene.add(nuevaMontaña1)
scene.add(nuevaMontaña2)

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set(0, 100, 150);
controls.update();


function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);

}
animate();