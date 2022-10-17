import './style.css'
import * as THREE from 'three'
// import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

// boilerplate
const loader = new GLTFLoader()
// const gui = new dat.GUI()
let letter

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 1)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.physicallyCorrectLights = true
renderer.gammaInput = true
renderer.gammaOutput = true

renderer.setSize( window.innerWidth, window.innerHeight );

const container = document.getElementById('app')
container.appendChild( renderer.domElement );

// animation
const target = new THREE.Vector3()

let x = 0, y = 0

window.addEventListener('mousemove', e => {
  x = (e.clientX - window.innerWidth / 2)
  y = (e.clientY - window.innerHeight / 2)
})

function animate () {
  requestAnimationFrame(animate)

  target.x += (x - target.x) * .05
  target.y += (-y - target.y) * .03
  target.z = camera.position.z * 1000

  letter.lookAt(target)

  cubeCamera.update(renderer, scene)

  render()
}

// loading model
loader.load(
  'letter.gltf', 
  (gltf) => {
    letter = gltf.scene
    letter.rotation.set(.1, 0, 0)
    const outerMesh = letter.children[0].children[0]
    const innerMesh = letter.children[0].children[1]

    innerMesh.material.roughness = 0

    outerMesh.material.color.r = 0
    outerMesh.material.color.g = 0
    outerMesh.material.color.b = 0
    
    innerMesh.material.color.r = 137 / 255
    innerMesh.material.color.g = 125 / 255
    innerMesh.material.color.b = 184 /255
    scene.add(letter)

    // starting an animation
    letter.lookAt(2, 2, 0)
    animate()
  }
)

// lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0)

const light1 = new THREE.PointLight(0xffffff, 100)
light1.position.set(4, .25, .25)

const light2 = new THREE.PointLight(0xffffff, 100)
light2.position.set(-4, .25, .25)

const centerLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 25)
centerLight.position.set(-.05, .15, .25)

const light3 =  new THREE.PointLight(0xf27cea, 89)
const light3Helper = new THREE.PointLightHelper(light3)
light3.position.set(0, -1.7, 0)
scene.add(light3Helper)

scene.add(light1, light2, light3, ambientLight, centerLight)

// reflections
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 1024, {generateMipmaps: true} );
const cubeCamera = new THREE.CubeCamera(1, 100, cubeRenderTarget)
scene.add(cubeCamera)

const geometry = new THREE.PlaneGeometry(2, 2, 2, 2)
console.log(geometry)
const material = new THREE.MeshLambertMaterial({color: 0x222222})
material.envMap = cubeCamera.renderTarget.texture
material.needsUpdate = true

const plane = new THREE.Mesh(geometry, material)
plane.rotation.set(6.28 / 360 * -75, 0, 0)
plane.position.set(0, -1, -1)

cubeCamera.position.set(0, -1.5, 1)
scene.add(plane)

// boilerplate #2
function render () {
  renderer.render(scene, camera)
}

function onWindowResize () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();
}

window.addEventListener('resize', onWindowResize)
