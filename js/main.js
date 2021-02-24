// Required three.js elements
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Lighting
scene.add(new THREE.AmbientLight(0x333333));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

// Earth 
const earth = new THREE.Mesh( 
    new THREE.SphereGeometry( 0.5, 32, 32 ), 
    new THREE.MeshPhongMaterial({ 
        map: new THREE.ImageUtils.loadTexture('../textures/earthmap1k.jpg'),
        bumpMap: new THREE.ImageUtils.loadTexture('../textures/earthbump1k.jpg'),
        bumpScale: 0.005, 
        specularMap: new THREE.ImageUtils.loadTexture('../textures/water_16k.png'),
        specular: new THREE.Color('grey')
    })
);

// Cloud layer
const cloudmesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.503, 32, 32),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('../textures/fair_clouds_4k.png'),
        transparent: true
    })
);

// Galaxy background
const galaxy = new THREE.Mesh(
    new THREE.SphereGeometry(90, 64, 64), 
    new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('../textures/galaxy_starfield.png'), 
        side: THREE.BackSide
    })
);

// Add each element
scene.add( earth );
scene.add( cloudmesh );
scene.add( galaxy );

// Camera view - greater number pulls back the camera
camera.position.z = 1.25; 

function animate() {
	requestAnimationFrame( animate );
    // earth.rotation.x += 0.01;
    // earth.rotation.y += 0.0003;
    cloudmesh.rotation.y += 0.0005;
	renderer.render( scene, camera );
}
animate();