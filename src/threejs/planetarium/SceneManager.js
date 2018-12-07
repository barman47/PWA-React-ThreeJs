
import THREE from '../three';

//import SceneSubject from './sceneSubjects/SceneSubject';
import Horizon from './sceneSubjects/Horizon';
import SkyStars from './sceneSubjects/SkyStars';
import Light from './sceneSubjects/Light';
import Planets from './sceneSubjects/Planets';
import {onDocumentMouseDown} from "./sceneActions/Raycaster";
var TWEEN = require('@tweenjs/tween.js');



export default canvas => {

    const clock = new THREE.Clock();
    //const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }


    const objectsPlanets = [];

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);
    const controls = buildControls();

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#FFF");

        return scene;
    }

    function buildControls() {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        //controls.autoRotate = true ;
        controls.autoRotateSpeed = 0.02;
        controls.target.z = 0
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.minPolarAngle = 0.8;
        controls.maxPolarAngle = Math.PI;
        controls.dampingFactor = 0.07;
        controls.rotateSpeed = 0.07;
        return controls;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.set(0.1, 0, 0);

        return camera;
    }



    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new Light(scene),
            new Planets(scene, objectsPlanets),
            new SkyStars(scene),
            new Horizon(scene),
            //new SceneSubjecttt(scene)
        ];

        return sceneSubjects;
    }

    function update() {
        const elapsedTime = clock.getElapsedTime();


        TWEEN.update();
        controls.update();
        renderer.render(scene, camera);

    }

    // function updateCameraPositionRelativeToMouse() {
    //     camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
    //     camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
    //     camera.lookAt(origin);
    // }

    function onWindowResize() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }


    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
        console.log("mousePosition.x : " + mousePosition.x)
    }

    let modal = document.getElementById('myModal');


    function init(objectsPlanets, renderer, camera, modal, scene, controls) {


        document.addEventListener('mousedown', onDocumentMouseDown(objectsPlanets, renderer, camera, modal, scene, controls), false);
        //document.addEventListener('touchstart', onDocumentTouchStart, false);

    }



    return {
        update,
        onWindowResize,
        init,
        onMouseMove
    }
}