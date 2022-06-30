console.log("Script file connected");

//import { render } from '../../app.js';
//import { render } from '../../app.js';
import { VRButton } from './VRButton.js';
/*const render = require('../../app.js');
const VRButton = require('./VRButton.js');*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe : true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const torusGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const torusMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } );
const torusKnot = new THREE.Mesh( torusGeometry, torusMaterial );
scene.add( torusKnot );

camera.position.set(0, 0, 10);

document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;
const cameraGroup = new THREE.Group();
cameraGroup.position.set(0, -1, 1.5);  // Set the initial VR Headset Position.
torusKnot.position.set(0, -1, 1.5);
//When user turn on the VR mode.
renderer.xr.addEventListener('sessionstart', function () {
    scene.add(cameraGroup);
    cameraGroup.add(camera);
});
//When user turn off the VR mode.
renderer.xr.addEventListener('sessionend', function () {
    scene.remove(cameraGroup);
    cameraGroup.remove(camera);
});
cameraGroup.parent = cube;
/*function animate() {
	requestAnimationFrame( animate );
    cube.position.set(10, 0, 0);
    cube.position.set(0, 0, 0);
    cube.position.set(-10, 0, 0);
    cube.position.set(0, 0, 0);
    renderer.setAnimationLoop( function () {
        //cube.rotation.y += 0.02;
        
        renderer.render( scene, camera );
        
    
    } );
}*/

document.addEventListener('keydown', function(stroke){
    let code = stroke.key;  //grabbing the key code from the events object
    console.log(code)
    let rotationFactor = 15;  //amount in degrees to rotate on each tick when e or q is pressed
    
    switch(code){   //defining behaviors based on key input
        case 'w':
            cube.position.z -= 2;
            camera.position.z -= 2;
            break;
        case 'a':
            cube.position.x -= 2;
            camera.position.x -= 2;
            break;
        case 's':
            cube.position.z += 2;
            camera.position.z += 2;
            break;
        case 'd':
            cube.position.x += 2;
            camera.position.x += 2;
            break;
        case ' ':
            cube.position.y += 2;
            camera.position.y += 2;
            break;
        case 'Shift':
            cube.position.y -= 2;
            camera.position.y -= 2;
            break;
        case 'e':
            cube.rotation.x -= rotationFactor * Math.PI/180;
             camera.rotation.y -= rotationFactor * Math.PI/180;
            camera.lookAt(cube);
           
            console.log(camera.position, cube.position);
            break;
        case 'q':
            cube.rotation.x += rotationFactor * Math.PI/180;
            camera.rotation.y += rotationFactor * Math.PI/180;
            camera.lookAt(cube);
            
            console.log(camera.position, cube.position);
            break;
        default:
            console.log('unsupported key!');
            break;
    }
    renderer.render( scene, camera );
    //renderer.render( scene, camera );
}, false);
//animate();
renderer.render( scene, camera );